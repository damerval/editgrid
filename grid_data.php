<?php
/**
 * Created in PhpStorm.
 * User: pdamerval
 * Date: 8/26/2016
 * Time: 11:50 AM
 */

function get_config_data() {
  return parse_ini_file($_SERVER['DOCUMENT_ROOT'] . "/grid_data.ini");
}

function db_connect() {
  $config = get_config_data();
  $connection = mysqli_connect("localhost", $config['username'], $config['password'], $config['dbname']);
  if (!$connection) {
    return mysqli_connect_error();
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

echo get_result_set("select * from phrases");
