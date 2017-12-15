'use strict';


(function () {

  // Variables

  var similarAds = [];
  var map = document.querySelector('.map');
  var pinsMap = document.querySelector('.map__pins');
  var filtersContainer = map.querySelector('.map__filters-container');

  // Load users ads

  var loadDataFromServer = function (data) {
    similarAds = data;
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


  // Set filters

  var houseTypeFilter = filtersContainer.querySelector('#housing-type');
  var housePriceFilter = filtersContainer.querySelector('#housing-price');
  var roomsNumberFilter = filtersContainer.querySelector('#housing-rooms');
  var guestsNumberFilter = filtersContainer.querySelector('#housing-guests');
  var featuresFilter = filtersContainer.querySelector('#housing-features');

  var checkPriceRange = function (element) {
    var lowPrice = 10000;
    var highPrice = 50000;
    switch (housePriceFilter.value) {
      case 'low':
        return element.offer.price < lowPrice;
      case 'middle':
        return element.offer.price >= lowPrice && element.offer.price <= highPrice;
      case 'high':
        return element.offer.price > highPrice;
      case 'any':
        return element;
    }
    return false;
  };

  var features = Array.from(featuresFilter.querySelectorAll('input[name="features"]'));
  var checkFeatureOptions = function (element) {

    var checkedFeatures = features.filter(function (input) {
      return input.checked;
    });

    var checkedFeaturesValues = checkedFeatures.map(function (inputChecked) {
      return inputChecked.value;
    });

    var isContain = function (it) {
      return element.indexOf(it) !== -1;
    };

    return checkedFeatures === 'undefined' || checkedFeaturesValues.every(isContain);
  };


  var filterByValues = function (element) {
    return (houseTypeFilter.value === 'any' || element.offer.type === houseTypeFilter.value)
      && checkPriceRange(element)
      && (roomsNumberFilter.value === 'any' || element.offer.rooms === +roomsNumberFilter.value)
      && (guestsNumberFilter.value === 'any' || element.offer.guests === +guestsNumberFilter.value)
      && checkFeatureOptions(element.offer.features);
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

  var updateMap = function () {
    clearMap();
    var filteredAds = similarAds.filter(filterByValues);
    window.data.fillMap(filteredAds);
  };

  filtersContainer.addEventListener('change', function () {
    window.debounce(updateMap, 500);
  });

  var setElementId = function (element, number) {
    element.setAttribute('id', 'user' + number);
  };

  window.data = {
    fillMap: function (array) {
      var maxAds = 5;
      array = array || similarAds;
      array = array.slice(0, maxAds);

      for (var i = 0; i < array.length; i++) {
        var pin = window.pin.generate(array[i]);
        var card = window.card.generate(array[i]);

        setElementId(pin, i + 1);
        setElementId(card, i + 1);

        window.showCard(pin, card);

        pinsMap.appendChild(pin);
        map.insertBefore(card, filtersContainer);
      }
    }
  };

})();
