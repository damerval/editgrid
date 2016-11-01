<?php
/**
 * Created in PhpStorm.
 * User: pdamerval
 * Date: 10/6/2016
 * Time: 1:34 PM
 */

require_once ("sqlSrv.php");

$return = "[]";
$selectedOffender = (isset($_GET['offenderId']) ? $_GET['offenderId'] : 0);

if ($selectedOffender != 0) {

  $return = getSet("
    SELECT
      lgl_stat_cd statCode, lgl_stat_chg_cd chgCode, stat_beg_dt beginDt, stat_beg_tm beginTm, stat_end_dt endDt
    FROM ofndr_lgl_stat
    where ofndr_num = ". $selectedOffender . "
    order by stat_beg_dt desc, stat_beg_tm desc  
", array($selectedOffender));

}

echo $return;