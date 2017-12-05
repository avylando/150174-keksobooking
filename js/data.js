'use strict';


(function () {

  // Generate Ad parameters

  var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var minPrice = 1000;
  var maxPrice = 1000000;
  var houseTypes = ['flat', 'house', 'bungalo'];
  var minRoomsNumber = 1;
  var maxRoomsNumber = 5;
  var checkTimes = ['12:00', '13:00', '14:00'];
  var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var minX = 300;
  var maxX = 900;
  var minY = 100;
  var maxY = 500;
  var pinWidth = 46;
  var pinHeight = 64;

  var generateAuthor = function (i) {
    return {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    };
  };

  var generateHouseLocation = function () {
    return {
      x: window.lib.getValueInRange(minX, maxX) + (pinWidth / 2),
      y: window.lib.getValueInRange(minY, maxY) + pinHeight
    };
  };

  var generateOffer = function (i, houseLoc) {

    return {
      title: titles[i],
      adress: 'x: ' + houseLoc.x + ', y: ' + houseLoc.y,
      price: window.lib.getValueInRange(minPrice, maxPrice),
      type: window.lib.getRandomValue(houseTypes),
      rooms: window.lib.getValueInRange(minRoomsNumber, maxRoomsNumber),
      guests: window.lib.getValueInRange(minRoomsNumber, maxRoomsNumber) * 2,
      checkin: window.lib.getRandomValue(checkTimes),
      checkout: window.lib.getRandomValue(checkTimes),
      features: [],
      description: '',
      photos: []
    };
  };

  var getRandomFeatures = function (ofr) {
    var randomFeaturesLength = Math.round(Math.random() * featuresArr.length);

    for (var j = 0; j < randomFeaturesLength; j++) {
      ofr.features[j] = window.lib.getRandomValue(featuresArr);
    }

    return window.lib.getUniqueValues(ofr.features);

  };


  // Create ADS array

  var adsArr = [];
  var adsNumber = 8;
  var adParameters = {};

  (function () {
    for (var i = 0; i < adsNumber; i++) {

      var author = generateAuthor(i);

      var houseLocation = generateHouseLocation();

      var offer = generateOffer(i, houseLocation);

      offer.features = getRandomFeatures(offer);

      adParameters = {author: author, offer: offer, houseLocation: houseLocation};
      adsArr[i] = adParameters;
    }
  })();

  // Export values

  window.data = {
    adParams: adParameters,
    ads: adsArr,
    minX: minX,
    maxX: maxX,
    minY: minY,
    maxY: maxY,
    pinWidth: pinWidth,
    pinHeight: pinHeight,
    template: document.querySelector('template').content
  };

})();
