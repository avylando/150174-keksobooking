'use strict';

(function () {

  window.debounce = function (func, interval) {
    var lastTimeout = null;

    return function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(func, interval);
    };
  };
})();
