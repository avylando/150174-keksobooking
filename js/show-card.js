'use strict';

(function () {

  // Function show/hide card

  window.showCard = function (button, card) {

    // Variables

    var userPins;
    var userCards;
    var buttonId = button.getAttribute('id');
    var cardId = card.getAttribute('id');
    var cardClose = card.querySelector('.popup__close');

    // Handlers

    var buttonClickHandler = function (evt) {

      if (evt.currentTarget === button || evt.keyCode === window.Keycode.ENTER) {
        button.classList.add('map__pin--active');
        if (buttonId === cardId) {
          card.classList.remove('hidden');
          cardClose.addEventListener('click', cardCloseClickHandler);
          cardClose.addEventListener('keydown', cardEnterCloseHandler);
          document.addEventListener('keydown', cardEscCloseHandler);
        }
      }

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
        cardClose.removeEventListener('keydown', cardEnterCloseHandler);
        document.removeEventListener('keydown', cardEscCloseHandler);
      }
    };

    var cardEnterCloseHandler = function (evt) {
      if (evt.keyCode === window.Keycode.ENTER) {
        cardCloseClickHandler();
      }
    };

    var cardEscCloseHandler = function (evt) {
      if (evt.keyCode === window.Keycode.ESC) {
        cardCloseClickHandler();
      }
    };

    button.addEventListener('click', buttonClickHandler);
  };

})();
