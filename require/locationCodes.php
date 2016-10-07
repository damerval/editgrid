<?php
/**
 * Created in PhpStorm.
 * User: pdamerval
 * Date: 10/6/2016
 * Time: 1:50 PM
 */

require_once ("sqlSrv.php");

echo getSet("
  select rtrim(body_loc_cd) code, rtrim(body_loc_desc) location from body_loc_cd where vld_flg='Y'
", null);