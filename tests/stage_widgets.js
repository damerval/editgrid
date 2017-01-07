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
var testButton;
var caDataAdapter;
var caGrid;

var colorRenderer = function (row, datafield, value) {
  return '<div class="foo" ' +
      'style="height: 28px; text-align: center; line-height: 26px; background-color: ' +
      value + '"> </div>';
};

$(document).ready(function() {

  cawSaveButton = $("#cawSave").jqxButton({ width: 75, height: 23, theme: 'metro' });
  cawCancelButton = $("#cawCancel").jqxButton({ width: 75, height: 23, theme: 'metro' });
  cawOffenderSelect = $("#cawOffender").jqxDropDownList({ width: 250, height: 25, theme: 'metro',
    valueMember: 'offenderId', displayMember: 'choiceString'
  });
  cawColorSelect = $("#cawColor").jqxDropDownList({ source: htmlColors, width: 250, height: 25, theme: 'metro' });
  cawStartDate = $("#cawStart").jqxDateTimeInput({ width: 250, height: 25, theme: 'metro',
      formatString: 'MM/dd/yyyy' });
  cawEndDate = $("#cawEnd").jqxDateTimeInput({ width: 250, height: 25, theme: 'metro', value: null,
      formatString: 'MM/dd/yyyy' });
  colorAssignmentAddButton = $("#cabAdd").jqxButton({ width: 75, height: 25, theme: 'metro' });
  colorAssignmentEditButton = $("#cabEdit").jqxButton({ width: 75, height: 25, theme: 'metro', disabled: true });
  colorAssignmentDeleteButton = $("#cabDelete").jqxButton({ width: 75, height: 25, theme: 'metro', disabled: true });
  colorAssignmentButtonBar = $("#colorAssignmentButtons").jqxPanel({ width: 500, height: 27, theme: 'metro' });

  testButton = $("#testButton").jqxButton({ width: 75, height: 23, theme: 'metro' });

  colorAssignmentWindow = $("#colorAssignmentsWindow").jqxWindow({
    width: 350, height: 238, theme: 'metro', okButton: cawSaveButton, cancelButton: cawCancelButton,
    isModal: true, autoOpen: false
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
  }, {
    beforeLoadComplete: function(records) {
      var data = [];
      for (var i = 0; i<records.length; i++) {
        var choice = {
            offenderId: records[i]['offenderId'],
            choiceString: records[i]['offenderId'] + " - " + records[i]["fullName"] };
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

  caDataAdapter = new $.jqx.dataAdapter({
    url: '../require/colorAssignments.php',
    dataType: 'json',
    dataFields: [
      { name: 'ca_id', type: 'int' },
      { name: 'offenderId', type: 'int' },
      { name: 'offender', map: 'ofn', type: 'string' },
      { name: 'color', type: 'string' },
      { name: 'startDate', map: 'startDate>date', type: 'date' },
      { name: 'endDate', map: 'endDate>date', type: 'date' }
    ],
    id: 'ca_id',
    pageSize: 10
  });

  caGrid = $("#colorAssignmentsGrid").jqxGrid({
    width: 510, height: 346, theme: 'metro', sortable: true, pageable: true, pagerButtonsCount: 10,
    source: caDataAdapter, pagerMode: 'simple', rowsHeight: 28,
    columns: [
      { text: 'Offender ID', dataField: 'offenderId', displayField: 'offender', width: 250 },
      { text: 'Color', dataField: 'color', width: 100, cellsRenderer: colorRenderer },
      { text: 'Start Date', dataField: 'startDate', cellsFormat: 'MM/dd/yyyy', width: 80, cellsAlign: 'center' },
      { text: 'End Date', dataField: 'endDate', cellsFormat: 'MM/dd/yyyy', width: 80, cellsAlign: 'center' }
    ]
  });

});