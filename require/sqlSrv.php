<?php
/**
 * Created in PhpStorm.
 * User: pdamerval
 * Date: 10/3/2016
 * Time: 11:22 AM
 */

define('DB_ERROR_NO_CONNECTION', -1);
define('DB_ERROR_STMT_FAIL', -2);
define('DB_ERROR_UNKNOWN', -3);
define('DB_ERROR_BAD_CONTRACT', -4);

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

function runInsertSQL($sql, $params, $connection, $key) {
  $return = 0;
  error_log('Entering insertSQL');

  if (!$sql == "") {
    $conn = isset($connection) ? $connection : getConnection();
    if ($conn) {
      $stmt = sqlsrv_query($conn, $sql, $params);
      if ($stmt) {
        if (sqlsrv_next_result($stmt)) {
          $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
          $return = $row[$key];
        }
      } else {
        error_log(print_r(sqlsrv_errors(), true));
        return DB_ERROR_STMT_FAIL;
      }
    } else return DB_ERROR_NO_CONNECTION;
  } else return DB_ERROR_BAD_CONTRACT;

  return $return;
}
