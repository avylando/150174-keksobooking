'use strict';


(function () {

  // Useful values

  var pinWidth = 46;
  var pinHeight = 64;


  // Find pin template

  var mapPinTemplate = window.data.template.querySelector('.map__pin');


  // Export values

  window.pin = {
    width: pinWidth,
    height: pinHeight,
    generate: function (obj) {
      var pinElement = mapPinTemplate.cloneNode(true);
      pinElement.querySelector('img').src = obj.author.avatar;
      pinElement.style.left = (obj.houseLocation.x - (pinWidth / 2)) + 'px';
      pinElement.style.top = (obj.houseLocation.y + pinHeight) + 'px';

      return pinElement;
    }
  };

})();


