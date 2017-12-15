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

    findClass: function (element, className) {
      return element.classList.contains(className);
    },

    addClassToAll: function (array, className) {
      array.forEach(function (it) {
        it.classList.add(className);
      });
    },

    addClassToRandom: function (array, className, number) {
      for (var i = 0; i < number; i++) {
        var randomIndex = Math.floor(Math.random() * array.length);
        array[randomIndex].classList.add(className);
      }
    },

    removeClassFromAll: function (array, className) {
      array.forEach(function (it) {
        it.classList.remove(className);
      });
    },

    removeElementsAttribute: function (array, attribute) {
      array.forEach(function (it) {
        it.removeAttribute(attribute);
      });
    }
  };
})();
