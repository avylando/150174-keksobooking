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

  // Useful functions

  var createFeaturesList = function (array) {

    var featuresFragment = document.createDocumentFragment();
    array.forEach(function (featureName) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('feature');
      featureElement.classList.add('feature--' + featureName);
      featuresFragment.appendChild(featureElement);
    });

    return featuresFragment;
  };

  var createPhotosList = function (array) {

    var photosFragment = document.createDocumentFragment();
    array.forEach(function (it) {
      var image = document.createElement('img');
      image.src = it;
      image.style.width = IMAGE_WIDTH;
      image.style.height = IMAGE_HEIGHT;
      photosFragment.appendChild(image);
    });

    return photosFragment;
  };


  // Export values

  window.card = {
    generate: function (obj) {
      var cardClone = mapCardTemplate.cloneNode(true);

      cardClone.querySelector('.popup__avatar').src = obj.author.avatar;
      cardClone.querySelector('h3').textContent = obj.offer.title;
      cardClone.querySelector('p small').textContent = obj.offer.adress;
      cardClone.querySelector('.popup__price').innerHTML = obj.offer.price + '&#x20bd;/ночь';
      cardClone.querySelector('h4').textContent = houseTypes[obj.offer.type] || 'Не указан';
      cardClone.querySelector('h4 + p').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
      cardClone.querySelector('h4 + p + p').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
      cardClone.querySelector('.popup__features').appendChild(createFeaturesList(obj.offer.features));
      cardClone.querySelector('.popup__features + p').textContent = obj.offer.description;
      cardClone.querySelector('.popup__pictures').appendChild(createPhotosList(obj.offer.photos));
      cardClone.classList.add('hidden');

      return cardClone;
    }
  };
})();
