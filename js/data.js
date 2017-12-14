'use strict';


(function () {

  var similarAds = [];

  // Load users ads

  var loadDataFromServer = function (data) {

    similarAds = data;

    // Append ads to fragments

    var fragmentPins = document.createDocumentFragment();
    var fragmentCards = document.createDocumentFragment();
    var pin;
    var card;
    var maxAds = 5;

    for (var i = 0; i < maxAds; i++) {
      pin = window.pin.generate(similarAds[i]);
      card = window.card.generate(similarAds[i]);

      pin.setAttribute('id', 'user' + (i + 1));
      card.setAttribute('id', 'user' + (i + 1));

      fragmentPins.appendChild(pin);
      fragmentCards.appendChild(card);
    }


    // Add fragments into DOM

    var map = document.querySelector('.map');
    window.tokyoPinMap = document.querySelector('.map__pins');
    var filtersContainer = map.querySelector('.map__filters-container');

    window.tokyoPinMap.appendChild(fragmentPins);
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

  var filtersContainer = document.querySelector('.map__filters-container');
  var usersPins = Array.from(filtersContainer.querySelectorAll('.map__pin--user'));
  var houseTypeFilter = filtersContainer.querySelector('#housing-type');
  var housePriceFilter = filtersContainer.querySelector('#housing-price');
  var roomsNumberFilter = filtersContainer.querySelector('#housing-rooms');
  var guestsNumberFilter = filtersContainer.querySelector('#housing-guests');
  var featuresFilter = filtersContainer.querySelector('#housing-features');

  var checkPriceRange = function (element) {
    switch (housePriceFilter.value) {
      case 'low':
        return element.offer.price < 1000;
      case 'middle':
        return element.offer.price >= 1000 && element.offer.price <= 10000;
      case 'high':
        return element.offer.price > 10000;
    }
    return false;
  };

  var filterByValues = function (element) {
    return (houseTypeFilter.value === 'any' || element.offer.type === houseTypeFilter.value)
      && checkPriceRange(element)
      && (roomsNumberFilter.value === 'any' || element.offer.rooms === roomsNumberFilter.value)
      && (guestsNumberFilter.value === 'any' || element.offer.guests === guestsNumberFilter.value);
  };

  var clearMap = function () {
    var userPins = document.querySelectorAll('.map__pin--user');

    userPins.forEach(function (it) {
      window.tokyoPinMap.removeChild(it);
    });
  };

  filtersContainer.addEventListener('change', function () {
    clearMap();
    similarAds.filter(filterByValues).forEach(window.pin.generate);
  });

})();

