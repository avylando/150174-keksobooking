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

  // Set filters

  var checkHouseType = function () {

    var houseTypeParams = {
      bungalo: 'type=bungalo',
      flat: 'type=flat',
      house: 'type=house',
      palace: 'type=palace',
      any: null
    }

    var params = houseTypeParams[houseTypeFilter.value];
    return params;
  };

  var checkPriceRange = function (ad) {

    switch (housePriceFilter.value) {
      case 'low':
        return 'price&to=10000';
      case 'middle':
        return 'price&from=10000&to=50000';
      case 'high':
        return 'price&from=50000';
      case 'any':
        return null;
    }

    return null;
  };

  var checkCapacity = function () {
    if (roomsNumberFilter.value === 'any') {
      return null;
    }

    return 'rooms=' + roomsNumberFilter.value;
  }

  var checkGuests = function () {
    if (guestsNumberFilter.value === 'any') {
      return null;
    }

    return 'guests=' + guestsNumberFilter.value;
  }

  var checkFeatureOptions = function () {
    var params = null;
    var checkedFeatures = features.filter(function (input) {
      return input.checked;
    });

    var checkedFeaturesValues = checkedFeatures.map(function (inputChecked) {
      return inputChecked.value;
    });

    if (checkedFeaturesValues.length > 0) {
      params = 'features[]=' + checkedFeaturesValues.join('&features[]=');
    }

    return params;
  };

  var setFilterParams = function () {
    var typeParams = checkHouseType();
    var priceParams = checkPriceRange();
    var roomsParams = checkCapacity();
    var guestsParams = checkGuests();
    var featureParams = checkFeatureOptions();

    var array = [typeParams, priceParams, roomsParams, guestsParams, featureParams];
    array = array.filter(function (el) {
      return el !== null;
    });

    var params = '?filter&' + array.join('&');

    window.backend.load(window.data.loadSuccess, window.data.loadError, params);
  }

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
    setFilterParams();
  };

  // Add debounce

  var filtersChangeHandler = window.debounce(updateMap, DEBOUNCE_TIMEOUT_INTERVAL);
  filtersContainer.addEventListener('change', filtersChangeHandler);

  // Export

  window.data = {
    loadSuccess: function (data) {
      fillMap(data);
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
