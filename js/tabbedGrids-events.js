$(document).ready(function () {

  function setPicture(widget, height, width) {
    if (!width) width = 320;
    if (!height) height = 240;
    widget.html('<img src="' + picture + '" width="' + width + '" height="' + height +'" />');
  }

  function takeSnapshot(dest) {
    Webcam.snap(function(data_uri) {
      picture = data_uri;
      setPicture(dest);
    });
  }

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
    vignettePhoto.html('<img src="/require/getPhoto.php?id='
        + currentOffender + '&time='
        + Date.now() + '" alt = "Offender photo" height="225" width="180"/>');
    //Ajax-Fetch current offender data and fill in vignette form fields if successful
    $.ajax("/require/offenderSheetData.php", {
      cache: false, data: { id: currentOffender },
      success: function(data) {
        if (isJson(data)) {
          var result = JSON.parse(data); //expect array containing single object
          vignetteObj = result[0];   //First and only element in array - single row return
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
    newPhotoBox.find("img").attr('src', "");
  });

  webcamButton.on('click', function() {
    webcamWindow.jqxWindow('open');
    Webcam.attach('#camBox');
  });

  uploadButton.on('click', function() {
    uploadFile.click();
  });

  uploadFile.on('change', function(event) {
    if (event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        picture = e.target.result;
        submitButton.jqxButton({ disabled: false });
        cropWindowButton.jqxButton({ disabled: false });
        setPicture(newPhotoBox);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  });

  cropWindowButton.on('click', function() {
    cropImageWindow.jqxWindow('open');
    imageToCrop.croppie('bind', { url: picture });
  });

  snapButton.on('click', function() {
    takeSnapshot(newPhotoBox);
    cropWindowButton.jqxButton({ disabled: false });
    submitButton.jqxButton({ disabled: false });
  });

  cropButton.on('click', function() {
    imageToCrop.croppie('result', {
      type: 'canvas',
      size: 'viewport'
    }).then(function(crop) {
      picture = crop;
      setPicture(newPhotoBox, 225, 180);
      submitButton.jqxButton({ disabled: false });
      cropWindowButton.jqxButton({ disabled: true });
    });
  });

  webcamWindow.on('close', function(event) {
    if (event.args.dialogResult.OK && null != picture) {
      submitButton.jqxButton({disabled: false});
    } else {
      submitButton.jqxButton({disabled: true});
    }
    picture = null;
  });

  submitButton.on('click', function() {
    Webcam.upload(picture,
        'upload.php?offenderNum=' + vignetteObj['offenderID'] + '&XDEBUG_SESSION_START=xdbg',
        function(code, text) {
      if (code === 200) {
        submitButton.jqxButton({disabled: true});
        vignettePhoto.html('<img src="/require/getPhoto.php?id='
            + currentOffender + '&time='
            + Date.now() + '" alt = "Offender photo" height="225" width="180"/>');
      } else {
        alert(code + " " + text);
      }
    });
  });

});
