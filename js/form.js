'use strict';


(function () {

  // Validation form

  var form = document.querySelector('.notice__form');

  var selectTimeIn = form.querySelector('#timein');
  var selectTimeOut = form.querySelector('#timeout');

  var synchronizeSelectsValues = function (selectGet, selectSet) {
    switch (selectGet.value) {
      case '12:00': selectSet.value = '12:00';
        break;
      case '13:00': selectSet.value = '13:00';
        break;
      case '14:00': selectSet.value = '14:00';
        break;
    }
  };

  selectTimeIn.addEventListener('change', function () {
    synchronizeSelectsValues(selectTimeIn, selectTimeOut);
  });

  selectTimeOut.addEventListener('change', function () {
    synchronizeSelectsValues(selectTimeOut, selectTimeIn);
  });


  var inputTypeHouse = form.querySelector('#type');
  var inputPrice = form.querySelector('#price');

  // Set default min attribute
  inputPrice.setAttribute('min', '1000');

  var synchronizeTypeAndPriceHandler = function () {
    switch (inputTypeHouse.value) {
      case 'bungalo': inputPrice.setAttribute('min', 0);
        break;
      case 'flat': inputPrice.setAttribute('min', 1000);
        break;
      case 'house': inputPrice.setAttribute('min', 5000);
        break;
      case 'palace': inputPrice.setAttribute('min', 10000);
        break;
    }
  };

  inputTypeHouse.addEventListener('change', synchronizeTypeAndPriceHandler);


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


  // Add validation test on address field

  var inputAddress = form.querySelector('#address');

  var checkRequiredField = function (element, event) {
    if (!element.value) {
      event.preventDefault();
      element.focus();
    }
  };

  form.addEventListener('submit', function (evt) {
    checkRequiredField(inputAddress, evt);
  });

})();
