'use strict';


(function () {

  // Validation form

  var form = document.querySelector('.notice__form');

  // Sync timeIn and timeOut

  var selectTimeIn = form.querySelector('#timein');
  var selectTimeOut = form.querySelector('#timeout');
  var timeInValues = window.lib.getOptionValuesInSelect(selectTimeIn);
  var timeOutValues = window.lib.getOptionValuesInSelect(selectTimeOut);

  window.synchronizeFields(selectTimeIn, selectTimeOut, timeInValues, timeOutValues, window.lib.syncValues);

  // Sync house type and price

  var inputTypeHouse = form.querySelector('#type');
  var inputPrice = form.querySelector('#price');
  var houseTypes = window.lib.getOptionValuesInSelect(inputTypeHouse);
  var minPrices = ['1000', '0', '5000', '10000'];

  // Set default min attribute
  inputPrice.setAttribute('min', '1000');

  window.synchronizeFields(inputTypeHouse, inputPrice, houseTypes, minPrices, window.lib.syncValueWithMin);


  // Sync room number and capacity

  var inputRoomNumber = form.querySelector('#room_number');
  var inputCapacity = form.querySelector('#capacity');
  var inputRoomsNumberOptions = inputRoomNumber.querySelectorAll('option');
  var inputCapacityOptions = inputCapacity.querySelectorAll('option');


  var disableSelectOptions = function (roomsElement, arrGuests) {
    for (var k = 0; k < arrGuests.length; k++) {
      if (arrGuests[k].value > roomsElement.value) {
        arrGuests[k].setAttribute('disabled', true);
      } else if ((arrGuests[k].value <= roomsElement.value) && (roomsElement.value !== '100') && (arrGuests[k].value !== '0')) {
        arrGuests[k].removeAttribute('disabled');
      } else if (arrGuests[k].value === '0' && roomsElement.value !== '100') {
        arrGuests[k].setAttribute('disabled', true);
      } else if (arrGuests[k].value === '0' && roomsElement.value === '100') {
        arrGuests[k].removeAttribute('disabled');
      } else if (arrGuests[k].value !== '0' && roomsElement.value === '100') {
        arrGuests[k].setAttribute('disabled', true);
      }
    }
  };

  var roomCapacityChangeHandler = function (arrRooms, arrGuests) {
    for (var k = 0; k < arrRooms.length; k++) {
      if (inputRoomNumber.value === arrRooms[k].value && arrRooms[k].value !== '100') {
        inputCapacity.value = arrRooms[k].value;
        disableSelectOptions(arrRooms[k], arrGuests);
      } else if (inputRoomNumber.value === arrRooms[k].value && arrRooms[k].value === '100') {
        inputCapacity.value = '0';
        disableSelectOptions(arrRooms[k], arrGuests);
      }
    }
  };

  // Set default capacity value
  inputCapacity.value = '1';

  inputRoomNumber.addEventListener('change', function () {
    roomCapacityChangeHandler(inputRoomsNumberOptions, inputCapacityOptions);
  });

  // Form submit event

  var inputTitle = form.querySelector('#title');
  var inputAddress = form.querySelector('#address');
  var textareaDescription = form.querySelector('#description');
  var featuresList = form.querySelectorAll('.features input[type="checkbox"]')

  var postNewAd = function () {
    console.log('Форма успешно отправлена');
    window.lib.fieldReset(inputTitle);
    window.lib.fieldReset(inputAddress);
    window.lib.fieldResetToValue(inputTypeHouse, 'flat');
    window.lib.fieldResetToValue(inputPrice, '1000');
    window.lib.fieldResetToValue(selectTimeIn, '12:00');
    window.lib.fieldResetToValue(selectTimeIn, '12:00');
    window.lib.fieldResetToValue(inputRoomNumber, '1');
    window.lib.fieldResetToValue(inputCapacity, '3');
    window.lib.fieldReset(textareaDescription);
    window.lib.checkboxListReset(featuresList);
  };

  var submitError = function (message) {
    console.log(message);
  };

  form.addEventListener('submit', function (evt) {
    window.lib.checkRequiredField(inputTitle, evt);
    window.lib.checkRequiredField(inputAddress, evt);
    var formData = new FormData(form);
    window.backend.save(formData, postNewAd, submitError);
    evt.preventDefault();
  });

})();
