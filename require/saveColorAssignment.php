<?php
/**
 * Created in PhpStorm.
 * User: pdamerval
 * Date: 1/5/2017
 * Time: 9:43 AM
 */

require_once ("sqlSrv.php");

$offenderId = $_POST['offenderId'];
$color = $_POST['color'];
$startDate = $_POST['startDate'];
$endDate = isset($_POST['endDate']) ? $_POST['endDate'] : null;
$caId = isset($_POST['ca_id']) ? $_POST['ca_id'] : null;

$params = array($offenderId, $color, $startDate, $endDate);

if (null != $caId) {
  echo runUpdateSQL("
    UPDATE color_assignments SET offenderId = ?, color = ?, startDate = ?, endDate = ?
  ", $params, null, 'ca_id', $caId);
} else {
  echo runInsertSQL("
    INSERT INTO color_assignments (offenderId, color, startDate, endDate)
    VALUES (?, ?, ?, ?);
    ", $params, null);
}