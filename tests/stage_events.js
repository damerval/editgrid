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

$(document).ready(function() {

  colorAssignmentAddButton.on('click', function() {
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
    alert(cawOffenderSelect.val() + " | " + cawColorSelect.val())
  });

});