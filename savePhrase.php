<?php
/**
 * Created by PhpStorm.
 * User: pdamerval
 * Date: 8/30/2016
 * Time: 10:23 AM
 */

require_once("dataFunctions.php");

if (isset($_GET["phrase_text"])) {
  $sql = "INSERT INTO phrases (phrase) values (" . $_GET['phrase_text'] . ")";
  echo get_result_bool($sql);
} else echo "false";
