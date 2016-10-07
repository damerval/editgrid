<?php
/**
 * Created in PhpStorm.
 * User: pdamerval
 * Date: 10/3/2016
 * Time: 11:22 AM
 */

function getConfigData() {
  return parse_ini_file($_SERVER['DOCUMENT_ROOT'] . "/ini/sqlSrv.ini");
}

function getConnection() {
  $config = getConfigData();
  $connection = sqlsrv_connect($config['host'],
      array("UID"=>$config['username'], "PWD"=>$config['password'], "Database"=>$config['database']));
  return $connection;
}

function getSet($sql, $params) {
  $result = array();

  $conn = getConnection();
  if ($conn) {
    $stmt = sqlsrv_query($conn, $sql, $params);
    if ($stmt) {
      while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
        $result[] = $row;
      }
    }
  }

  return json_encode($result);
}

function getValue($sql, $params, $field) {
  $result = null;

  $conn = getConnection();
  if ($conn) {
    $stmt = sqlsrv_query($conn, $sql, $params);
    if ($stmt) {
      while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
        $result = $row[$field];
      }
    }
  }

  return $result;
}
