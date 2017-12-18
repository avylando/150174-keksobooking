'use strict';


(function () {


  // DOM-elements
  var form = document.querySelector('.notice__form');
  var selectTimeIn = form.querySelector('#timein');
  var selectTimeOut = form.querySelector('#timeout');
  var inputTypeHouse = form.querySelector('#type');
  var inputPrice = form.querySelector('#price');
  var inputRoomsNumber = form.querySelector('#room_number');
  var roomsNumberOptions = inputRoomsNumber.querySelectorAll('option');
  var inputCapacity = form.querySelector('#capacity');
  var capacityOptions = Array.from(inputCapacity.querySelectorAll('option'));
  var inputTitle = form.querySelector('#title');
  var inputAddress = form.querySelector('#address');
  var textareaDescription = form.querySelector('#description');
  var featuresList = form.querySelectorAll('.features input[type="checkbox"]');

  // Variables
  var timeInValues = window.utils.getOptionValuesInSelect(selectTimeIn);
  var timeOutValues = window.utils.getOptionValuesInSelect(selectTimeOut);
  var houseTypes = window.utils.getOptionValuesInSelect(inputTypeHouse);
  var minPrices = ['1000', '0', '5000', '10000'];


  // Sync timeIn and timeOut

  var syncValues = function (elem, val) {
    elem.value = val;
  };
  window.synchronizeFields(selectTimeIn, selectTimeOut, timeInValues, timeOutValues, syncValues);


  // Set default min attribute
  inputPrice.setAttribute('min', '1000');

  // Sync house type and price

  var syncValueWithMin = function (elem, val) {
    elem.min = val;
  };
  window.synchronizeFields(inputTypeHouse, inputPrice, houseTypes, minPrices, syncValueWithMin);


  // Sync room number and capacity

  var disableSelectOptions = function (roomsOption, arrGuests) {
    for (var i = 0; i < arrGuests.length; i++) {
      if (arrGuests[i].value > roomsOption.value) {
        arrGuests[i].setAttribute('disabled', true);
      } else if ((arrGuests[i].value <= roomsOption.value) && (roomsOption.value !== '100') && (arrGuests[i].value !== '0')) {
        arrGuests[i].removeAttribute('disabled');
      } else if (arrGuests[i].value === '0' && roomsOption.value !== '100') {
        arrGuests[i].setAttribute('disabled', true);
      } else if (arrGuests[i].value === '0' && roomsOption.value === '100') {
        arrGuests[i].removeAttribute('disabled');
      } else if (arrGuests[i].value !== '0' && roomsOption.value === '100') {
        arrGuests[i].setAttribute('disabled', true);
      }
    }
  };

  var roomCapacityChangeHandler = function () {
    for (var i = 0; i < roomsNumberOptions.length; i++) {
      if (inputRoomsNumber.value === roomsNumberOptions[i].value && roomsNumberOptions[i].value !== '100') {
        inputCapacity.value = roomsNumberOptions[i].value;
        disableSelectOptions(roomsNumberOptions[i], capacityOptions);
      } else if (inputRoomsNumber.value === roomsNumberOptions[i].value && roomsNumberOptions[i].value === '100') {
        inputCapacity.value = '0';
        disableSelectOptions(roomsNumberOptions[i], capacityOptions);
      }
    }
  };

  // Set default capacity value
  capacityOptions.map(function (option) {
    return option.value === '1' ? option.setAttribute('selected', true) : option.setAttribute('disabled', true);
  });

  inputRoomsNumber.addEventListener('change', roomCapacityChangeHandler);

  // Form submit event

  var fieldReset = function (field, val) {
    field.value = val || '';
  };

  var checkboxListReset = function (array) {
    array.forEach(function (it) {
      it.checked = false;
    });
  };

  var checkRequiredField = function (element, evt) {
    if (!element.value) {
      evt.preventDefault();
      element.focus();
    }
  };

  // Submit functions

  var submitSuccess = function () {
    fieldReset(inputTitle);
    fieldReset(inputTypeHouse, 'flat');
    fieldReset(inputPrice, '1000');
    fieldReset(selectTimeIn, '12:00');
    fieldReset(selectTimeOut, '12:00');
    fieldReset(inputRoomsNumber, '1');
    fieldReset(inputCapacity, '1');
    fieldReset(textareaDescription);
    checkboxListReset(featuresList);
  };

  var submitError = function (errorMessage) {
    var errorPopup = document.createElement('div');

    // Element position
    errorPopup.style.position = 'absolute';
    errorPopup.style.right = '0';
    errorPopup.style.bottom = '40px';
    errorPopup.style.zIndex = '200';
    // Element sizes
    errorPopup.style.boxSizing = 'border-box';
    errorPopup.style.width = '160px';
    errorPopup.style.padding = '10px';
    // Element text style
    errorPopup.style.fontSize = '12px';
    errorPopup.style.color = '#ffffff';
    errorPopup.style.textAlign = 'center';
    // Element style
    errorPopup.style.backgroundColor = 'rgba(255, 109, 81, 0.7)';
    errorPopup.style.borderRadius = '10px';

    errorPopup.textContent = errorMessage;
    form.style.position = 'relative';
    form.insertAdjacentElement('beforeEnd', errorPopup);
  };

  // Add submit listener

  form.addEventListener('submit', function (evt) {
    checkRequiredField(inputAddress, evt);
    var formData = new FormData(form);
    window.backend.save(formData, submitSuccess, submitError);
    evt.preventDefault();
  });

})();
