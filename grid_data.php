<?php
/**
 * Created in PhpStorm.
 * User: pdamerval
 * Date: 8/26/2016
 * Time: 11:50 AM
 */
require_once("dataFunctions.php");

echo get_result_set("select phrase_id, phrase, datefield as date_field, numberField from phrases");
