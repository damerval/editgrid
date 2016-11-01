/*** CURRENT OFFENDER TOKEN ***/
var currentOffender = 0;
var currentOffenderBox;

/***  MAIN TABS WIDGET ***/
var wgtTabs;

/*** OFFENDER GRID DATA SETUP ***/
var wgtOffenders;
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

var offenderGridAdapter;

/*** OFFENDER BUTTON BAR ***/
var wgtOffenderButtonBar;
var btnOffTest;
var btnOffSecond;
var btnOffThird;

/*** LOCATION CODES FK ***/
var locationCodesSource = {
  url: "require/locationCodes.php",
  dataFields: [
    { name: 'locationCode', type: 'string' },
    { name: 'locationDesc', type: 'string' }
  ],
  dataType: 'json',
  id: 'locationCode',
  async: false
};

/*** MOVE REASON CODES FK ***/
var reasonCodesSource = {
  url: "require/reasonCodes.php",
  dataField: [
    { name: 'rCode', type: 'int' },
    { name: 'rDesc', type: 'string' }
  ],
  dataType: 'json',
  id: 'rCode',
  async: false
};

/*** OFFENDER LOCATIONS GRID DATA SETUP ***/
var wgtOffenderLocations;
var locationSource = {
  url: "require/offenderLocations.php",
  data: { offenderId: currentOffender },
  dataFields: [
    { name: 'locationCode', type: 'string' },
    { name: 'location', value: 'locationCode',
      values: {
        source: (new $.jqx.dataAdapter(locationCodesSource, { autoBind: true })).records,
        value: 'locationCode',
        name: 'locationDesc'
      }},
    { name: 'start', map: 'start>date', type: 'date' },
    { name: 'startTime', map: 'startTime>date', type: 'date' },
    { name: 'reasonCode', type: 'int' },
    { name: 'reason', value: 'reasonCode',
      values: {
        source: (new $.jqx.dataAdapter(reasonCodesSource, { autoBind: true })).records,
        value: 'rCode',
        name: 'rDesc'
      }},
    { name: 'endDate', map: 'endDate>date', type: 'date' }
  ],
  dataType: 'json',
  pageSize: 16
};

var locationColumns = [
  { text: "Location", dataField: 'locationCode', displayField: 'location' },
  { text: "Start", dataField: 'start', cellsformat: 'MM/dd/yyyy', width: 100 },
  { text: "Start Time", dataField: 'startTime', cellsformat: 'HH:mm', width: 100 },
  { text: "Reason", dataField: 'reasonCode', displayField: 'reason' },
  { text: "End", dataField: 'endDate', cellsFormat: 'MM/dd/yyyy', width: 100 }
];

/*** OFFENDER LOCATIONS BUTTON BAR ***/
var wgtLocationsButtonBar;
var btnLocTest;
var btnLocSecond;
var btnLocThird;

/*** LEGAL STATUS CODES FK ***/
var legStatCodesSource = {
  url: "require/legalStatusCodes.php",
  dataFields: [
    { name: 'valKey', type: 'string' },
    { name: 'valDesc', type: 'string' }
  ],
  dataType: 'json',
  id: 'valKey',
  async: false
};

/*** LEGAL STATUS CHANGE CODES FK ***/
var legStatChangeCodesSource = {
  url: "require/legalStatusChangeCodes.php",
  dataFields: [
    { name: 'valKey', type: 'int' },
    { name: 'valDesc', type: 'string' }
  ],
  dataType: 'json',
  id: 'valKey',
  async: false
};

/*** LEGAL STATUS GRID DATA SETUP ***/
var wgtLegalStatus;
var legalStatusSource = {
  url: "require/offenderLegalStatus.php",
  data: { offenderId: currentOffender },
  dataFields: [
    { name: 'statCode', type: 'string' },
    { name: 'status', type: 'string', value: 'statCode',
      values: {
        source: (new $.jqx.dataAdapter(legStatCodesSource, { autoBind: true })).records,
        value: 'valKey', name: 'valDesc'
      }
    },
    { name: 'chgCode', type: 'int' },
    { name: 'changeReason', type: 'int', value: 'chgCode',
      values: {
        source: (new $.jqx.dataAdapter(legStatChangeCodesSource, { autoBind: true })).records,
        value: 'valKey', name: 'valDesc'
      }
    },
    { name: 'beginDt', map: 'beginDt>date', type: 'date' },
    { name: 'beginTm', map: 'beginTm>date', type: 'date' },
    { name: 'endDt', map: 'endDt>date', type: 'date' }
  ],
  dataType: 'json',
  pageSize: 16
};

var legalStatusColumns = [
  { text: 'Status', dataField: 'statCode', displayField: 'status', width: 200 },
  { text: 'Started on', dataField: 'beginDt', cellsformat: 'MM/dd/yyyy', width: 100 },
  { text: 'At', dataField: 'beginTm', cellsformat: 'HH:mm', width: 50 },
  { text: 'Change reason', dataField: 'chgCode', displayField: 'changeReason', width: 326 },
  { text: 'Ended on', dataField: 'endDt', cellsformat: 'MM/dd/yyyy', width: 100 }
];

/*** LEGAL STATUS BUTTON BAR ***/
var wgtLegalStatusButtonBar;
var btnLegTest;
var btnLegSecond;
var btnLegThird;