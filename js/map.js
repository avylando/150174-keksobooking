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
        map.classList.remove('map--faded');
        noticeForm.classList.remove('notice__form--disabled');
        window.lib.removeElementsAttribute(noticeFieldsets, 'disabled');
        // window.lib.removeClassFromRandom(usersPins, 'hidden', maxPinsNumber);
        window.fillMap();
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

  // // Filters

  // var filtersPanel = document.querySelector('.map__filters-container');
  // var mapFilters = Array.from(filtersPanel.querySelectorAll('.map__filter'));
  // var houseTypeFilter = filtersPanel.querySelector('#housing-type');
  // var housePriceFilter = filtersPanel.querySelector('#housing-price');
  // var roomsNumberFilter = filtersPanel.querySelector('#housing-rooms');
  // var guestsNumberFilter = filtersPanel.querySelector('#housing-guests');
  // var featuresFilter = filtersPanel.querySelector('#housing-features');

  // var checkValue = function (element, val) {
  //   return element.value === val;
  // };

  // var findVisibleElements = function (array) {
  //   var visibleArray = array.filter(function (elem) {
  //     var visibleElement = !elem.classList.contains('hidden');
  //     return visibleElement;
  //   });
  //   return visibleArray;
  // };

  // var getNodesClickHandler = function () {
  //   window.usersPinsArr = Array.from(document.querySelectorAll('.map__pin--user'));
  //   window.usersCardsArr = Array.from(document.querySelectorAll('.popup'));
  //   window.lib.addFilteredProperty(window.usersPinsArr);
  //   window.lib.addFilteredProperty(window.usersCardsArr);
  //   filtersPanel.removeEventListener('click', getNodesClickHandler);
  // };

  // filtersPanel.addEventListener('click', getNodesClickHandler);

  // // var filteredArr;
  // houseTypeFilter.addEventListener('change', function () {
  //   // var usersPinsArr = Array.from(document.querySelectorAll('.map__pin--user'));
  //   // var usersCardsArr = Array.from(document.querySelectorAll('.popup'));
  //   var visiblePins;

  //   switch (houseTypeFilter.value) {
  //     case 'flat':
  //       var flatUsersId = window.lib.filterArrayByValue(window.usersCardsArr, 'h4', 'Квартира');
  //       window.lib.compareArraysById(window.usersPinsArr, flatUsersId);
  //       break;

  //     case 'house':
  //       var houseUsersId = window.lib.filterArrayByValue(window.usersCardsArr, 'h4', 'Дом');
  //       window.lib.compareArraysById(window.usersPinsArr, houseUsersId);
  //       break;

  //     case 'bungalo':
  //       var bungaloUsersId = window.lib.filterArrayByValue(window.usersCardsArr, 'h4', 'Лачуга');
  //       window.lib.compareArraysById(window.usersPinsArr, bungaloUsersId);
  //       break;

  //     case 'any':
  //       visiblePins = findVisibleElements(window.usersPinsArr);
  //       window.lib.removeClassFromRandom(window.usersPinsArr, 'hidden', (maxPinsNumber - visiblePins.length));
  //       break;
  //   }
  // });

  // housePriceFilter.addEventListener('change', function () {
  //   // var usersPinsArr = Array.from(document.querySelectorAll('.map__pin--user'));
  //   // var usersCardsArr = Array.from(document.querySelectorAll('.popup'));
  //   var visiblePins;
  //   switch (housePriceFilter.value) {
  //     case 'middle':
  //       var middlePriceUsersId = window.lib.filterArrayByRange(window.usersCardsArr, '.popup__price', 10000, 50000);
  //       window.lib.compareArraysById(window.usersPinsArr, middlePriceUsersId);
  //       break;

  //     case 'low':
  //       var lowPriceUsersId = window.lib.filterArrayByRange(window.usersCardsArr, '.popup__price', 0, 10000);
  //       window.lib.compareArraysById(window.usersPinsArr, lowPriceUsersId);
  //       break;

  //     case 'high':
  //       var highPriceUsersId = window.lib.filterArrayByRange(window.usersCardsArr, '.popup__price', 50000, 9999999);
  //       window.lib.compareArraysById(window.usersPinsArr, highPriceUsersId);
  //       break;

  //     case 'any':
  //       visiblePins = findVisibleElements(window.usersPinsArr);
  //       window.lib.removeClassFromRandom(window.usersPinsArr, 'hidden', (maxPinsNumber - visiblePins.length));
  //       break;
  //   }
  // });

})();

