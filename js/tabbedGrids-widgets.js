function makeButtons(objArray, specs) {
  $.each(objArray, function(ndx, obj) {
    obj.jqxButton(specs);
  });
}

$(document).ready(function() {

  wgtTabs = $("#tabs").jqxTabs({
    width: 800, height: 605, theme: 'metro',
    animationType: 'fade', contentTransitionDuration: 750
  });

  offenderGridAdapter = new $.jqx.dataAdapter(offenderSource);

  wgtOffenders = $("#offenderGrid").jqxGrid({
    width: 775, height: 515, theme: 'metro',
    source: offenderGridAdapter,
    columns: offenderColumns,
    altrows: true,
    sortable: true,
    pageable: true,
    pagerMode: 'simple'
  });

  wgtOffenderButtonBar = $("#offenderButtonBar").jqxPanel({ width: 775, height: 35, theme: 'metro' });
  btnOffTest = $("#offenderTestButton");
  btnOffSecond = $("#offenderSecondButton");
  btnOffThird = $("#offenderThirdButton");

  wgtOffenderLocations = $("#locationGrid").jqxGrid({
    width: 776, height: 515, theme: 'metro',
    source: new $.jqx.dataAdapter(locationSource),
    columns: locationColumns,
    altrows: true,
    sortable: true, pageable: true, pagerMode: 'simple'
  });

  wgtLocationsButtonBar = $("#locationButtonBar").jqxPanel({ width: 776, height: 35, theme: 'metro' });
  btnLocTest = $("#locationTestButton");
  btnLocSecond = $("#locationSecondButton");
  btnLocThird = $("#locationThirdButton");

  currentOffenderBox = $("#currentOffender");

  wgtLegalStatus = $("#legalStatusGrid").jqxGrid({
    width: 776, height: 515, theme: 'metro',
    source: new $.jqx.dataAdapter(legalStatusSource),
    columns: legalStatusColumns,
    altrows: true,
    sortable: true,
    pageable: true,
    pagerMode: 'simple'
  });

  wgtLegalStatusButtonBar = $("#legalStatusButtonBar").jqxPanel({ width: 776, height: 35, theme: 'metro' });
  btnLegTest = $("#legalTestButton");
  btnLegSecond = $("#legalSecondButton");
  btnLegThird = $("#legalThirdButton");

  makeButtons(
      [btnOffTest, btnOffSecond, btnOffThird, btnLocTest, btnLocSecond, btnLocThird,
        btnLegTest, btnLegSecond, btnLegThird],
      { width: 100, height: 25, theme: 'metro' }
  );

  vignettePhoto = $("#vignettePhoto");

  vignetteOffenderID = $("#valOffenderID");
  vignetteOffenderName = $("#valOffenderName");
  vignetteLocation = $("#valLocation");
  vignetteDOB = $("#valDateOfBirth");
  vignetteGender = $("#valGender");
  vignetteLegalStatus = $("#valLegalStatus");
  vignetteBedAssignment = $("#valBed");
  vignetteSupervisionLevel = $("#valSupervision");
  vignetteScheduledRelease = $("#valScheduledRelease");
  vignetteArrivalDate = $("#valIntakeDate");
  vignetteSexOffender = $("#valSexOffender");
  vignetteCriminalDegree = $("#valCriminalDegree");
  vignetteAdSeg = $("#valAdSeg");
  vignettePreAStatus = $("#valPreAStatus");

  webcamButton = $("#webcamButton");
  uploadButton = $("#uploadButton");
  cropWindowButton = $("#cropWindowButton");
  submitButton = $("#submitButton");
  snapButton = $("#snapButton");
  cancelSnap = $("#cancelSnap");
  cropButton = $("#cropButton");
  cropCancelButton = $("#cropCancelButton");

  makeButtons([webcamButton, uploadButton], { width: 150, height: 23, theme: 'metro' });
  makeButtons([cropWindowButton, submitButton], { width: 150, height: 23, theme: 'metro', disabled: true });
  makeButtons([snapButton, cancelSnap, cropButton, cropCancelButton], {width: 115, height: 23, theme: 'metro' });

  uploadFile = $("#uploadFile");

  cropImageWindow = $("#cropImageWindow").jqxWindow({
    height: 515, width: 330, position: {x: 200, y: 150},
    autoOpen: false, okButton: cropButton, cancelButton: cropCancelButton,
    isModal: true
  });

  webcamWindow = $("#webcamWindow").jqxWindow({
    height: 310, width: 340, position: {x: 200, y: 150},
    autoOpen: false, okButton: snapButton, cancelButton: cancelSnap,
    isModal: true
  });

  newPhotoBox = $("#newPhotoBox");
  imageToCrop = $("#imageToCrop");

  imageToCrop.croppie({ viewport: { width: 180, height: 225 }});

  Webcam.set({
    width: 320, height: 240, image_format: 'jpeg', jpeg_quality: 100, dest_height: 480, dest_width: 640
  });

  vignettePhoto.html('<img src="resources/noPhoto.jpg" alt="No Photo" width="180" height="225"/>');

});