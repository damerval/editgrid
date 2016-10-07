<?php
/**
 * Created by PhpStorm.
 * User: pdamerval
 * Date: 10/3/2016
 * Time: 12:51 PM
 */

require_once ("sqlSrv.php");

echo getSet(
  "SELECT * FROM (SELECT top 100
     o.ofndr_num as offenderId, dbo.get_ofndr_fullname(o.ofndr_num) as fullName,
     o.hair_color_cd as hairColorCode, o.eye_color_cd as eyeColorCode,
     coalesce(ltrim(str(o.ht_ft)) + 'ft ', '') + coalesce(ltrim(str(o.ht_in)) + 'in', '') as height,
     CASE o.sex WHEN 'M' then 'Male' WHEN 'F' THEN 'Female' WHEN 'G' then 'Transgender' when 'N' then 'Unknown' END as sex ,
     o.race_cd as raceCode, o.rlgn_cd as religionCode
  from ofndr o
  where o.ofndr_num between 400000 and 700000 and o.rlgn_cd not in ('00','99')
  order by newid()) t ORDER BY t.fullName", null
);