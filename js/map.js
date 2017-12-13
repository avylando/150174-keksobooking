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
  var maxPinsNumber = 5;
  var pageWidth;
  var bodyWidth;

  mainPin.style.zIndex = '100';

  mainPin.addEventListener('mousedown', function (event) {
    event.preventDefault();

    var mainPinMouseMoveHandler = function (evt) {
      evt.preventDefault();

      // Compensation offset on fullscreen
      pageWidth = document.querySelector('html').clientWidth;
      bodyWidth = document.querySelector('body').clientWidth;
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

      if (map.classList.contains('map--faded')) {
        var usersPins = document.querySelectorAll('.map__pin--user');
        var usersCards = document.querySelectorAll('.popup');

        map.classList.remove('map--faded');
        noticeForm.classList.remove('notice__form--disabled');
        window.lib.removeElementsAttribute(noticeFieldsets, 'disabled');
        window.lib.removeClassFromRandom(usersPins, 'hidden', maxPinsNumber);
        window.showCard(usersPins, usersCards);
      }


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

  // Filters

  var filtersPanel = document.querySelector('.map__filters-container');
  var houseTypeFilter = filtersPanel.querySelector('#housing-type');
  var housePriceFilter = filtersPanel.querySelector('#housing-price');
  var roomsNumberFilter = filtersPanel.querySelector('#housing-rooms');
  var guestsNumberFilter = filtersPanel.querySelector('#housing-guests');
  var featuresFilter = filtersPanel.querySelector('#housing-features');

  houseTypeFilter.addEventListener('change', function () {
    var usersPinsArr = Array.from(document.querySelectorAll('.map__pin--user'));
    var usersCardsArr = Array.from(document.querySelectorAll('.popup'));
    switch (houseTypeFilter.value) {
      case 'flat':
        var flatUsersId = window.lib.filterArrayByValue(usersCardsArr, 'h4', 'Квартира');
        window.lib.compareArraysById(usersPinsArr, flatUsersId);
        break;

      case 'house':
        var houseUsersId = window.lib.filterArrayByValue(usersCardsArr, 'h4', 'Дом');
        window.lib.compareArraysById(usersPinsArr, houseUsersId);
        break;

      case 'bungalo':
        var bungaloUsersId = window.lib.filterArrayByValue(usersCardsArr, 'h4', 'Лачуга');
        window.lib.compareArraysById(usersPinsArr, bungaloUsersId);
        break;

      case 'any':
        var visiblePins = usersPinsArr.filter(function (pin) {
          var visiblePin = !pin.classList.contains('hidden');
          return visiblePin;
        });
        window.lib.removeClassFromRandom(usersPinsArr, 'hidden', (maxPinsNumber - visiblePins.length));
        break;
    }
  });

  housePriceFilter.addEventListener('change', function () {
    var usersPinsArr = Array.from(document.querySelectorAll('.map__pin--user'));
    var usersCardsArr = Array.from(document.querySelectorAll('.popup'));
    switch (housePriceFilter.value) {
      case 'middle':
        var middlePriceUsersId = window.lib.filterArrayByRange(usersCardsArr, '.popup__price', 10000, 50000);
        window.lib.compareArraysById(usersPinsArr, middlePriceUsersId);
        break;

      case 'low':
        var lowPriceUsersId = window.lib.filterArrayByRange(usersCardsArr, '.popup__price', 0, 10000);
        window.lib.compareArraysById(usersPinsArr, lowPriceUsersId);
        break;

      case 'high':
        var highPriceUsersId = window.lib.filterArrayByRange(usersCardsArr, '.popup__price', 50000, 9999999);
        window.lib.compareArraysById(usersPinsArr, highPriceUsersId);
        break;

      case 'any':
        var visiblePins = window.lib.findVisibleElements(usersPinsArr);
        window.lib.removeClassFromRandom(usersPinsArr, 'hidden', (maxPinsNumber - visiblePins.length));
        break;
    }
  });

})();

