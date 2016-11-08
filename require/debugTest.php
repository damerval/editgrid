<?php
/**
 * Created in PhpStorm.
 * User: pdamerval
 * Date: 11/7/2016
 * Time: 12:04 PM
 */

require_once ("debugFunctions.php");

$a = rand(1001, 9999) / 1000;
$b = rand(1001, 9999) / 1000;

echo multiply($a, $b);