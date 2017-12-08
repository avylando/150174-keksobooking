'use strict';

(function () {

  window.lib = {

    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,

    getRandomValue: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    getValueInRange: function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },

    getUniqueValues: function (array) {
      var obj = {};
      var output = [];
      var j = 0;

      for (var i = 0; i < array.length; i++) {
        var item = array[i];
        if (obj[item] !== 1) {
          obj[item] = 1;
          output[j++] = item;
        }
      }
      return output;
    },

    getOptionValuesInSelect: function (select) {
      var selectOptions = select.querySelectorAll('option');
      var optionValue = null;
      var optionValues = [];
      for (var i = 0; i < selectOptions.length; i++) {
        optionValue = selectOptions[i].getAttribute('value');
        optionValues[i] = optionValue;
      }
      return optionValues;
    },

    syncValues: function (elem, val) {
      elem.value = val;
    },

    syncValueWithMin: function (elem, val) {
      elem.min = val;
    },

    getPinPositionX: function (houseX, width) {
      return (houseX - (width / 2)) + 'px';
    },

    getPinPositionY: function (houseY, height) {
      return (houseY - height) + 'px';
    },

    findClass: function (element, className) {
      return element.classList.contains(className);
    },

    addClassToAll: function (array, className) {
      for (var i = 0; i < array.length; i++) {
        array[i].classList.add(className);
      }
    },

    removeClassFromAll: function (array, className) {
      for (var i = 0; i < array.length; i++) {
        array[i].classList.remove(className);
      }
    },

    removeElementsAttribute: function (arr, attribute) {
      for (var j = 0; j < arr.length; j++) {
        arr[j].removeAttribute(attribute);
      }
    },

    checkRequiredField: function (element, event) {
      if (!element.value) {
        event.preventDefault();
        element.focus();
      }
    },

    fieldReset: function (field) {
      field.value = '';
    },

    fieldResetToValue: function (field, val) {
      field.value = val;
    },

    checkboxListReset: function (array) {
      for (var i = 0; i < array.length; i++) {
        array[i].checked = false;
      }
    }
  };
})();
