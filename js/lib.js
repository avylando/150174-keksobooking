'use strict';

(function () {

  window.lib = {

    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,

    getRandomValue: function (array) {
      var randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    },

    getValueInRange: function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },

    getUniqueValues: function (array) {
      var filteredArray = array.filter(function (it, i) {
        return array.indexOf(it) === i;
      });
      return filteredArray;
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
      array.forEach(function (elem) {
        elem.classList.add(className);
      });
    },

    addClassToRandom: function (array, className, number) {
      for (var i = 0; i < number; i++) {
        var randomIndex = Math.floor(Math.random() * array.length);
        array[randomIndex].classList.add(className);
      }
    },

    removeClassFromAll: function (array, className) {
      array.forEach(function (elem) {
        elem.classList.remove(className);
      });
    },

    removeClassFromRandom: function (array, className, number) {
      for (var i = 0; i < number; i++) {
        if (i < array.length) {
          var randomIndex = Math.floor(Math.random() * array.length);
          if (array[randomIndex].classList.contains(className)) {
            array[randomIndex].classList.remove(className);
          } else {
            --i;
          }
        } else {
          break;
        }

      }
    },

    removeElementsAttribute: function (array, attribute) {
      array.forEach(function (elem) {
        elem.removeAttribute(attribute);
      });
    },

    checkValue: function (element, val) {
      return element.value === val;
    },

    checkRequiredField: function (element, event) {
      if (!element.value) {
        event.preventDefault();
        element.focus();
      }
    },

    fieldReset: function (field, val) {
      field.value = val || '';
    },

    checkboxListReset: function (array) {
      array.forEach(function (it) {
        it.checked = false;
      });
    },

    findVisibleElements: function (array) {
      var visibleArray = array.filter(function (elem) {
        var visibleElement = !elem.classList.contains('hidden');
        return visibleElement;
      });
      return visibleArray;
    },

    filterArrayByValue: function (array, option, value) {
      return array.filter(function (it) {
        return it.querySelector(option).textContent === value;
      }).map(function (it) {
        return it.getAttribute('id');
      });
    },

    filterArrayByRange: function (array, option, min, max) {
      return array.filter(function (it) {
        var value = parseInt(it.querySelector(option).textContent, 10);
        return value > min && value <= max;
      }).map(function (it) {
        return it.getAttribute('id');
      });
    },

    compareArraysById: function (inputArr, filteredArr) {
      var visibleArray = window.lib.findVisibleElements(inputArr);
      console.log(visibleArray);
      inputArr.forEach(function (it) {
        it.classList.add('hidden');
        var itId = it.getAttribute('id');
        filteredArr.map(function (item) {
          if (itId === item) {
            it.classList.remove('hidden');
            visibleArray.push(it);
          }
        });
      });
    }
  };
})();
