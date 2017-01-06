/**
 * Created by pdamerval on 12/30/2016.
 */

function checkColorAssignmentsDialog() {
  return cawOffenderSelect.jqxDropDownList('selectedIndex') !== -1
      && cawColorSelect.jqxDropDownList('selectedIndex') !== -1
      && cawStartDate.val() !== "" ;
}

function enableButton(buttonObj) {
  buttonObj.jqxButton({ disabled: false });
}

function disableButton(buttonObj) {
  buttonObj.jqxButton({ disabled: true });
}

function openWindow(windowObj) {
  windowObj.jqxWindow('open');
}

function clearColorAssignmentDialog() {
  cawOffenderSelect.jqxDropDownList('selectIndex', -1);
  cawColorSelect.jqxDropDownList('selectIndex', -1);
  cawStartDate.jqxDateTimeInput('setDate', new Date());
  cawEndDate.jqxDateTimeInput('setDate', null);
}

$(document).ready(function() {

  colorAssignmentAddButton.on('click', function() {
    clearColorAssignmentDialog();
    openWindow(colorAssignmentWindow);
    disableButton(cawSaveButton);
  });

  cawOffenderSelect.on('select', function () {
    if (checkColorAssignmentsDialog()) enableButton(cawSaveButton);
  });

  cawColorSelect.on('select', function () {
    if (checkColorAssignmentsDialog()) enableButton(cawSaveButton);
  });

  cawSaveButton.on('click', function () {
    var nullEndDate = cawEndDate.val() === "";
    $.post("../require/saveColorAssignment.php",
        { offenderId: cawOffenderSelect.val(), color: cawColorSelect.val(),
          startDate: cawStartDate.jqxDateTimeInput('getDate').toString('yyyy-MM-dd'),
          endDate: !nullEndDate ? cawEndDate.jqxDateTimeInput('getDate').toString('yyyy-MM-dd') : null
        },
        function (data) {
          alert(data);
        }
    ).fail(function (jqXHR) {
      alert(jqXHR.toString());
    });
  });

  testButton.on('click', function () {
    $.post("../require/saveColorAssignment.php?XDEBUG_SESSION_START=xdebug",
      { offenderId: 416715, color: 'Black', startDate: '2016-12-15', endDate: '2017-01-31' },
      function (data) {
        alert(data);
      }  
    ).fail(function (jqXHR) {
      alert(jqXHR);
    });
  })

});