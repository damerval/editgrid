<?php
/**
 * Created in PhpStorm.
 * User: pdamerval
 * Date: 10/17/2016
 * Time: 2:48 PM
 */
require_once ("sqlSrv.php");

echo getSet("
  select assgn_rsn_cd rCode, assgn_rsn_desc rDesc from asssgn_rsn_cd
", null);