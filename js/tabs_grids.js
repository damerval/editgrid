/**
 * Created by pdamerval on 10/4/2016.
 */

var selectedOffender = 0;

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
      { name: 'hairColor', value: 'hairColorCode', values: {source: HAIR_COLORS, value: 'code', name: 'color'} },
      { name: 'eyeColorCode', type: 'string' },
      { name: 'eyeColor', value: 'eyeColorCode', values: {source: EYE_COLORS, value: 'code', name: 'color'} },
      { name: 'height', type: 'string' },
      { name: 'sex', type: 'string' },
      { name: 'raceCode', type: 'string' },
      { name: 'race', value: 'raceCode', values: { source: RACES, value: 'code', name: 'race' } },
      { name: 'religionCode', type: 'string' },
      { name: 'religion', value: 'religionCode', values: { source: RELIGIONS, value: 'code', name: 'religion' } }
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
      { text: "Name", dataField: 'fullName', width: 220 },
      { text: "Hair color", dataField: 'hairColorCode', displayField: 'hairColor', width: 90 },
      { text: "Eye color", dataField: 'eyeColorCode', displayField: 'eyeColor', width: 70 },
      { text: "Height", dataField: 'height', width: 55 },
      { text: "Sex", dataField: 'sex', width: 60 },
      { text: "Race", dataField: 'raceCode', displayField: 'race', width: 150 },
      { text: "Religion", dataField: 'religionCode', displayField: 'religion', width: 130 }
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

