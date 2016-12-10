<?php
/**
 * Created in PhpStorm.
 * User: pdamerval
 * Date: 11/15/2016
 * Time: 3:06 PM
 */

require_once ("require/sqlSrv.php");

$t = microtime(true);
$micro = sprintf("%06d",($t - floor($t)) * 1000000);
$d = new DateTime(date('Y-m-d H:i:s.'.$micro, $t));
$d->sub(DateInterval::createFromDateString('9 hours'));
$timeString = $d->format("Y.m.d_H=i=s.u");

/*
$pic = fopen($_FILES['webcam']['tmp_name'], 'r');

$params = array(array(&$pic, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_STREAM(SQLSRV_ENC_BINARY), SQLSRV_SQLTYPE_IMAGE));
$conn = getConnection();

$sql = "INSERT INTO ofndr_photo VALUES ((SELECT MAX(photo_id)+1 FROM ofndr_photo),"
    . $_GET['offenderNum'] . ",(SELECT MAX(seq_no)+1 FROM ofndr_photo WHERE ofndr_num = "
    . $_GET['offenderNum'] . "),getDate(),?,null,'pdamerva',getDate(),null,null,'102')";

if ($conn) {
  $stmt = sqlsrv_query(getConnection(), $sql, $params);
  if (!$stmt) die (print_r(sqlsrv_errors(SQLSRV_ERR_ALL), true));
}
*/
move_uploaded_file($_FILES['webcam']['tmp_name'], 'uploads/image.jpg');

