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


  // Map and form prepare

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


  // Add draggable Main pin and activate map

  var mainPinWidth = 64;
  var mainPinHeight = 80;
  var mainPinShadowWidth = 156;
  var mainPinMinY = window.data.minY;
  var mainPinMaxY = window.data.maxY;
  var inputAddress = noticeForm.querySelector('#address');

  mainPin.addEventListener('mousedown', function (event) {
    event.preventDefault();

    var mainPinMouseMoveHandler = function (evt) {
      evt.preventDefault();

      mainPin.style.left = (evt.pageX - mainPinShadowWidth / 2) + 'px';
      mainPin.style.top = evt.pageY + 'px';

      // Set vertical limits
      if (evt.pageY < mainPinMinY) {
        mainPin.style.top = mainPinMinY + 'px';
      } else if (evt.pageY > mainPinMaxY) {
        mainPin.style.top = mainPinMaxY + 'px';
      }
    };

    var mainPinMouseUpHandler = function (evt) {
      evt.preventDefault();

      // Map and form activation
      map.classList.remove('map--faded');
      noticeForm.classList.remove('notice__form--disabled');
      removeElementsAttribute(noticeFieldsets, 'disabled');

      // Add fragments on map
      tokyoPinMap.appendChild(fragmentPins);
      map.insertBefore(fragmentCards, filtersContainer);

      // Set adress value
      var adressX = (parseInt(mainPin.style.left, 10) + (mainPinWidth / 2));
      var adressY = (parseInt(mainPin.style.top, 10) + mainPinHeight);

      inputAddress.value = 'x: ' + adressX + ', y: ' + adressY;

      document.removeEventListener('mousemove', mainPinMouseMoveHandler);
      mainPin.removeEventListener('mouseup', mainPinMouseUpHandler);
    };

    document.addEventListener('mousemove', mainPinMouseMoveHandler);
    mainPin.addEventListener('mouseup', mainPinMouseUpHandler);

  });


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

  document.addEventListener('keydown', popupEscCloseHandler);

})();

