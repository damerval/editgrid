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
var colorAssignmentAddButton;
var colorAssignmentEditButton;
var colorAssignmentDeleteButton;
var colorAssignmentButtonBar;
var offenderOptions;

$(document).ready(function() {

  cawSaveButton = $("#cawSave").jqxButton({ width: 75, height: 23, theme: 'metro' });
  cawCancelButton = $("#cawCancel").jqxButton({ width: 75, height: 23, theme: 'metro' });
  cawOffenderSelect = $("#cawOffender").jqxDropDownList({ width: 250, height: 25, theme: 'metro',
    valueMember: 'offenderId', displayMember: 'choiceString'
  });
  cawColorSelect = $("#cawColor").jqxDropDownList({ source: htmlColors, width: 250, height: 25, theme: 'metro' });
  cawStartDate = $("#cawStart").jqxDateTimeInput({ width: 250, height: 25, theme: 'metro' });
  cawEndDate = $("#cawEnd").jqxDateTimeInput({ width: 250, height: 25, theme: 'metro' });
  colorAssignmentAddButton = $("#cabAdd").jqxButton({ width: 75, height: 25, theme: 'metro' });
  colorAssignmentEditButton = $("#cabEdit").jqxButton({ width: 75, height: 25, theme: 'metro '});
  colorAssignmentDeleteButton = $("#cabDelete").jqxButton({ width: 75, height: 25, theme: 'metro' });
  colorAssignmentButtonBar = $("#colorAssignmentButtons").jqxPanel({ width: 500, height: 27, theme: 'metro' });


  colorAssignmentWindow = $("#colorAssignmentsWindow").jqxWindow({
    width: 350, height: 238, theme: 'metro', okButton: cawSaveButton, cancelButton: cawCancelButton,
    isModal: true, autoOpen: false
  });

  offenderDataAdapter = new $.jqx.dataAdapter({
    url: '/require/offenderList.php',
    dataType: 'json',
    dataFields: [
      { name: 'offenderId', type: 'string' },
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
  }, {
    beforeLoadComplete: function(records) {
      var data = [];
      for (var i = 0; i<records.length; i++) {
        var choice = { offenderId: records[i]['offenderId'], choiceString: records[i]['offenderId'] + " - " + records[i]["fullName"] };
        data.push(choice);
      }
      offenderOptions = new $.jqx.dataAdapter({
        dataType: 'array',
        localData: data,
        dataFields: [
          { name: 'offenderId', type: 'string' },
          { name: 'choiceString', type: 'string' }
        ]
      },{
        autoBind: true
      });
      cawOffenderSelect.jqxDropDownList({ source: offenderOptions });
    }
  });

  $("#testTable").jqxDataTable({
    source: offenderDataAdapter,
    width: 850, height: 329, theme: 'metro', pageable: true, pagerButtonsCount: 10,
    columns: [
      { text: 'Offender ID', dataField: 'offenderId', width: 75 },
      { text: 'Full Name', dataField: 'fullName' },
      { text: 'Hair color', dataField: 'hairColorCode', width: 75 },
      { text: 'Eye color', dataField: 'eyeColorCode', width: 75 },
      { text: 'Height', dataField: 'height', width: 75 },
      { text: 'Sex', dataField: 'sex', width: 40 },
      { text: 'Race', dataField: 'raceCode', width: 40 },
      { text: 'Religion', dataField: 'religionCode', width: 75 },
      { text: 'Location', dataField: 'location', width: 75 }
    ]
  });

});