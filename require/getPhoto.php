<?php
/**
 * Created in PhpStorm.
 * User: pdamerval
 * Date: 11/4/2016
 * Time: 9:52 AM
 */
header ("Content-Type: image/jpeg");
require_once ('sqlSrv.php');

$offenderId = (isset($_GET['id'])) ? $_GET['id'] : 415716;

$sql = "EXECUTE PROCEDURE get_rpt_phil(" . $offenderId . ")";

$conn = getConnection();

$stmt = sqlsrv_query($conn,
    "select top 1 photo from ofndr_photo where ofndr_num="
    . $offenderId
    . " order by photo_dt desc, photo_id desc");

if ($stmt) {
  $getAsType = SQLSRV_PHPTYPE_STREAM(SQLSRV_ENC_BINARY);
  $result = sqlsrv_fetch($stmt);
  if (null != $result) {
    if ($result) {
      $image = sqlsrv_get_field($stmt, 0, $getAsType);
      fpassthru($image);
    } else {
      die (print_r(sqlsrv_errors(), true));
    }
  } else {
    readfile('../resources/noPhoto.jpg');
  }
} else {
  die(print_r(sqlsrv_errors(), true));
}

sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);

