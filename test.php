<?php
/**
 * Created by PhpStorm.
 * User: pdamerval
 * Date: 9/7/2016
 * Time: 8:09 AM
 */

//require_once ('dataFunctions.php');

//echo get_result_cud("delete from phrases where phrase_id = 32", 'delete');
//echo get_result_cud("insert into phrases(phrase, datefield) values ('This is a phrase', curdate())", "insert");

$t = microtime(true);
$micro = sprintf("%06d",($t - floor($t)) * 1000000);
$d = new DateTime(date('Y-m-d H:i:s.'.$micro, $t));
$d->sub(DateInterval::createFromDateString('9 hours'));
echo $d->format("Y.m.d_H=i=s.u"); // note at point on "u"