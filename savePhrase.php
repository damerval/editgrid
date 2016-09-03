<?php
/**
 * Created by PhpStorm.
 * User: pdamerval
 * Date: 8/30/2016
 * Time: 10:23 AM
 */
require_once("dataFunctions.php");

if (isset($_GET['phrase_text']) && isset($_GET['operation'])) {
  $phraseText = $_GET['phrase_text'];
  $operation = $_GET['operation'];
  if ($operation == "insert") {
    echo get_result_cud("INSERT INTO phrases (phrase) VALUES ('" . addslashes(urldecode($phraseText)) . "')", $operation);
  } elseif (isset($_GET['row_id'])) {
    $rowId = $_GET['row_id'];
    if ($operation == "update") {
      echo get_result_cud("UPDATE phrases SET phrase = '" . addslashes(urldecode($phraseText)) . "' WHERE phrase_id = " . $rowId, $operation);
    } elseif ($operation == "delete") {
      echo get_result_cud("DELETE FROM phrases WHERE phrase_id = " . $rowId, $operation);
    } else {
      echo "Invalid operation requested (insert, update, delete).";
    }
  } else echo "Missing row id for update/delete.";
} else echo "GET must have at least [phrase_text] and [operation] fields set.";