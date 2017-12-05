'use strict';


(function () {

  // Find pin template

  var mapPinTemplate = window.data.template.querySelector('.map__pin');


  // Export values

  window.pin = {
    generate: function (obj) {
      var pinElement = mapPinTemplate.cloneNode(true);
      pinElement.querySelector('img').src = obj.author.avatar;
      pinElement.style.left = window.lib.getPinPositionX(obj.houseLocation.x, window.data.pinWidth);
      pinElement.style.top = window.lib.getPinPositionY(obj.houseLocation.y, window.data.pinHeight);

      return pinElement;
    }
  };

})();


