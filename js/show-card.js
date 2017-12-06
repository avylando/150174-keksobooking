'use strict';

(function () {

  // Function show/hide card

  window.showCard = function (buttons, cards) {

    var buttonsClickHandler = function (evt) {
      for (var i = 0; i < buttons.length; i++) {
        if (evt.currentTarget === buttons[i] || evt.keyCode === window.lib.ENTER_KEYCODE) {
          buttons[i].classList.add('map__pin--active');
          cards[i].classList.remove('hidden');
          document.addEventListener('keydown', cardEscCloseHandler);
        }

        if (evt.currentTarget !== buttons[i] && window.lib.findClass(buttons[i], 'map__pin--active')) {
          buttons[i].classList.remove('map__pin--active');
          cards[i].classList.add('hidden');
          document.removeEventListener('keydown', cardEscCloseHandler);
        }
      }
    };

    var cardCloseClickHandler = function () {
      for (var i = 0; i < cards.length; i++) {
        if (!window.lib.findClass(cards[i], 'hidden') && window.lib.findClass(buttons[i], 'map__pin--active')) {
          cards[i].classList.add('hidden');
          buttons[i].classList.remove('map__pin--active');
        }
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

    (function () {
      var cardClose = null;
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', buttonsClickHandler);

        cardClose = cards[i].querySelector('.popup__close');
        cardClose.addEventListener('click', cardCloseClickHandler);
        cardClose.addEventListener('keydown', cardEnterCloseHandler);

        if (!window.lib.findClass(cards[i], 'hidden')) {
          document.addEventListener('keydown', cardEscCloseHandler);
        } else {
          document.removeEventListener('keydown', cardEscCloseHandler);
        }
      }
    })();
  };

})();
