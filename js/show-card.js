'use strict';

(function () {

  // Function show/hide card

  window.showCard = function (button, card) {

    var userPins;
    var userCards;
    var buttonId = button.getAttribute('id');
    var cardId = card.getAttribute('id');
    var buttonClickHandler = function (evt) {

      if (evt.currentTarget === button || evt.keyCode === window.lib.ENTER_KEYCODE) {
        button.classList.add('map__pin--active');
        if (buttonId === cardId) {
          card.classList.remove('hidden');
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
      if (!window.lib.findClass(card, 'hidden') && window.lib.findClass(button, 'map__pin--active')) {
        card.classList.add('hidden');
        button.classList.remove('map__pin--active');
        document.removeEventListener('keydown', cardEscCloseHandler);
      }
    };

    var cardEnterCloseHandler = function (evt) {
      if (evt.keyCode === window.lib.ENTER_KEYCODE) {
        cardCloseClickHandler();
      }
    };

    var cardEscCloseHandler = function (evt) {
      if (evt.keyCode === window.lib.ESC_KEYCODE) {
        cardCloseClickHandler();
      }
    };

    // Add event listeners

    button.addEventListener('click', buttonClickHandler);

    var cardClose = card.querySelector('.popup__close');
    cardClose.addEventListener('click', cardCloseClickHandler);
    cardClose.addEventListener('keydown', cardEnterCloseHandler);
  };

})();
