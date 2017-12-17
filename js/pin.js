'use strict';


(function () {

  var pinWidth = 46;
  var pinHeight = 64;

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
    width: pinWidth,
    height: pinHeight,
    generate: function (obj) {
      var pinElement = mapPinTemplate.cloneNode(true);
      pinElement.querySelector('img').src = obj.author.avatar;
      pinElement.style.left = getPinPositionX(obj.location.x, pinWidth);
      pinElement.style.top = getPinPositionY(obj.location.y, pinHeight);
      pinElement.classList.add('map__pin--user');

      return pinElement;
    }
  };

})();


