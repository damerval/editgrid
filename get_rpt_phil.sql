DROP FUNCTION informix.get_rpt_phil (INTEGER);

CREATE FUNCTION informix.get_rpt_phil (i_ofndrnum INTEGER) RETURNING 

  INTEGER AS offenderID,
  CHAR(80) AS offenderName,
  CHAR(35) AS location,
  DATE AS dateOfBirth,
  CHAR(6) AS gender,
  CHAR(50) AS legalStatus,
  CHAR(2) AS houseSection,
  CHAR(5) AS bedName,
  CHAR(4) AS cellID,
  CHAR(50) AS supervision,
  DATE AS releaseDate,
  DATE AS intakeDate,
  CHAR(1) AS sex,
  VARCHAR(5) AS sexOffender,
  VARCHAR(15) AS adminSegregationStatus,
  CHAR(12) AS criminalDegree,
  CHAR(23) AS preAStatus,
  BLOB as photo
  ;

DEFINE o_ofndr_num INTEGER;
DEFINE o_ofndr_full_name CHAR(80);
DEFINE o_intake_date DATE;
DEFINE o_gender CHAR(6);
DEFINE o_sex CHAR(1);
DEFINE o_prsn_unit_name CHAR(35);
DEFINE o_lgl_stat_desc CHAR(50);
DEFINE o_p_house_sctn_name CHAR(2);
DEFINE o_bed_name CHAR(5);
DEFINE o_cell_id CHAR(4);
DEFINE o_ofndr_dtbrth DATE;
DEFINE o_class CHAR(50);
DEFINE o_crime CHAR(50);
DEFINE o_scheduled_release_date DATE;
DEFINE o_sex_offender VARCHAR(5);
DEFINE o_ad_seg_stat VARCHAR(15);
DEFINE o_crm_dgr CHAR(12);
DEFINE o_prea_stat CHAR(23);
DEFINE o_status         INTEGER;
DEFINE o_photo BLOB;
DEFINE l_ofndr_num INTEGER;

DEFINE GLOBAL g_sqlcode     INTEGER DEFAULT 0;
DEFINE GLOBAL g_isamcode    INTEGER DEFAULT 0;
DEFINE GLOBAL g_errval      CHAR(80) DEFAULT "";

