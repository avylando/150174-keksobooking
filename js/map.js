'use strict';

var AD_PARAMETERS = [];
var ADS = [];
var adsNumber = 8;
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var minPrice = 1000;
var maxPrice = 1000000;
var TYPES = ['flat', 'house', 'bungalo'];
var minRoomsNumber = 1;
var maxRoomsNumber = 5;
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var minX = 300;
var maxX = 900;
var minY = 100;
var maxY = 500;

// Useful functions

var getValueInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomValue = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};


var map = document.querySelector('.map');
map.classList.remove('map--faded');

var tokyoPinMap = document.querySelector('.map__pins');

var template = document.querySelector('template').content;

// Generate Pin from template

var mapPin = template.querySelector('.map__pin');
var pinWidth = 46;
var pinHeight = 64;

var generatePin = function () {
  var pinElement = mapPin.cloneNode(true);
  pinElement.querySelector('img').src = author.avatar;
  pinElement.style.left = (houseLocation.x - pinWidth) + 'px';
  pinElement.style.top = (houseLocation.y - pinHeight) + 'px';

  return pinElement;
};

// Generate Card from template

var mapCard = template.querySelector('.map__card');

var generateCard = function () {
  var cardElement = mapCard.cloneNode(true);

  var getHouseType = function (value) {
    if (value === 'flat') {
      return 'Квартира';
    } else if (value === 'bungalo') {
      return 'Бунгало';
    } else if (value === 'house') {
      return 'Дом';
    }
  };

  var addFeatureItem = function (array) {
    var FEATURES_LIST_ELEMENTS = [];

    for (var j = 0; j < array.length; j++) {
      FEATURES_LIST_ELEMENTS[j] = '<li></li>';
    }

    var featuresList = FEATURES_LIST_ELEMENTS.join(' ');
    return featuresList;
  };

  var addItemClasses = function (array) {

    var FEATURE_ITEMS = cardElement.querySelectorAll('.popup__features > li');

    for (var i = 0; i < array.length; i++) {
      FEATURE_ITEMS[i].classList.add('feature');
      FEATURE_ITEMS[i].classList.add('feature--' + array[i]);
    }

    return FEATURE_ITEMS;
  };

  cardElement.querySelector('h3').textContent = offer.title;
  cardElement.querySelector('p small').textContent = offer.adress;
  cardElement.querySelector('.popup__price').textContent = offer.price + '&#x20bd;/ночь';
  cardElement.querySelector('h4').textContent = getHouseType(offer.type);
  cardElement.querySelector('h4 + p').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
  cardElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  cardElement.querySelector('.popup__features').innerHTML = addFeatureItem(offer.features);
  cardElement.querySelectorAll('.popup__features > li').textContent = addItemClasses(offer.features);
  cardElement.querySelector('.popup__features + p').textContent = offer.description;
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  cardElement.style.left = (houseLocation.x - pinWidth) + 'px';
  cardElement.style.top = (houseLocation.y - pinHeight) + 'px';

  return cardElement;
};

// Create fragments

var fragmentPins = document.createDocumentFragment();
var fragmentCards = document.createDocumentFragment();

// Generate objects

for (var i = 0; i < adsNumber; i++) {
  var author = {
    avatar: 'img/avatars/user0' + (i + 1) + '.png'
  };

  var offer = {
    title: TITLES[i],
    adress: '{{location.x}}, {{location.y}}',
    price: getValueInRange(minPrice, maxPrice),
    type: getRandomValue(TYPES),
    rooms: getValueInRange(minRoomsNumber, maxRoomsNumber),
    guests: getValueInRange(minRoomsNumber, maxRoomsNumber) * 2,
    checkin: getRandomValue(CHECK_TIMES),
    checkout: getRandomValue(CHECK_TIMES),
    features: [],
    description: '',
    photos: []
  };

  // var cache = '';
  var randomFeaturesLength = Math.round(Math.random() * FEATURES.length);

  // console.log(randomFeaturesLength);

  for (var j = 0; j < randomFeaturesLength; j++) {
    offer.features[j] = getRandomValue(FEATURES);

    // for (var k = 0; k < offer.features.length; k++) {
    //   if (cache !== offer.features[j]) {
    //   offer.features[j] = cache;
    //   }
    // }
  }

  var houseLocation = {
    x: getValueInRange(minX, maxX),
    y: getValueInRange(minY, maxY)
  };

  AD_PARAMETERS = [author, offer, houseLocation];

  ADS[i] = AD_PARAMETERS;

  fragmentPins.appendChild(generatePin(ADS));
  fragmentCards.appendChild(generateCard(ADS));
}

// console.log(fragmentCards);
tokyoPinMap.appendChild(fragmentPins);
map.appendChild(fragmentCards);
