'use strict';

(function () {

  window.utils = {

    Keycode: {
      ESC: 27,
      ENTER: 13
    },

    setPopupTimeout: function (popup, interval) {
      setTimeout(function () {
        popup.style.display = 'none';
      }, interval);
    },

    clearChildNodes: function (parent) {
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    },

    removeElementsAttribute: function (array, attribute) {
      array.forEach(function (it) {
        it.removeAttribute(attribute);
      });
    },

    getOptionValuesInSelect: function (select) {
      var selectOptions = Array.from(select.options);
      var optionValue = null;

      var optionValues = selectOptions.map(function (option) {
        optionValue = option.getAttribute('value');
        return optionValue;
      });

      return optionValues;
    }
  };

})();
