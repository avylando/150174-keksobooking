'use strict';


(function () {

  var PIN_WIDTH = 46;
  var PIN_HEIGHT = 64;

  // Find pin template

  var template = document.querySelector('template').content;
  var mapPinTemplate = template.querySelector('.map__pin');

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
      var pinElement = mapPinTemplate.cloneNode(true);
      pinElement.querySelector('img').src = obj.author.avatar;
      pinElement.style.left = getPinPositionX(obj.location.x, PIN_WIDTH);
      pinElement.style.top = getPinPositionY(obj.location.y, PIN_HEIGHT);
      pinElement.classList.add('map__pin--user');

      return pinElement;
    }
  };

})();


