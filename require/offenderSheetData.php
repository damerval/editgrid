<?php
/**
 * Created in PhpStorm.
 * User: pdamerval
 * Date: 11/4/2016
 * Time: 8:56 AM
 */

require_once ('sqlSrv.php');

$offenderId = (isset($_GET['id'])) ? $_GET['id'] : 415716;

echo getSet("SELECT 
offenderID, offenderName, location, dateOfBirth, gender, legalStatus, houseSection, bedName, cellID, supervision,
releaseDate, intakeDate, sex, sexOffender, adminSegregationStatus, criminalDegree, preAStatus
 FROM OpenQuery(acomsQA, 'EXECUTE PROCEDURE get_rpt_phil(" . $offenderId . ")')"
    , null);