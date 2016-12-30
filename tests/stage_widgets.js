/**
 * Created by pdamerval on 12/30/2016.
 */

var colorAssignmentWindow;
var cawSaveButton;
var cawCancelButton;
var cawOffenderSelect;
var cawColorSelect;
var cawStartDate;
var cawEndDate;
var offenderDataAdapter;

$(document).ready(function() {

  cawSaveButton = $("#cawSave").jqxButton({ width: 75, height: 21, theme: 'metro' });
  cawCancelButton = $("#cawCancel").jqxButton({ width: 75, height: 21, theme: 'metro' });
  cawOffenderSelect = $("#cawOffender").jqxDropDownList({ width: 250, height: 25, theme: 'metro' });
  cawColorSelect = $("#cawColor").jqxDropDownList({ source: htmlColors, width: 250, height: 25, theme: 'metro' });
  cawStartDate = $("#cawStart").jqxDateTimeInput({ width: 250, height: 25, theme: 'metro' });
  cawEndDate = $("#cawEnd").jqxDateTimeInput({ width: 250, height: 25, theme: 'metro' });

  colorAssignmentWindow = $("#colorAssignmentsWindow").jqxWindow({
    width: 345, theme: 'metro', okButton: cawSaveButton, cancelButton: cawCancelButton,
    isModal: true, autoOpen: true
  });

  offenderDataAdapter = new $.jqx.dataAdapter({
    url: '/require/offenderList.php',
    dataType: 'json',
    dataFields: [
      { name: 'offenderId', type: 'int' },
      { name: 'fullName', type: 'string' },
      { name: 'hairColorCode', type: 'string' },
      { name: 'eyeColorCode', type: 'string' },
      { name: 'height', type: 'string' },
      { name: 'sex', type: 'string' },
      { name: 'raceCode', type: 'string' },
      { name: 'religionCode', type: 'string' },
      { name: 'location', type: 'int' }
    ],
    id: 'offenderId'
  });



});