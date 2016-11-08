<?php
/**
 * Created by PhpStorm.
 * User: pdamerval
 * Date: 10/3/2016
 * Time: 12:51 PM
 */

require_once ("sqlSrv.php");

echo getSet("
  SELECT top 100 * FROM (
    SELECT
      o.ofndr_num                                                                          AS offenderId,
      dbo.get_ofndr_fullname(o.ofndr_num)                                                  AS fullName,
      o.hair_color_cd                                                                      AS hairColorCode,
      o.eye_color_cd                                                                       AS eyeColorCode,
      coalesce(ltrim(str(o.ht_ft)) + 'ft ', '') + coalesce(ltrim(str(o.ht_in)) + 'in', '') AS height,
      CASE o.sex
      WHEN 'M'
        THEN 'Male'
      WHEN 'F'
        THEN 'Female'
      WHEN 'G'
        THEN 'Transgender'
      WHEN 'N'
        THEN 'Unknown' END                                                                 AS sex,
      o.race_cd                                                                            AS raceCode,
      o.rlgn_cd                                                                            AS religionCode
    FROM ofndr o
    WHERE o.rlgn_cd NOT IN ('00', '99') 
    AND (SELECT count(*) from ofndr_photo where ofndr_photo.ofndr_num=o.ofndr_num) > 0 
  ) t ORDER BY newid()
", null
);