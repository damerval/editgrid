<?php
/**
 * Created in PhpStorm.
 * User: pdamerval
 * Date: 8/30/2016
 * Time: 8:35 AM
 */

function get_config_data() {
  return parse_ini_file($_SERVER['DOCUMENT_ROOT'] . "/dataFunctions.ini");
}

function db_connect() {
  $config = get_config_data();
  $connection = mysqli_connect($config['host'], $config['username'], $config['password'], $config['dbname']);
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
  $result = false;

  $config = get_config_data();
  $conn = new mysqli($config['host'], $config['username'], $config['password'], $config['dbname']);

  if (!mysqli_connect_errno()) {
    switch($operation) {
      case "delete": if ($conn->query($sql)) $result = $conn->affected_rows; break;
      case "insert": if ($conn->query($sql)) $result = $conn->insert_id; break;
      case "update": if ($conn->query($sql)) $result = $conn->affected_rows; break;
    }
  } else $result = "Unable to connect to the database.";

  return $result;
}
