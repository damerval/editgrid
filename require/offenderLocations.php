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
    select
      olh.body_loc_cd, olh.assgn_dt, cast(olh.assgn_tm as time) [assgn_tm], olh.assgn_rsn_cd, olh.end_dt
    from ofndr_loc_hist olh
    where ofndr_num = ". $selectedOffender . "
    order by assgn_dt DESC , assgn_tm DESC    
  ", array($selectedOffender));

}

echo $return;