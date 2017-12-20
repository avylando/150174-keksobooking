'use strict';


(function () {

  // Constants
  var MIN_PRICES = ['1000', '0', '5000', '10000'];
  var DEFAULT_PRICE = '1000';
  var DEFAULT_CAPACITY = '1';
  var FORM_POPUP_TIMEOUT_INTERVAL = 3000;

  var Capacity = {
    ONE_GUEST: 2,
    TWO_GUESTS: 1,
    THREE_GUESTS: 0,
    NOT_FOR_GUESTS: 3
  };

  var RoomsCapacity = {
    1: {
      allowed: [Capacity.ONE_GUEST],
      default: 1
    },
    2: {
      allowed: [Capacity.ONE_GUEST, Capacity.TWO_GUESTS],
      default: 2
    },
    3: {
      allowed: [Capacity.ONE_GUEST, Capacity.TWO_GUESTS, Capacity.THREE_GUESTS],
      default: 3
    },
    100: {
      allowed: [Capacity.NOT_FOR_GUESTS],
      default: 0
    }
  };

  // DOM-elements
  var form = document.querySelector('.notice__form');
  var selectTimeIn = form.querySelector('#timein');
  var selectTimeOut = form.querySelector('#timeout');
  var inputTypeHouse = form.querySelector('#type');
  var inputPrice = form.querySelector('#price');
  var inputRoomsNumber = form.querySelector('#room_number');
  var roomsNumberOptions = inputRoomsNumber.options;
  var inputCapacity = form.querySelector('#capacity');
  var capacityOptions = Array.from(inputCapacity.options);

  // Variables
  var timeInValues = window.utils.getOptionValuesInSelect(selectTimeIn);
  var timeOutValues = window.utils.getOptionValuesInSelect(selectTimeOut);
  var houseTypes = window.utils.getOptionValuesInSelect(inputTypeHouse);


  // Sync timeIn and timeOut

  var setValue = function (elem, val) {
    elem.value = val;
  };
  window.synchronizeFields(selectTimeIn, selectTimeOut, timeInValues, timeOutValues, setValue);


  // Set default min attribute
  inputPrice.setAttribute('min', DEFAULT_PRICE);

  // Sync house type and price

  var setMinValue = function (elem, val) {
    elem.min = val;
  };
  window.synchronizeFields(inputTypeHouse, inputPrice, houseTypes, MIN_PRICES, setMinValue);


  // // Sync room number and capacity

  // var disableSelectOptions = function (roomsOption, arrGuests) {
  //   arrGuests.forEach(function (it) {
  //     if (it.value > roomsOption.value) {
  //       it.setAttribute('disabled', true);
  //     } else if ((it.value <= roomsOption.value) && (roomsOption.value !== MAX_ROOMS_OPTION) && (it.value !== NULL_CAPACITY)) {
  //       it.removeAttribute('disabled');
  //     } else if (it.value === NULL_CAPACITY && roomsOption.value !== MAX_ROOMS_OPTION) {
  //       it.setAttribute('disabled', true);
  //     } else if (it.value === NULL_CAPACITY && roomsOption.value === MAX_ROOMS_OPTION) {
  //       it.removeAttribute('disabled');
  //     } else if (it.value !== NULL_CAPACITY && roomsOption.value === MAX_ROOMS_OPTION) {
  //       it.setAttribute('disabled', true);
  //     }
  //   });
  // };

  // var roomCapacityChangeHandler = function () {
  //   for (var i = 0; i < roomsNumberOptions.length; i++) {
  //     if (inputRoomsNumber.value === roomsNumberOptions[i].value && roomsNumberOptions[i].value !== MAX_ROOMS_OPTION) {
  //       inputCapacity.value = roomsNumberOptions[i].value;
  //       disableSelectOptions(roomsNumberOptions[i], capacityOptions);
  //     } else if (inputRoomsNumber.value === roomsNumberOptions[i].value && roomsNumberOptions[i].value === MAX_ROOMS_OPTION) {
  //       inputCapacity.value = NULL_CAPACITY;
  //       disableSelectOptions(roomsNumberOptions[i], capacityOptions);
  //     }
  //   }
  // };

  // Set default capacity value
  capacityOptions.forEach(function (option) {
    option.setAttribute((option.value === DEFAULT_CAPACITY ? 'selected' : 'disabled'), true);
  });

  // inputRoomsNumber.addEventListener('change', roomCapacityChangeHandler);



  //

  var forEach = function (arr, cb) {
    for (var i = 0; i < arr.length; i++) {
      cb(arr[i]);
    }
  };

  var disableOption = function (option) {
    option.disabled = true;
  };

  var enableOptions = function (select) {
    return function (option) {
      select[option].disabled = false;
    };
  };

  var active = [];
  var syncCapacity = function (evt) {
    var currentRooms = evt.target.value;
    var allowed = RoomsCapacity[currentRooms].allowed;

    forEach(active, disableOption);
    forEach(allowed, enableOptions(inputCapacity));
    active = active.slice(0, 0);
    allowed.map(function (it) {
      return active.push(inputCapacity[it]);
    });

    inputCapacity.value = RoomsCapacity[currentRooms].default;
  };

  var validateCapacity = function (evt) {
    var capacity = evt.target.selectedIndex;
    var rooms = inputRoomsNumber.value;
    var allowed = RoomsCapacity[rooms].allowed;
    var valid = !!~allowed.indexOf(capacity);
    var validity = valid ? '' : 'не подходит';
    inputCapacity.setCustomValidity(validity);
    inputCapacity.reportValidity();
  };

  inputRoomsNumber.addEventListener('change', syncCapacity);
  // inputCapacity.addEventListener('change', validateCapacity);
  //



  // Submit functions

  var submitSuccess = function () {
    form.reset();
  };

  var submitError = function (errorMessage) {
    var errorPopup = document.createElement('div');
    errorPopup.classList.add('error-popup');
    errorPopup.classList.add('error-popup--form');
    errorPopup.textContent = errorMessage;
    form.style.position = 'relative';
    form.insertAdjacentElement('beforeEnd', errorPopup);
    window.utils.setPopupTimeout(errorPopup, FORM_POPUP_TIMEOUT_INTERVAL);
  };

  // Add submit listener

  form.addEventListener('submit', function (evt) {
    validateCapacity(evt);
    var formData = new FormData(form);
    window.backend.save(formData, submitSuccess, submitError);
    evt.preventDefault();
  });

})();
