'use strict';

(function () {

  window.utils = {

    removeElementsAttribute: function (array, attribute) {
      array.forEach(function (it) {
        it.removeAttribute(attribute);
      });
    }
  };

  window.Keycode = {
    ESC: 27,
    ENTER: 13
  };
})();
