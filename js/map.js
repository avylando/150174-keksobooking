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

  // Create Pins array

  var usersPins = fragmentPins.querySelectorAll('.map__pin--users');


  // Hide Cards

  var usersCards = fragmentCards.querySelectorAll('.popup');

  var addClassToAll = function (array, classname) {
    for (var j = 0; j < array.length; j++) {
      array[j].classList.add(classname);
    }
  };

  addClassToAll(usersCards, 'hidden');


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
  var mainPinMinY = window.data.minY;
  var mainPinMaxY = window.data.maxY;
  var inputAddress = noticeForm.querySelector('#address');

  mainPin.addEventListener('mousedown', function (event) {
    event.preventDefault();

    var mainPinMouseMoveHandler = function (evt) {
      evt.preventDefault();

      // Compensation offset on fullscreen
      var bodyWidth = document.querySelector('body').clientWidth;
      var bodyMaxWidth = 1200;

      if (bodyWidth === bodyMaxWidth) {
        mainPin.style.left = (evt.pageX - mainPinWidth / 2) + 'px';
      } else {
        mainPin.style.left = (evt.pageX - mainPinWidth / bodyWidth) + 'px';
      }

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


  //  Add functions show/hide card

  window.showCard(usersPins, usersCards);

})();

