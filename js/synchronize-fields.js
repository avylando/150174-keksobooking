'use strict';

(function () {

  window.synchronizeFields = function (fieldA, fieldB, valuesA, valuesB, callback) {

    fieldA.addEventListener('change', function () {
      for (var i = 0; i < valuesA.length; i++) {
        if (fieldA.value === valuesA[i]) {
          callback(fieldB, valuesB[i]);
        }
      }
    });

    fieldB.addEventListener('change', function () {
      for (var i = 0; i < valuesB.length; i++) {
        if (fieldB.value === valuesB[i]) {
          callback(fieldA, valuesA[i]);
        }
      }
    });
  };

})();
