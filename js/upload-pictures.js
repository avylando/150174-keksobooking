'use strict';


(function () {

  // Constants
  var FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

  // DOM-Elements
  var uploadAvatarInput = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.notice__preview > img');
  var uploadPhotosInput = document.querySelector('#images');
  var photoContainer = document.querySelector('.form__photo-container');

  // Useful functions

  var checkFileValidity = function (file, fileTypes) {
    var fileName = file.name.toLowerCase();
    var fileTypeValidity = fileTypes.some(function (type) {
      return fileName.endsWith(type);
    });

    return fileTypeValidity;
  };

  var readImageFile = function (image, container, callback) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      callback(reader, container);
    });
    reader.readAsDataURL(image);
  };

  var setImageSrc = function (fileReader, container) {
    container.src = fileReader.result;
  };

  var createImageInContainer = function (fileReader, container) {
    var photo = document.createElement('img');
    photo.src = fileReader.result;
    photo.classList.add('photo');
    container.appendChild(photo);
  };


  // Avatar upload

  uploadAvatarInput.addEventListener('change', function () {
    var avatar = uploadAvatarInput.files[0];

    if (checkFileValidity(avatar, FILE_TYPES)) {
      readImageFile(avatar, avatarPreview, setImageSrc);
    }
  });


  // Photos upload

  uploadPhotosInput.addEventListener('change', function () {
    var file = uploadPhotosInput.files[0];

    if (checkFileValidity(file, FILE_TYPES)) {
      readImageFile(file, photoContainer, createImageInContainer);
    }
  });

})();
