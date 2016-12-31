<?php
/**
 * Created in PhpStorm.
 * User: pdamerval
 * Date: 12/30/2016
 * Time: 4:13 PM
 */

require_once ("../require/sqlSrv.php");

$offenderId = $_POST['offenderId'];
$color = $_POST['color'];
$startDate = $_POST['startDate'];
$endDate = $_POST['endDate'];

error_log($startDate);
error_log($endDate);

$insertParams = array($offenderId, $color, $startDate, $endDate);
echo runInsertSQL("
  INSERT INTO color_assignments(offenderId, color, startDate, endDate) 
  VALUES(?,?,?,?)
", $insertParams, getConnection(), 'ca_id');