/*
ON EXCEPTION SET g_sqlcode, g_isamcode, g_errval
    CALL rollback_work() RETURNING o_status;
    CALL i_errlog("get_faclty_roster_rpt");
    RETURN g_sqlcode, NULL, NULL, NULL, NULL, NULL,
                      NULL, NULL, NULL, NULL, NULL,
                      NULL, NULL, NULL, NULL, NULL, NULL, NULL;
END EXCEPTION;
*/
BEGIN
  LET o_ofndr_num = i_ofndrnum;
  LET o_ofndr_full_name = NULL;
  LET o_prsn_unit_name = NULL;
  LET o_ofndr_dtbrth = NULL;
  LET o_gender = NULL;
  LET o_lgl_stat_desc = NULL;
  LET o_p_house_sctn_name = NULL;
  LET o_bed_name = NULL;
  LET o_cell_id = NULL;
  LET o_class = NULL;
  LET o_scheduled_release_date = NULL;
  LET o_intake_date = NULL;
  LET o_sex = NULL;
  LET o_sex_offender = NULL;
  LET o_ad_seg_stat = NULL;
  LET o_crm_dgr = NULL;
  LET o_prea_stat = NULL;
  LET o_photo = NULL;

  SELECT DISTINCT
    o.ofndr_num, loc.body_loc_desc,
    CASE WHEN o.sex='M' THEN 'MALE' ELSE 'FEMALE' END AS gender,
    (SELECT CASE 
      WHEN active_caution IS NOT NULL THEN 'YES'   
      WHEN (caution_ended >= last_charged_date) OR (caution_ended >= last_convicted_date)  THEN 'NO' 
      WHEN active_caution IS NULL AND caution_ended IS NULL 
        AND last_booking_date IS NULL AND last_convicted_date IS NOT NULL THEN 'CHRGD'
      WHEN last_charged_date >= last_booking_date OR last_convicted_date >= last_booking_date THEN 'CHRGD'
      WHEN (caution_ended < last_convicted_date) OR (caution_ended < last_charged_date) THEN 'CHRGD'
      ELSE 'NO' END AS sex_offender FROM ofndr_sex_ofndr_view WHERE ofndr_num= o.ofndr_num) AS sex_offender,
	 get_ofndr_fullname(o.ofndr_num) AS offender_name, olh.assgn_dt, o.sex
  INTO o_ofndr_num, o_prsn_unit_name, o_gender, o_sex_offender, o_ofndr_full_name, o_intake_date, o_sex
  FROM ofndr o LEFT JOIN ofndr_loc_hist olh ON olh.ofndr_num = o.ofndr_num 
  JOIN body_loc_cd loc ON loc.body_loc_cd = olh.body_loc_cd
  LEFT JOIN prsn_unit pu ON pu.body_loc_cd = olh.body_loc_cd
  WHERE o.ofndr_num=i_ofndrnum AND olh.end_dt IS NULL;

  SELECT FIRST 1 * 
  INTO l_ofndr_num, o_p_house_sctn_name, o_cell_id, o_bed_name
  FROM (SELECT
  		o.ofndr_num,db.p_house_sctn_name, db.cell_id, db.bed_name
  		FROM ofndr o 
  		LEFT JOIN dio_ofndr_bed dob ON dob.ofndr_num=o.ofndr_num AND dob.end_dt IS NULL 
  		LEFT JOIN dio_bed db ON db.bed_id = dob.bed_id
  		WHERE o.ofndr_num=i_ofndrnum
  		ORDER BY dob.strt_dt DESC, dob.strt_tm DESC
  ) sub;
  
  SELECT photo
  into o_photo
  FROM ofndr_photo WHERE ofndr_num=i_ofndrnum
  AND photo_id=(SELECT max(photo_id) FROM ofndr_photo WHERE ofndr_num=i_ofndrnum);

  SELECT ofndr_num, nvl(max(DefaultDOB), max(dob))
  INTO l_ofndr_num, o_ofndr_dtbrth
  FROM (select ona.ofndr_num, od.dob,
		  CASE WHEN od.dob_typ_cd='D' THEN od.dob ELSE NULL END as DefaultDOB from ofndr_name ona JOIN ofndr_dob od ON ona.name_id=od.name_id 
  		  WHERE ona.ofndr_num = i_ofndrnum) 
  GROUP BY ofndr_num;

  SELECT FIRST 1 lgl_stat_desc 
  INTO o_lgl_stat_desc
  FROM (SELECT lgl_stat_desc FROM ofndr_lgl_stat ols JOIN lgl_stat_cd ON lgl_stat_cd.lgl_stat_cd = ols.lgl_stat_cd
  WHERE ofndr_num=i_ofndrnum ORDER BY stat_beg_dt DESC, stat_beg_tm DESC);

  SELECT FIRST 1 clfn_cstdy_title 
  INTO o_class 	
  FROM (
  	SELECT cd.clfn_cstdy_title
  	FROM ofndr_clfn oc JOIN clfn_cstdy_lvl_cd cd ON oc.base_cstdy_lvl_cd=cd.clfn_cstdy_lvl_cd
  	WHERE oc.ofndr_num=i_ofndrnum AND oc.effective_date IS NOT NULL 
  	ORDER BY oc.init_dt DESC, oc.ofndr_clfn_id DESC 
  );

  SELECT unnamed_col_4 
  INTO o_scheduled_release_date
  FROM TABLE(PROCEDURE get_ofndr_dates(i_ofndrnum));

  SELECT FIRST 1 bci_caution_desc 
  INTO o_prea_stat
  FROM (SELECT b.bci_caution_desc
    FROM ofndr_caution a, bci_caution_cd b 
    WHERE a.ofndr_num = i_ofndrnum
    AND a.end_dt is NULL
    AND a.bci_caution_cd in (103,104)
    AND a.bci_caution_cd = b.bci_caution_cd
    ORDER BY a.strt_dt desc
  );
  
  SELECT FIRST 1 ad_seg_typ_cd, crmdg
  INTO o_ad_seg_stat, o_crm_dgr
  FROM (
    SELECT o.ofndr_num, a.ad_seg_id, a.begin_dt, t.ad_seg_typ_cd, c.ad_seg_typ_desc, 
      (SELECT unnamed_col_2 FROM TABLE(PROCEDURE get_ofndr_crmnl_dg(a.ofndr_num))) crmdg
    FROM ofndr o
    LEFT JOIN ad_seg a ON a.ofndr_num = o.ofndr_num
    LEFT JOIN ad_seg_typ t ON t.ad_seg_id = a.ad_seg_id AND t.end_dt IS NULL 
    LEFT JOIN ad_seg_typ_cd c ON c.ad_seg_typ_cd = t.ad_seg_typ_cd
    WHERE o.ofndr_num=i_ofndrnum
    ORDER BY a.begin_dt DESC 
  );
		
  RETURN 
        o_ofndr_num
      , o_ofndr_full_name
      , o_prsn_unit_name
      , o_ofndr_dtbrth
      , o_gender
      , o_lgl_stat_desc
      , o_p_house_sctn_name
      , o_bed_name
      , o_cell_id
      , o_class
      , o_scheduled_release_date
      , o_intake_date
      , o_sex
      , o_sex_offender
      , o_ad_seg_stat
      , o_crm_dgr
      , o_prea_stat
		, o_photo;
      
      
END
END FUNCTION;