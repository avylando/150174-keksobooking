'use strict';


(function () {

  // Constants
  // var MAX_ADS = 5;
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;
  var POPUP_TIMEOUT_INTERVAL = 5000;
  var DEBOUNCE_TIMEOUT_INTERVAL = 500;

  // DOM-elements
  var map = document.querySelector('.map');
  var pinsMap = map.querySelector('.map__pins');
  var filtersContainer = map.querySelector('.map__filters-container');
  var houseTypeFilter = filtersContainer.querySelector('#housing-type');
  var housePriceFilter = filtersContainer.querySelector('#housing-price');
  var roomsNumberFilter = filtersContainer.querySelector('#housing-rooms');
  var guestsNumberFilter = filtersContainer.querySelector('#housing-guests');
  var featuresFilter = filtersContainer.querySelector('#housing-features');
  var features = Array.from(featuresFilter.querySelectorAll('input[name="features"]'));

  // Variables
  var similarAds = [];

  var fillMap = function (array) {
    var pinsFragment = document.createDocumentFragment();
    var cardsFragment = document.createDocumentFragment();

    array.forEach(function (ad) {
      var pin = window.pin.generate(ad);
      var card = window.card.generate(ad);

      window.addShowCardHandler(pin.element, card.element);

      pinsFragment.appendChild(pin.element);
      cardsFragment.appendChild(card.element);
    });

    pinsMap.appendChild(pinsFragment);
    map.insertBefore(cardsFragment, filtersContainer);
  };

  var clearMap = function () {
    var userPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var userCards = document.querySelectorAll('.popup');

    userPins.forEach(function (pin) {
      pin.remove();
    });

    userCards.forEach(function (card) {
      card.remove();
    });
  };

  var updateMap = function (data) {
    clearMap();
    // var filteredAds = similarAds.filter(filterByValues);
    fillMap(data);
  };

  // Export

  window.data = {
    loadSuccess: function (data) {
      updateMap(data);
    },

    loadError: function (errorMessage) {
      var errorPopup = document.createElement('div');

      errorPopup.classList.add('error-popup');
      errorPopup.classList.add('error-popup--data');
      errorPopup.textContent = errorMessage;
      document.body.insertAdjacentElement('afterBegin', errorPopup);
      window.utils.setPopupTimeout(errorPopup, POPUP_TIMEOUT_INTERVAL);
    }
  };

  // Set filters

  var checkPriceRange = function (ad) {
    switch (housePriceFilter.value) {
      case 'low':
        // return ad.price < LOW_PRICE;
        window.backend.load(window.data.loadSuccess, window.data.loadError, '?price&to=10000');
        break;
      case 'middle':
        // return ad.price >= LOW_PRICE && ad.price <= HIGH_PRICE;
        window.backend.load(window.data.loadSuccess, window.data.loadError, '?price&from=10000&to=50000');
        break;
      case 'high':
        // return ad.price > HIGH_PRICE;
        window.backend.load(window.data.loadSuccess, window.data.loadError, '?price&from=50000');
        break;
      case 'any':
        window.backend.load(window.data.loadSuccess, window.data.loadError, '?price');
        break;
        // return ad;
    }
    return false;
  };

  var checkFeatureOptions = function (adFeatures) {
    var checkedFeatures = features.filter(function (input) {
      return input.checked;
    });

    var checkedFeaturesValues = checkedFeatures.map(function (inputChecked) {
      return inputChecked.value;
    });

    var checkFeatureInAd = function (feature) {
      return adFeatures.indexOf(feature) !== -1;
    };

    return checkedFeaturesValues.every(checkFeatureInAd);
  };


  var filterByValues = function (ad) {
    return (houseTypeFilter.value === 'any' || ad.type === houseTypeFilter.value)
      && checkPriceRange(ad)
      && (roomsNumberFilter.value === 'any' || parseInt(ad.rooms, 10) === parseInt(roomsNumberFilter.value, 10))
      && (guestsNumberFilter.value === 'any' || parseInt(ad.guests, 10) === parseInt(guestsNumberFilter.value, 10))
      && checkFeatureOptions(ad.features);
  };

  // Add debounce

  // var filtersChangeHandler = window.debounce(updateMap, DEBOUNCE_TIMEOUT_INTERVAL);
  // filtersContainer.addEventListener('change', filtersChangeHandler);
  housePriceFilter.addEventListener('change', checkPriceRange);

})();
