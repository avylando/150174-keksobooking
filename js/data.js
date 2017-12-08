'use strict';


(function () {

  // Load users ads

  var loadDataFromServer = function (data) {

    var ads = data;

    // Append ads to fragments

    var fragmentPins = document.createDocumentFragment();
    var fragmentCards = document.createDocumentFragment();

    for (var i = 0; i < ads.length; i++) {
      fragmentPins.appendChild(window.pin.generate(ads[i]));
      fragmentCards.appendChild(window.card.generate(ads[i]));
    }

    // Hide elements

    var usersPins = fragmentPins.querySelectorAll('.map__pin--users');
    var usersCards = fragmentCards.querySelectorAll('.popup');

    window.lib.addClassToAll(usersPins, 'hidden');
    window.lib.addClassToAll(usersCards, 'hidden');

    // Add functions show/hide card

    window.showCard(usersPins, usersCards);

    // Add fragments into DOM

    var map = document.querySelector('.map');
    var tokyoPinMap = document.querySelector('.map__pins');
    var filtersContainer = map.querySelector('.map__filters-container');

    tokyoPinMap.appendChild(fragmentPins);
    map.insertBefore(fragmentCards, filtersContainer);

  };

  var loadError = function (errorMessage) {
    var errorPopup = document.createElement('div');

    // Element position
    errorPopup.style.position = 'absolute';
    errorPopup.style.right = '20px';
    errorPopup.style.top = '20px';
    errorPopup.style.zIndex = '200';
    // Element sizes
    errorPopup.style.boxSizing = 'border-box';
    errorPopup.style.width = '220px';
    errorPopup.style.padding = '10px';
    // Element text style
    errorPopup.style.fontSize = '14px';
    errorPopup.style.color = '#ffffff';
    errorPopup.style.textAlign = 'center';
    // Element style
    errorPopup.style.backgroundColor = 'rgba(255, 109, 81, 0.7)';
    errorPopup.style.borderRadius = '10px';

    errorPopup.textContent = errorMessage;
    document.body.style.position = 'relative';
    document.body.insertAdjacentElement('afterBegin', errorPopup);
  };

  window.backend.load(loadDataFromServer, loadError);

})();

