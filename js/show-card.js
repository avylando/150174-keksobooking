'use strict';

(function () {

  // Function show/hide card

  window.addPinListener = function (button, card) {

    // Variables

    var userPins;
    var userCards;
    var cardClose = card.querySelector('.popup__close');

    // Handlers

    var buttonClickHandler = function () {

      button.classList.add('map__pin--active');
      card.classList.remove('hidden');
      cardClose.addEventListener('click', cardCloseClickHandler);
      document.addEventListener('keydown', cardEscCloseHandler);

      userPins = Array.from(document.querySelectorAll('.map__pin--user'));
      userPins.forEach(function (it) {
        if (it.classList.contains('map__pin--active') && it !== button) {
          it.classList.remove('map__pin--active');
        }
      });

      userCards = Array.from(document.querySelectorAll('.popup'));
      userCards.forEach(function (it) {
        if (!it.classList.contains('hidden') && it !== card) {
          it.classList.add('hidden');
        }
      });
    };

    var cardCloseClickHandler = function () {
      if (!card.classList.contains('hidden') && button.classList.contains('map__pin--active')) {
        card.classList.add('hidden');
        button.classList.remove('map__pin--active');
        cardClose.removeEventListener('click', cardCloseClickHandler);
        document.removeEventListener('keydown', cardEscCloseHandler);
      }
    };

    var cardEscCloseHandler = function (evt) {
      if (evt.keyCode === window.utils.Keycode.ESC) {
        cardCloseClickHandler();
      }
    };

    button.addEventListener('click', buttonClickHandler);
  };

})();
