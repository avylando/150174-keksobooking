'use strict';

(function () {

  // Function show/hide card

  window.showCard = function (buttons, cards) {

    var buttonsClickHandler = function (evt) {
      for (var j = 0; j < buttons.length; j++) {
        if (evt.currentTarget === buttons[j] || evt.keyCode === window.lib.ENTER_KEYCODE) {
          buttons[j].classList.add('map__pin--active');
          cards[j].classList.remove('hidden');
        }

        if (evt.currentTarget !== buttons[j] && window.lib.findClass(buttons[j], 'map__pin--active')) {
          buttons[j].classList.remove('map__pin--active');
          cards[j].classList.add('hidden');
        }
      }
    };

    var cardCloseClickHandler = function () {
      for (var j = 0; j < cards.length; j++) {
        if (!window.lib.findClass(cards[j], 'hidden') && window.lib.findClass(buttons[j], 'map__pin--active')) {
          cards[j].classList.add('hidden');
          buttons[j].classList.remove('map__pin--active');
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
      }
    })();

    document.addEventListener('keydown', cardEscCloseHandler);

  };
})();
