'use strict';


(function () {

  // Constants
  var MAX_ADS = 5;
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

  //

  var fillMap = function (array) {
    var pinsFragment = document.createDocumentFragment();
    var cardsFragment = document.createDocumentFragment();

    array.slice(0, MAX_ADS).forEach(function (it) {
      var pin = window.pin.generate(it);
      var card = window.card.generate(it);

      window.addShowCardHandler(pin, card);

      pinsFragment.appendChild(pin);
      cardsFragment.appendChild(card);
    });

    pinsMap.appendChild(pinsFragment);
    map.insertBefore(cardsFragment, filtersContainer);
  };


  // Set filters

  var checkPriceRange = function (ad) {
    switch (housePriceFilter.value) {
      case 'low':
        return ad.offer.price < LOW_PRICE;
      case 'middle':
        return ad.offer.price >= LOW_PRICE && ad.offer.price <= HIGH_PRICE;
      case 'high':
        return ad.offer.price > HIGH_PRICE;
      case 'any':
        return ad;
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

    var checkFeatureInAd = function (it) {
      return adFeatures.indexOf(it) !== -1;
    };

    return checkedFeaturesValues.every(checkFeatureInAd);
  };


  var filterByValues = function (ad) {
    return (houseTypeFilter.value === 'any' || ad.offer.type === houseTypeFilter.value)
      && checkPriceRange(ad)
      && (roomsNumberFilter.value === 'any' || ad.offer.rooms === parseInt(roomsNumberFilter.value, 10))
      && (guestsNumberFilter.value === 'any' || ad.offer.guests === parseInt(guestsNumberFilter.value, 10))
      && checkFeatureOptions(ad.offer.features);
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

  var updateMap = function () {
    clearMap();
    var filteredAds = similarAds.filter(filterByValues);
    fillMap(filteredAds);
  };

  // Add debounce

  var filtersChangeHandler = window.debounce(updateMap, DEBOUNCE_TIMEOUT_INTERVAL);
  filtersContainer.addEventListener('change', filtersChangeHandler);

  // Export

  window.data = {
    loadSuccess: function (data) {
      similarAds = data;
      fillMap(similarAds);
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

})();
