$(document).ready(function () {

  wgtOffenders.on('rowselect', function (event) {
    currentOffenderBox.text(event.args.row['offenderId'] + ' - ' + event.args.row['fullName']);
    currentOffender = event.args.row['offenderId'];
    locationSource.data = {offenderId: currentOffender};
    wgtOffenderLocations.jqxGrid('source', new $.jqx.dataAdapter(locationSource));
  });

});
