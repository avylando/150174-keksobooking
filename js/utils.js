'use strict';

(function () {

  window.Keycode = {
    ESC: 27,
    ENTER: 13
  };

  window.utils = {

    setUserId: function (element, number) {
      element.setAttribute('id', 'user' + number);
    },

    removeElementsAttribute: function (array, attribute) {
      array.forEach(function (it) {
        it.removeAttribute(attribute);
      });
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
    }
  };

})();
