'use strict';

(function () {

  window.utils = {

    Keycode: {
      ESC: 27,
      ENTER: 13
    },

    setPopupTimeout: function (popup, interval) {
      setTimeout(function () {
        popup.remove();
      }, interval);
    },

    clearChildNodes: function (parent) {
      parent.innerHTML = '';
    },

    removeElementsAttribute: function (array, attribute) {
      array.forEach(function (item) {
        item.removeAttribute(attribute);
      });
    },

    getOptionValuesInSelect: function (select) {
      var selectOptions = Array.from(select.options);

      var optionValues = selectOptions.map(function (option) {
        return option.value;
      });

      return optionValues;
    },

    setEndings: function (number, titles) {
      var cases = [2, 0, 1, 1, 1, 2];
      return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    }
  }

})();
