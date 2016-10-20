function makeButtons(objArray, specs) {
  $.each(objArray, function(ndx, obj) {
    obj.jqxButton(specs);
  });
}

$(document).ready(function() {

  wgtTabs = $("#tabs").jqxTabs({
    width: 800, height: 605, theme: 'metro',
    animationType: 'fade', contentTransitionDuration: 250
  });

  wgtOffenders = $("#offenderGrid").jqxGrid({
    width: 775, height: 515, theme: 'metro',
    source: new $.jqx.dataAdapter(offenderSource),
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

  wgtLocationsButtonBar = $("#locationButtonBar").jqxPanel({ width: 775, height: 35, theme: 'metro' });
  btnLocTest = $("#locationTestButton");
  btnLocSecond = $("#locationSecondButton");
  btnLocThird = $("#locationThirdButton");

  makeButtons([btnOffTest, btnOffSecond, btnOffThird, btnLocTest, btnLocSecond, btnLocThird],
      { width: 100, height: 25, theme: 'metro' });

  currentOffenderBox = $("#currentOffender");

});