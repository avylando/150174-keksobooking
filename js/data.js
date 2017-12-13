'use strict';


(function () {

  // Load users ads

  var loadDataFromServer = function (data) {

    var ads = data;

    // Append ads to fragments

    var fragmentPins = document.createDocumentFragment();
    var fragmentCards = document.createDocumentFragment();
    var pin;
    var card;

    for (var i = 0; i < ads.length; i++) {
      pin = window.pin.generate(ads[i]);
      card = window.card.generate(ads[i]);

      pin.setAttribute('id', 'user' + (i + 1));
      card.setAttribute('id', 'user' + (i + 1));

      fragmentPins.appendChild(pin);
      fragmentCards.appendChild(card);
    }


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

