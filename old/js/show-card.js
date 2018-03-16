'use strict';

(function () {

  // Function show/hide card

  window.addShowCardHandler = function (button, card) {

    // Variables
    var cardClose = card.querySelector('.popup__close');

    // Handlers

    var buttonClickHandler = function () {
      var activeButton = document.querySelector('.map__pin--active');
      if (activeButton) {
        activeButton.classList.remove('map__pin--active');
      }
      button.classList.add('map__pin--active');

      var visibleCard = document.querySelector('.popup:not(.hidden)');
      if (visibleCard) {
        visibleCard.classList.add('hidden');
      }
      card.classList.remove('hidden');

      cardClose.addEventListener('click', cardCloseClickHandler);
      document.addEventListener('keydown', cardEscCloseHandler);
    };


    var cardCloseClickHandler = function () {
      if (!card.classList.contains('hidden') && button.classList.contains('map__pin--active')) {
        button.classList.remove('map__pin--active');
        card.classList.add('hidden');

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
