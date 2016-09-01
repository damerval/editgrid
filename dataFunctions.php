<?php
/**
 * Created by PhpStorm.
 * User: pdamerval
 * Date: 8/30/2016
 * Time: 8:35 AM
 */

function get_config_data() {
  return parse_ini_file($_SERVER['DOCUMENT_ROOT'] . "/dataFunctions.ini");
}

function db_connect() {
  $config = get_config_data();
  $connection = mysqli_connect("localhost", $config['username'], $config['password'], $config['dbname']);
  if (!$connection) {
    return false;
  } else {
    return $connection;
  }
}

function get_result_set($sql) {
  $rows = array();
  $conn = db_connect();

  if (isset($conn)) {
    $result = mysqli_query($conn, $sql);
    if ($result) {
      while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
      }
    } else echo "Unable to run query: " . mysqli_error($conn);
  } else echo "No connection to DB.";

  return json_encode($rows);
}

function get_result_cud($sql, $operation) {

  $conn = db_connect();
  if ($conn) {
    if (mysqli_query($conn, $sql)) {
      switch ($operation) {
        case "insert": $result = mysqli_insert_id($conn); break;
        case "update": $result = mysqli_affected_rows($conn); break;
        case "delete": $result = mysqli_affected_rows($conn); break;
        default: $result = "Bad operation identifier.";
      }
    } else $result = mysqli_error($conn);
  } else $result = "Unable to connect to database.";

  return $result;
}
