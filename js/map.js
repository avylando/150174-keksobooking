'use strict';


(function () {

  // Constants
  var MIN_Y_COORD = 100;
  var MAX_Y_COORD = 500;
  var MAIN_PIN_WIDTH = 64;
  var MAIN_PIN_HEIGHT = 80;

  // DOM-elements
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFieldsets = noticeForm.querySelectorAll('fieldset');
  var inputAddress = noticeForm.querySelector('#address');

  // Variables
  var pageWidth;
  var bodyWidth;
  var bodyOffset;

  // Add draggable Main pin and activate map

  mainPin.addEventListener('mousedown', function (mouseDownEvt) {
    mouseDownEvt.preventDefault();

    var mainPinMouseMoveHandler = function (evt) {
      evt.preventDefault();

      // Compensation offset on fullscreen
      pageWidth = document.querySelector('html').clientWidth;
      bodyWidth = document.querySelector('body').clientWidth;
      bodyOffset = pageWidth - bodyWidth;

      mainPin.style.left = evt.pageX - (bodyOffset / 2) + 'px';
      mainPin.style.top = evt.pageY + 'px';

      // Set vertical limits
      if (evt.pageY < MIN_Y_COORD) {
        mainPin.style.top = MIN_Y_COORD + 'px';
      } else if (evt.pageY > MAX_Y_COORD) {
        mainPin.style.top = MAX_Y_COORD + 'px';
      }
    };

    var mainPinMouseUpHandler = function (evt) {
      evt.preventDefault();

      // Map and form activation

      if (map.classList.contains('map--faded')) {
        map.classList.remove('map--faded');
        noticeForm.classList.remove('notice__form--disabled');
        window.utils.removeElementsAttribute(noticeFieldsets, 'disabled');
        window.backend.load(window.data.loadSuccess, window.data.loadError);
      }

      // Set adress value
      var leftCoord = mainPin.offsetLeft;
      var topCoord = mainPin.offsetTop;
      var adressX = leftCoord;
      var adressY = topCoord + MAIN_PIN_HEIGHT;

      // Check main pin position values
      inputAddress.value = 'x: ' + adressX + ', y: ' + adressY;

      document.removeEventListener('mousemove', mainPinMouseMoveHandler);
      document.removeEventListener('mouseup', mainPinMouseUpHandler);
    };

    document.addEventListener('mousemove', mainPinMouseMoveHandler);
    document.addEventListener('mouseup', mainPinMouseUpHandler);
  });

})();
