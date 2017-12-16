'use strict';

(function () {

  window.debounce = function (func, interval) {
    var lastTimeout = null;

    return function () {
      var args = arguments;
      var onUpdate = function () {
        func.apply(window, args);
        lastTimeout = null;
      };

      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }

      lastTimeout = setTimeout(onUpdate, interval);
    };
  };
})();
