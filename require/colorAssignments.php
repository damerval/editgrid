<?php
/**
 * Created in PhpStorm.
 * User: pdamerval
 * Date: 10/17/2016
 * Time: 2:48 PM
 */
require_once ("sqlSrv.php");

echo getSet("
  SELECT ca_id, offenderId, dbo.get_ofndr_fullname(offenderId) as ofn, color, startDate, endDate
  FROM color_assignments;
", null);