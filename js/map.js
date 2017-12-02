'use strict';


(function () {

  // Create fragments

  var fragmentPins = document.createDocumentFragment();
  var fragmentCards = document.createDocumentFragment();


  // Append ads to fragment

  for (var i = 0; i < window.data.ads.length; i++) {

    fragmentPins.appendChild(window.pin.generate(window.data.ads[i]));
    fragmentCards.appendChild(window.card.generate(window.data.ads[i]));
  }


  // Hide Cards

  var cardsArr = fragmentCards.querySelectorAll('.popup');

  var addClassToAll = function (array, classname) {
    for (var j = 0; j < array.length; j++) {
      array[j].classList.add(classname);
    }
  };

  addClassToAll(cardsArr, 'hidden');


  // Map and form activation

  var map = document.querySelector('.map');
  var tokyoPinMap = document.querySelector('.map__pins');
  var filtersContainer = map.querySelector('.map__filters-container');
  var mainPin = map.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFieldsets = noticeForm.querySelectorAll('fieldset');

  var removeElementsAttribute = function (arr, attribute) {
    for (var j = 0; j < arr.length; j++) {
      arr[j].removeAttribute(attribute);
    }
  };

  var mainPinMouseupHandler = function () {
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    tokyoPinMap.appendChild(fragmentPins);
    map.insertBefore(fragmentCards, filtersContainer);
    removeElementsAttribute(noticeFieldsets, 'disabled');
  };

  mainPin.addEventListener('mouseup', mainPinMouseupHandler);


  // Add functions show/hide card

  var mapPinsArr = fragmentPins.querySelectorAll('.map__pin');
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var findClass = function (element, className) {
    return element.classList.contains(className);
  };

  var mapPinsClickHandler = function (evt) {
    for (var j = 0; j < mapPinsArr.length; j++) {
      if (evt.currentTarget === mapPinsArr[j] || evt.keyCode === ENTER_KEYCODE) {
        mapPinsArr[j].classList.add('map__pin--active');
        cardsArr[j].classList.remove('hidden');
      }

      if (evt.currentTarget !== mapPinsArr[j] && findClass(mapPinsArr[j], 'map__pin--active')) {
        mapPinsArr[j].classList.remove('map__pin--active');
        cardsArr[j].classList.add('hidden');
      }
    }
  };

  var popupCloseClickHandler = function () {
    for (var j = 0; j < cardsArr.length; j++) {
      if (!findClass(cardsArr[j], 'hidden') && findClass(mapPinsArr[j], 'map__pin--active')) {
        cardsArr[j].classList.add('hidden');
        mapPinsArr[j].classList.remove('map__pin--active');
      }
    }
  };

  var popupEnterCloseHandler = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      popupCloseClickHandler();
    }
  };

  var popupEscCloseHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      popupCloseClickHandler();
    }
  };


  // Add event listeners

  for (var j = 0; j < mapPinsArr.length; j++) {
    mapPinsArr[j].addEventListener('click', mapPinsClickHandler);

    var popupClose = cardsArr[j].querySelector('.popup__close');
    popupClose.addEventListener('click', popupCloseClickHandler);
    popupClose.addEventListener('keydown', popupEnterCloseHandler);
  }

  window.addEventListener('keydown', popupEscCloseHandler);

})();

