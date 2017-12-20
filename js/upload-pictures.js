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

  var renderImageInTemplate = function (image, template) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      template.src = reader.result;
    });

    reader.readAsDataURL(image);
  };

  var renderImageInContainer = function (image, container) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      var photo = document.createElement('img');
      photo.src = reader.result;
      photo.classList.add('photo');
      container.appendChild(photo);
    });

    reader.readAsDataURL(image);
  };


  // Avatar upload

  uploadAvatarInput.addEventListener('change', function () {
    var avatar = uploadAvatarInput.files[0];

    if (checkFileValidity(avatar, FILE_TYPES)) {
      renderImageInTemplate(avatar, avatarPreview);
    }
  });


  // Photos upload

  uploadPhotosInput.addEventListener('change', function () {
    var file = uploadPhotosInput.files[0];

    if (checkFileValidity(file, FILE_TYPES)) {
      renderImageInContainer(file, photoContainer);
    }
  });

})();
