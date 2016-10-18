<?php
/**
 * Created in PhpStorm.
 * User: pdamerval
 * Date: 10/6/2016
 * Time: 1:50 PM
 */

require_once ("sqlSrv.php");

echo getSet("
  select rtrim(body_loc_cd) locationCode, rtrim(body_loc_desc) locationDesc from body_loc_cd 
", null);