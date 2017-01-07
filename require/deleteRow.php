<?php
/**
 * Created in PhpStorm.
 * User: pdamerval
 * Date: 1/6/2017
 * Time: 2:35 PM
 */

require_once ("sqlSrv.php");

$table = $_POST['tableName'];
$keyCol = $_POST['keyColumn'];
$keyVal = $_POST['keyValue'];

if ($table !== "" && $keyCol !== "" && $keyVal !== "") {
  echo runDeleteSQL($table, $keyCol, $keyVal, null);
} else echo "Missing parameters in delete post.";