<?php
/**
 * Created in PhpStorm.
 * User: pdamerval
 * Date: 10/17/2016
 * Time: 2:48 PM
 */
require_once ("sqlSrv.php");

echo getSet("
  select lgl_stat_cd valKey, lgl_stat_desc valDesc from lgl_stat_cd
", null);