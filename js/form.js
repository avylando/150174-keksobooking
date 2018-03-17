'use strict';


(function () {

  // Constants
  var MIN_PRICES = ['1000', '0', '5000', '10000'];
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
  var inputAddress = form.querySelector('#address');
  var selectTimeIn = form.querySelector('#timein');
  var selectTimeOut = form.querySelector('#timeout');
  var inputTypeHouse = form.querySelector('#type');
  var inputPrice = form.querySelector('#price');
  var inputRoomsNumber = form.querySelector('#room_number');
  var inputCapacity = form.querySelector('#capacity');

  // Variables
  var timeInValues = window.utils.getOptionValuesInSelect(selectTimeIn);
  var timeOutValues = window.utils.getOptionValuesInSelect(selectTimeOut);
  var houseTypes = window.utils.getOptionValuesInSelect(inputTypeHouse);


  // Sync timeIn and timeOut

  var setValue = function (elem, val) {
    elem.value = val;
  };
  window.synchronizeFields(selectTimeIn, selectTimeOut, timeInValues, timeOutValues, setValue);

  // Sync house type and price

  var setMinValue = function (elem, val) {
    elem.min = val;
  };
  window.synchronizeFields(inputTypeHouse, inputPrice, houseTypes, MIN_PRICES, setMinValue);

  // Validation capacity

  var validateCapacity = function () {
    var capacitySelected = inputCapacity.selectedIndex;
    var roomsSelected = inputRoomsNumber.value;
    var allowedValues = RoomsCapacity[roomsSelected].allowed;

    var validValue = allowedValues.some(function (value) {
      return capacitySelected === value;
    });

    var validity = validValue ? '' : 'Значение указано неверно';
    inputCapacity.setCustomValidity(validity);
    inputCapacity.reportValidity();
  };

  inputCapacity.addEventListener('change', validateCapacity);

  // Sync rooms and capacity

  var syncCapacity = function (evt) {
    var currentRooms = evt.target.value;
    inputCapacity.value = RoomsCapacity[currentRooms].default;
    validateCapacity();
  };

  inputRoomsNumber.addEventListener('change', syncCapacity);


  // Submit functions

  var resetFormToDefault = function () {
    var avatarPreview = document.querySelector('#avatar-preview');
    var uploadPhotos = Array.from(document.querySelectorAll('.form__photo-container .photo'));

    if (avatarPreview.src !== 'img/muffin.png') {
      avatarPreview.src = avatarPreview.getAttribute('data-default');
    }

    if (uploadPhotos) {
      uploadPhotos.forEach(function (el) {
        console.log(uploadPhotos);
        el.remove();
      });
    }

    var currentAddressValue = inputAddress.value;
    form.reset();
    inputAddress.value = currentAddressValue;
  };

  var submitSuccess = function () {
    resetFormToDefault();

    window.data.update();
  };

  var submitError = function (errorMessage) {
    var errorPopup = document.createElement('div');
    errorPopup.classList.add('error-popup');
    errorPopup.classList.add('error-popup--form');
    errorPopup.textContent = errorMessage;
    form.insertAdjacentElement('beforeEnd', errorPopup);
    window.utils.setPopupTimeout(errorPopup, FORM_POPUP_TIMEOUT_INTERVAL);
  };

  // Add listeners

  form.addEventListener('submit', function (evt) {
    var formData = new FormData(form);
    window.backend.save(formData, submitSuccess, submitError);
    evt.preventDefault();
  });

  var resetButton = document.querySelector('#reset-button');
  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetFormToDefault();
  });

})();
