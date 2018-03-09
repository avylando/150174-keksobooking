'use strict';


(function () {

  // Constants
  var PIN_WIDTH = 46;
  var PIN_HEIGHT = 64;
  var X_CORR = 5;
  var Y_CORR = 80;

  // Find pin template

  var template = document.querySelector('template').content;
  var mapPinTemplate = template.querySelector('.map__pin');

  // Pin constructor

  var Pin = function (obj) {
    this.element = mapPinTemplate.cloneNode(true);
    this.element.querySelector('img').src = obj.avatar;
  };

  Pin.prototype.getPositionX = function (xCoord, xOffset) {
    return (xCoord - xOffset) + 'px';
  };

  Pin.prototype.getPositionY = function (yCoord, yOffset) {
    return (yCoord - yOffset) + 'px';
  };

  // Export

  window.pin = {
    width: PIN_WIDTH,
    height: PIN_HEIGHT,
    generate: function (obj) {
      var pin = new Pin(obj);
      pin.element.style.left = pin.getPositionX(obj.location_x, X_CORR);
      pin.element.style.top = pin.getPositionY(obj.location_y, Y_CORR);

      return pin;
    }
  };

})();


