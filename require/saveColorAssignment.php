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

$params = array($offenderId, $color, $startDate, $endDate);

echo runInsertSQL("
INSERT INTO color_assignments (offenderId, color, startDate, endDate)
VALUES (?, ?, ?, ?);
", $params, getConnection());