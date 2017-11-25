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

var getUniqueValues = function (array) {
  var obj = {};
  var output = [];
  var j = 0;

  for (var i = 0; i < array.length; i++) {
    var item = array[i];
    if (obj[item] !== 1) {
      obj[item] = 1;
      output[j++] = item;
    }
  }

  return output;
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

  cardElement.querySelector('h3').textContent = offer.title;
  cardElement.querySelector('p small').textContent = offer.adress;
  cardElement.querySelector('.popup__price').innerHTML = offer.price + '&#x20bd;/ночь';
  cardElement.querySelector('h4').textContent = getHouseType(offer.type);
  cardElement.querySelector('h4 + p').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
  cardElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  cardElement.querySelector('.popup__features').innerHTML = addFeatureItem(offer.features);
  cardElement.querySelectorAll('.popup__features > li').textContent = addItemClasses(cardElement, offer.features);
  cardElement.querySelector('.popup__features + p').textContent = offer.description;
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  cardElement.style.left = (houseLocation.x - pinWidth) + 'px';
  cardElement.style.top = (houseLocation.y - pinHeight) + 'px';

  return cardElement;
};

var getHouseType = function (value) {
  if (value === 'flat') {
    return 'Квартира';
  } else if (value === 'bungalo') {
    return 'Бунгало';
  } else if (value === 'house') {
    return 'Дом';
  } else {
    return 'Неизвестно';
  }
};

var addFeatureItem = function (array) {
  var FEATURES_LIST_ELEMENTS = [];

  for (var i = 0; i < array.length; i++) {
    FEATURES_LIST_ELEMENTS[i] = '<li></li>';
  }

  var featuresList = FEATURES_LIST_ELEMENTS.join(' ');

  return featuresList;
};

var addItemClasses = function (element, array) {

  var FEATURE_ITEMS = element.querySelectorAll('.popup__features > li');

  for (var i = 0; i < array.length; i++) {
    FEATURE_ITEMS[i].classList.add('feature');
    FEATURE_ITEMS[i].classList.add('feature--' + array[i]);
  }

  return FEATURE_ITEMS;
};

// Generate Ad parameters

var generateAuthor = function () {
  author = {
    avatar: 'img/avatars/user0' + (i + 1) + '.png'
  };

  return author;
};

var generateHouseLocation = function () {
  houseLocation = {
    x: getValueInRange(minX, maxX),
    y: getValueInRange(minY, maxY)
  };

  return houseLocation;
};

var generateOffer = function () {

  offer = {
    title: TITLES[i],
    adress: '' + houseLocation.x + ', ' + houseLocation.y,
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

  return offer;
};

var getRandomFeatures = function () {
  var randomFeaturesLength = Math.round(Math.random() * FEATURES.length);

  for (var j = 0; j < randomFeaturesLength; j++) {
    offer.features[j] = getRandomValue(FEATURES);
  }

  offer.features = getUniqueValues(offer.features);

  return offer.features;
};

// Create fragments

var fragmentPins = document.createDocumentFragment();
var fragmentCards = document.createDocumentFragment();

// Create ADS array and append to fragments

for (var i = 0; i < adsNumber; i++) {

  var author = generateAuthor();

  var houseLocation = generateHouseLocation();

  var offer = generateOffer();

  offer.features = getRandomFeatures();

  AD_PARAMETERS = [author, offer, houseLocation];
  ADS[i] = AD_PARAMETERS;

  fragmentPins.appendChild(generatePin(ADS[i]));
  fragmentCards.appendChild(generateCard(ADS[i]));
}

// Add fragments to map

tokyoPinMap.appendChild(fragmentPins);
map.appendChild(fragmentCards);
