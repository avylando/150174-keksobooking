'use strict';


(function () {

  // Constants
  var PIN_WIDTH = 46;
  var PIN_HEIGHT = 64;

  // Find pin template

  var template = document.querySelector('template').content;
  var mapPinTemplate = template.querySelector('.map__pin');

  // Pin constructor

  var Pin = function (obj) {
    this.element = mapPinTemplate.cloneNode(true);
    this.element.querySelector('img').src = obj.author.avatar;
  };

  Pin.prototype.getPositionX = function (xCoord, width) {
    return (xCoord - width) + 'px';
  };

  Pin.prototype.getPositionY = function (yCoord, height) {
    return (yCoord - (height / 2)) + 'px';
  };

  // Export

  window.pin = {
    width: PIN_WIDTH,
    height: PIN_HEIGHT,
    generate: function (obj) {
      var pin = new Pin(obj);
      pin.element.style.left = pin.getPositionX(obj.location.x, PIN_WIDTH);
      pin.element.style.top = pin.getPositionY(obj.location.y, PIN_HEIGHT);

      return pin;
    }
  };

})();


