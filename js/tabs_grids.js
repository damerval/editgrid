/**
 * Created by pdamerval on 10/4/2016.
 */

var setupTabs = function(tabObj) {
  tabObj.jqxTabs({ width: 800, height: 600, theme: 'metro' });
};

var setupOffenderButtonBar = function(barObj) {
  barObj.jqxPanel({ width: 775, height: 35, theme: 'metro' });
};

var setupOffenderGrid = function(gridObj) {

  var gridSource = {
    url: "/require/offenderList.php",
    dataFields: [
      { name: 'offenderId', type: 'int' },
      { name: 'fullName', type: 'string' },
      { name: 'hairColorCode', type: 'string' },
      { name: 'eyeColorCode', type: 'string' },
      { name: 'height', type: 'string' },
      { name: 'sex', type: 'string' },
      { name: 'raceCode', type: 'string' },
      { name: 'religionCode', type: 'string' }
    ],
    dataType: 'json',
    id: 'offenderId',
    pageSize: 16
  };

  var sourceAdapter = new $.jqx.dataAdapter(gridSource);

  gridObj.jqxGrid({
    width: 775, height: 515, theme: 'metro',
    source: sourceAdapter,
    altrows: true,
    columns: [
      { text: "Name", dataField: 'fullName', width: 300 },
      { text: "Hair color", dataField: 'hairColorCode', width: 70 },
      { text: "Eye color", dataField: 'eyeColorCode', width: 70 },
      { text: "Height", dataField: 'height', width: 100 },
      { text: "Sex", dataField: 'sex', width: 70 },
      { text: "Race", dataField: 'raceCode', width: 70 },
      { text: "Religion", dataField: 'religionCode', width: 70 }
    ],
    sortable: true,
    pageable: true,
    pagerMode: 'simple'
  });
};

var setupButtons = function(buttonsArray) {
  $.each(buttonsArray, function(ndx, obj) {
    obj.jqxButton({ width: 100, height: 25, theme: 'metro' });
  });
};

