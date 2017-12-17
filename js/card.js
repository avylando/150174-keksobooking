'use strict';


(function () {

  // Find card template

  var template = document.querySelector('template').content;
  var mapCard = template.querySelector('article.map__card');


  // Useful functions

  var getHouseType = function (value) {
    switch (value) {
      case 'flat': return 'Квартира';
      case 'bungalo': return 'Лачуга';
      case 'house': return 'Дом';
      default: return 'Неизвестно';
    }
  };


  var addFeatureItem = function (array) {
    var featuresListElements = [];

    array.forEach(function (it) {
      it = '<li></li>';
      featuresListElements.push(it);
    });

    var featuresList = featuresListElements.join(' ');
    return featuresList;
  };


  var addItemClasses = function (element, array) {
    var featureItems = element.querySelectorAll('.popup__features > li');

    for (var i = 0; i < array.length; i++) {
      featureItems[i].classList.add('feature');
      featureItems[i].classList.add('feature--' + array[i]);
    }

    return featureItems;
  };


  // Export values

  window.card = {
    generate: function (obj) {
      var cardElement = mapCard.cloneNode(true);

      cardElement.querySelector('h3').textContent = obj.offer.title;
      cardElement.querySelector('p small').textContent = obj.offer.adress;
      cardElement.querySelector('.popup__price').innerHTML = obj.offer.price + '&#x20bd;/ночь';
      cardElement.querySelector('h4').textContent = getHouseType(obj.offer.type);
      cardElement.querySelector('h4 + p').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
      cardElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
      cardElement.querySelector('.popup__features').innerHTML = addFeatureItem(obj.offer.features);
      cardElement.querySelectorAll('.popup__features > li').textContent = addItemClasses(cardElement, obj.offer.features);
      cardElement.querySelector('.popup__features + p').textContent = obj.offer.description;
      cardElement.querySelector('.popup__avatar').src = obj.author.avatar;
      cardElement.style.left = '30px';
      cardElement.style.top = '170px';
      cardElement.style.zIndex = '200';
      cardElement.classList.add('hidden');

      return cardElement;
    }
  };
})();
