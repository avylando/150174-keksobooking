'use strict';


(function () {

  // Variables

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFieldsets = noticeForm.querySelectorAll('fieldset');
  var inputAddress = noticeForm.querySelector('#address');


  // Add draggable Main pin and activate map

  var mainPinWidth = 64;
  var mainPinHeight = 80;
  var minY = 100;
  var maxY = 500;

  mainPin.style.zIndex = '100';

  mainPin.addEventListener('mousedown', function (event) {
    event.preventDefault();

    var mainPinMouseMoveHandler = function (evt) {
      evt.preventDefault();

      // Compensation offset on fullscreen
      var pageWidth = document.querySelector('html').clientWidth;
      var bodyWidth = document.querySelector('body').clientWidth;
      var bodyOffset = pageWidth - bodyWidth;

      mainPin.style.left = evt.pageX - (bodyOffset / 2) + 'px';
      mainPin.style.top = evt.pageY + 'px';

      // Set vertical limits
      if (evt.pageY < minY) {
        mainPin.style.top = minY + 'px';
      } else if (evt.pageY > maxY) {
        mainPin.style.top = maxY + 'px';
      }
    };

    var mainPinMouseUpHandler = function (evt) {
      evt.preventDefault();

      // Map and form activation
      var usersPins = document.querySelectorAll('.map__pins .hidden');

      map.classList.remove('map--faded');
      noticeForm.classList.remove('notice__form--disabled');
      window.lib.removeElementsAttribute(noticeFieldsets, 'disabled');
      window.lib.removeClassFromAll(usersPins, 'hidden');

      // Set adress value
      var leftCoord = (parseInt(mainPin.style.left, 10));
      var topCoord = (parseInt(mainPin.style.top, 10));
      var adressX = leftCoord + (mainPinWidth / 2);
      var adressY = topCoord + mainPinHeight;
      var defaultX = 470;
      var defaultY = 455;

      // Check main pin position values
      if (isNaN(leftCoord) && isNaN(topCoord)) {
        inputAddress.value = 'x: ' + defaultX + ', y: ' + defaultY;
      } else if (isNaN(leftCoord)) {
        inputAddress.value = 'x: ' + defaultX + ', y: ' + adressY;
      } else if (isNaN(topCoord)) {
        inputAddress.value = 'x: ' + adressX + ', y: ' + defaultY;
      } else {
        inputAddress.value = 'x: ' + adressX + ', y: ' + adressY;
      }

      document.removeEventListener('mousemove', mainPinMouseMoveHandler);
      mainPin.removeEventListener('mouseup', mainPinMouseUpHandler);
    };

    document.addEventListener('mousemove', mainPinMouseMoveHandler);
    mainPin.addEventListener('mouseup', mainPinMouseUpHandler);
  });

})();

