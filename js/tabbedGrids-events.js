$(document).ready(function () {

  wgtOffenders.on('rowselect', function (event) {
    currentOffenderBox.text(event.args.row['offenderId'] + ' - ' + event.args.row['fullName']);
    currentOffender = event.args.row['offenderId'];
    locationSource.data = {offenderId: currentOffender};
    wgtOffenderLocations.jqxGrid('source', new $.jqx.dataAdapter(locationSource));
    legalStatusSource.data = {offenderId: currentOffender};
    wgtLegalStatus.jqxGrid('source', new $.jqx.dataAdapter(legalStatusSource));
    vignettePhoto.css("background-image", "url('/require/getPhoto.php?id=" + currentOffender + "')");
    $.ajax("/require/offenderSheetData.php", {
      cache: false, data: { id: currentOffender },
      success: function(data) {
        if (isJson(data)) {
          var result = JSON.parse(data); //expect array containing single object
          var vignetteObj = result[0];
          vignetteOffenderID.text(vignetteObj['offenderID']);
          vignetteOffenderName.text(vignetteObj['offenderName']);
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
