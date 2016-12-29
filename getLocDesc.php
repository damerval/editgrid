<?php
/**
 * Created by PhpStorm.
 * User: pdamerval
 * Date: 9/23/2016
 * Time: 1:43 PM
 */
require_once ("db.php");

echo trim(getValue("SELECT body_loc_desc as result from body_loc_cd where body_loc_cd=118", null, "result"));