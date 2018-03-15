CREATE DATABASE keksobooking_db;

USE keksobooking_db;

CREATE TABLE feature (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name CHAR(64) NOT NULL
);

CREATE TABLE h_type (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name CHAR(64) NOT NULL
);

CREATE TABLE offer (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATETIME NOT NULL DEFAULT NOW(),
  avatar CHAR(255) NOT NULL DEFAULT 'img/avatars/default.png',
  title CHAR(100) NOT NULL,
  adress CHAR(128) NOT NULL,
  price INT NOT NULL,
  type_id INT NOT NULL,
  rooms INT NOT NULL,
  guests INT NOT NULL,
  checkin CHAR(8) NOT NULL,
  checkout CHAR(8) NOT NULL,
  description TEXT(256),
  location_x INT NOT NULL,
  location_y INT NOT NULL,
  CONSTRAINT FK_OfferType FOREIGN KEY (type_id) REFERENCES h_type(id)
);

CREATE TABLE of_photo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  offer_id INT NOT NULL,
  path CHAR(255) NOT NULL,
  CONSTRAINT FK_OfferPhoto FOREIGN KEY (offer_id) REFERENCES offer(id)
);

CREATE TABLE of_feature (
  id INT AUTO_INCREMENT PRIMARY KEY,
  offer_id INT NOT NULL,
  feature_id INT NOT NULL,
  CONSTRAINT FK_OfferItem FOREIGN KEY (offer_id) REFERENCES offer(id),
  CONSTRAINT FK_FeatureItem FOREIGN KEY (feature_id) REFERENCES feature(id)
);
