$(document).ready(function () {

  /*** EVERY TIME A USER SELECTS AN OFFENDER IN THE OFFENDERS TAB ***/
  wgtOffenders.on('rowselect', function (event) {
    //Set current offender, used downstream
    currentOffender = event.args.row['offenderId'];
    //Update the little current offender box at right of tabs
    currentOffenderBox.text(event.args.row['offenderId'] + ' - ' + event.args.row['fullName']);
    //Update location history to show current offender locations
    locationSource.data = {offenderId: currentOffender};
    wgtOffenderLocations.jqxGrid('source', new $.jqx.dataAdapter(locationSource));
    //Update legal history to show current offender legal statuses
    legalStatusSource.data = {offenderId: currentOffender};
    wgtLegalStatus.jqxGrid('source', new $.jqx.dataAdapter(legalStatusSource));
    //Fetch current offender photo and display in vignette in fact sheet tab
    vignettePhoto.css("background-image", "url('/require/getPhoto.php?id=" + currentOffender + "')");
    //Ajax-Fetch current offender data and fill in vignette form fields if successful
    $.ajax("/require/offenderSheetData.php", {
      cache: false, data: { id: currentOffender },
      success: function(data) {
        if (isJson(data)) {
          var result = JSON.parse(data); //expect array containing single object
          var vignetteObj = result[0];   //First and only element in array - single row return
          vignetteOffenderID.text(blankIfNull(vignetteObj['offenderID']));
          vignetteOffenderName.text(blankIfNull(vignetteObj['offenderName']));
          vignetteLocation.text(blankIfNull(vignetteObj['location']));
          vignetteGender.text(blankIfNull(vignetteObj['gender']));
          vignetteDOB.text(dfWithNull(vignetteObj['dateOfBirth'], "dd-mmm-yyyy"));
          vignetteLegalStatus.text(blankIfNull(vignetteObj['legalStatus']));
          vignetteBedAssignment.text(blankIfNull(vignetteObj['houseSection'])
              +' '+blankIfNull(vignetteObj['cellID'])
              +' '+blankIfNull(vignetteObj['bedName']));
          vignetteSupervisionLevel.text(blankIfNull(vignetteObj['supervision']));
          vignetteScheduledRelease.text(dfWithNull(vignetteObj['releaseDate'], "dd-mmm-yyyy"));
          vignetteArrivalDate.text(dfWithNull(vignetteObj['intakeDate'], "dd-mmm-yyyy"));
          vignetteSexOffender.text(blankIfNull(vignetteObj['sexOffender']));
          vignetteCriminalDegree.text(blankIfNull(vignetteObj['criminalDegree']));
          vignetteAdSeg.text(blankIfNull(vignetteObj['adminSegregationStatus']));
          vignettePreAStatus.text(blankIfNull(vignetteObj['preAStatus']));
        } else {
          alert("the server returned a value that could not be used: " + data);
        }
      },
      error: function(jqXHR) {
        alert(jqXHR.responseText);
      }
    });
  });

});
