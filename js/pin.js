'use strict';


(function () {

  var pinWidth = 46;
  var pinHeight = 64;

  // Find pin template

  var template = document.querySelector('template').content;
  var mapPinTemplate = template.querySelector('.map__pin');


  // Export values

  window.pin = {
    width: pinWidth,
    height: pinHeight,
    generate: function (obj) {
      var pinElement = mapPinTemplate.cloneNode(true);
      pinElement.querySelector('img').src = obj.author.avatar;
      pinElement.style.left = window.lib.getPinPositionX(obj.location.x, pinWidth);
      pinElement.style.top = window.lib.getPinPositionY(obj.location.y, pinHeight);
      pinElement.classList.add('map__pin--user');
      // pinElement.classList.add('hidden');

      return pinElement;
    }
  };

})();


