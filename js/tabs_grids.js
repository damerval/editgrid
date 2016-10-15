/**
 * Created by pdamerval on 10/4/2016.
 */
var currentOffender = 0;
var currentOffenderBox;
var locationGrid;

var locationCodesSource = {
  url: "require/locationCodes.php",
  dataFields: [
    { name: 'locationCode', type: 'int' },
    { name: 'locationDesc', type: 'string' }
  ],
  dataType: 'json',
  id: 'locationCode'
};

var offenderSource = {
  url: "require/offenderList.php",
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

var offenderColumns =  [
  { text: "Name", dataField: 'fullName', width: 220 },
  { text: "Hair color", dataField: 'hairColorCode', displayField: 'hairColor', width: 90 },
  { text: "Eye color", dataField: 'eyeColorCode', displayField: 'eyeColor', width: 70 },
  { text: "Height", dataField: 'height', width: 55 },
  { text: "Sex", dataField: 'sex', width: 60 },
  { text: "Race", dataField: 'raceCode', displayField: 'race', width: 150 },
  { text: "Religion", dataField: 'religionCode', displayField: 'religion', width: 130 }
];

var locationSource = {
  url: "require/offenderLocations.php",
  data: { offenderId: currentOffender },
  dataFields: [
    { name: 'locationCode', type: 'int' },
    { name: 'location', value: 'locationCode',
        values: { source: (new $.jqx.dataAdapter(locationCodesSource)).records, value: 'code', name: 'location'}},
    { name: 'start', map: 'start>date', type: 'date' },
    { name: 'startTime', map: 'startTime>date', type: 'date' },
    { name: 'reasonCode', type: 'int' },
    { name: 'endDate', map: 'endDate>date', type: 'date' }
  ],
  dataType: 'json',
  pageSize: 16
};

var locationColumns = [
  { text: "Location", dataField: 'locationCode', displayField: 'location' },
  { text: "Start", dataField: 'start', cellsformat: 'MM/dd/yyyy' },
  { text: "Start Time", dataField: 'startTime', cellsformat: 'HH:mm' },
  { text: "Reason", dataField: 'reasonCode' },
  { text: "End", dataField: 'endDate', cellsFormat: 'MM/dd/yyyy' }
];

$(document).ready( function() {
  currentOffenderBox = $("#currentOffender");
  locationGrid = $("#locationGrid");
});

var setupTabs = function(tabObj) {
  tabObj.jqxTabs({
    width: 800, height: 600, theme: 'metro',
    animationType: 'fade', contentTransitionDuration: 250
  });
};

var setupOffenderButtonBar = function(barObj) {
  barObj.jqxPanel({ width: 775, height: 35, theme: 'metro' });
};

var setupLocationButtonBar = function(barObj) {
  barObj.jqxPanel({ width: 775, height: 35, theme: 'metro' });
};

var setupOffenderGrid = function(gridObj) {

  gridObj.jqxGrid({
    width: 775, height: 515, theme: 'metro',
    source: new $.jqx.dataAdapter(offenderSource),
    columns: offenderColumns,
    altrows: true,
    sortable: true,
    pageable: true,
    pagerMode: 'simple'
  });

  gridObj.on('rowselect', function(event) {
    currentOffenderBox.text(event.args.row['fullName']);
    currentOffender = event.args.row['offenderId'];
    locationSource.data = { offenderId: currentOffender };
    locationGrid.jqxGrid('source', new $.jqx.dataAdapter(locationSource));
  });
};

var setupButtons = function(buttonsArray) {
  $.each(buttonsArray, function(ndx, obj) {
    obj.jqxButton({ width: 100, height: 25, theme: 'metro' });
  });
};

function setupOffenderLocationsGrid(gridObj) {

  gridObj.jqxGrid({
    width: 775, height: 515, theme: 'metro',
    source: new $.jqx.dataAdapter(locationSource),
    columns: locationColumns,
    altrows: true,
    sortable: true, pageable: true, pagerMode: 'simple'
  });

}