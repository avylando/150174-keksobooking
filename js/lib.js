'use strict';

(function () {

  // Useful functions

  window.lib = {

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

    getPinPositionX: function (houseX, width) {
      return (houseX - (width / 2)) + 'px';
    },

    getPinPositionY: function (houseY, height) {
      return (houseY - height) + 'px';
    }
  };
})();
