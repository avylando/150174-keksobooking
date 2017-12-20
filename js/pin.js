'use strict';


(function () {

  // Constants
  var PIN_WIDTH = 46;
  var PIN_HEIGHT = 64;

  // Find pin template

  var template = document.querySelector('template').content;
  var mapPinTemplate = template.querySelector('.map__pin');
  mapPinTemplate.classList.add('map__pin--user');

  // Get position

  var getPinPositionX = function (houseX, width) {
    return (houseX - (width / 2)) + 'px';
  };

  var getPinPositionY = function (houseY, height) {
    return (houseY - height) + 'px';
  };

  // Export values

  window.pin = {
    width: PIN_WIDTH,
    height: PIN_HEIGHT,
    generate: function (obj) {
      var pinClone = mapPinTemplate.cloneNode(true);
      pinClone.querySelector('img').src = obj.author.avatar;
      pinClone.style.left = getPinPositionX(obj.location.x, PIN_WIDTH);
      pinClone.style.top = getPinPositionY(obj.location.y, PIN_HEIGHT);

      return pinClone;
    }
  };

})();


