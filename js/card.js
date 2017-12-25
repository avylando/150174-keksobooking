'use strict';


(function () {

  // Constants
  var IMAGE_WIDTH = '70px';
  var IMAGE_HEIGHT = '40px';

  // Find card template

  var template = document.querySelector('template').content;
  var mapCardTemplate = template.querySelector('article.map__card');
  var featuresTemplate = mapCardTemplate.querySelector('.popup__features');
  var photosTemplate = mapCardTemplate.querySelector('.popup__pictures');

  // Clear template
  window.utils.clearChildNodes(featuresTemplate);
  window.utils.clearChildNodes(photosTemplate);

  // Vocabulary

  var houseTypes = {
    'flat': 'Квартира',
    'bungalo': 'Лачуга',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  // Card constructor

  var Card = function (obj) {
    this.element = mapCardTemplate.cloneNode(true);
    this.element.querySelector('.popup__avatar').src = obj.author.avatar;
    this.element.querySelector('h3').textContent = obj.offer.title;
    this.element.querySelector('p small').textContent = obj.offer.adress;
    this.element.querySelector('.popup__price').innerHTML = obj.offer.price + '&#x20bd;/ночь';
    this.element.querySelector('h4').textContent = houseTypes[obj.offer.type] || 'Не указан';
    this.element.querySelector('h4 + p').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
    this.element.querySelector('h4 + p + p').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
    this.element.querySelector('.popup__features').appendChild(this.createFeaturesList(obj.offer.features));
    this.element.querySelector('.popup__features + p').textContent = obj.offer.description;
    this.element.querySelector('.popup__pictures').appendChild(this.createPhotosList(obj.offer.photos));
    this.element.classList.add('hidden');
  };

  Card.prototype.createFeaturesList = function (array) {
    var featuresFragment = document.createDocumentFragment();
    array.forEach(function (featureName) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('feature');
      featureElement.classList.add('feature--' + featureName);
      featuresFragment.appendChild(featureElement);
    });

    return featuresFragment;
  };

  Card.prototype.createPhotosList = function (array) {
    var photosFragment = document.createDocumentFragment();
    array.forEach(function (imageSrc) {
      var image = document.createElement('img');
      image.src = imageSrc;
      image.style.width = IMAGE_WIDTH;
      image.style.height = IMAGE_HEIGHT;
      photosFragment.appendChild(image);
    });

    return photosFragment;
  };

  // Export

  window.card = {
    generate: function (obj) {
      var card = new Card(obj);

      return card;
    }
  };
})();
