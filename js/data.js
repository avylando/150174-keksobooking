'use strict';


(function () {

  var similarAds = [];
  var map = document.querySelector('.map');
  var pinsMap = document.querySelector('.map__pins');
  var filtersContainer = map.querySelector('.map__filters-container');

  // Load users ads

  var loadDataFromServer = function (data) {

    similarAds = data;

    // Append ads to fragments

    var maxAds = 5;

    window.fillMap = function () {
      for (var i = 0; i < maxAds; i++) {
        var pin = window.pin.generate(similarAds[i]);
        var card = window.card.generate(similarAds[i]);

        window.lib.setElementId(pin, i + 1);
        window.lib.setElementId(card, i + 1);

        window.showCard(pin, card);

        pinsMap.appendChild(pin);
        map.insertBefore(card, filtersContainer);
      }
    };

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

  console.log(similarAds);

  // Set filters

  var houseTypeFilter = filtersContainer.querySelector('#housing-type');
  var housePriceFilter = filtersContainer.querySelector('#housing-price');
  var roomsNumberFilter = filtersContainer.querySelector('#housing-rooms');
  var guestsNumberFilter = filtersContainer.querySelector('#housing-guests');
  var featuresFilter = filtersContainer.querySelector('#housing-features');

  var checkPriceRange = function (element) {
    console.log(element.offer.price);
    switch (housePriceFilter.value) {
      case 'low':
        return element.offer.price < 10000;
      case 'middle':
        return element.offer.price >= 10000 && element.offer.price <= 50000;
      case 'high':
        return element.offer.price > 50000;
      case 'any':
        return element;
    }
    return false;
  };

  var filterByValues = function (element) {
    return (houseTypeFilter.value === 'any' || element.offer.type === houseTypeFilter.value)
      && checkPriceRange(element)
      && (roomsNumberFilter.value === 'any' || element.offer.rooms === +roomsNumberFilter.value)
      && (guestsNumberFilter.value === 'any' || element.offer.guests === +guestsNumberFilter.value);
  };

  var clearMap = function () {
    var userPins = document.querySelectorAll('.map__pin--user');
    var userCards = document.querySelectorAll('.popup');

    for (var i = 0; i < userPins.length; i++) {
      var pin = userPins[i];
      var card = userCards[i];
      pinsMap.removeChild(pin);
      map.removeChild(card);
    }
  };

  filtersContainer.addEventListener('change', function () {

    clearMap();
    var filteredPins = similarAds.filter(filterByValues).map(window.pin.generate);
    var filteredCards = similarAds.filter(filterByValues).map(window.card.generate);

    for (var i = 0; i < filteredPins.length; i++) {
      var pin = filteredPins[i];
      var card = filteredCards[i];
      window.lib.setElementId(pin, i + 1);
      window.lib.setElementId(card, i + 1);
      window.showCard(pin, card);
      pinsMap.appendChild(pin);
      map.insertBefore(card, filtersContainer);
    }
  });

})();

