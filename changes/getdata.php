<?php

require_once 'init.php';

if (!$db_link) {
  print(mysqli_connect_error());
  exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

  $ext = '';

  if (isset($_GET['price'])) {
    $min_price = isset($_GET['from']) ? intval($_GET['from']) : 0;
    $max_price = isset($_GET['to']) ? intval($_GET['to']) : 2147483647;

    $ext = 'WHERE price BETWEEN ' .$min_price. ' AND ' .$max_price;
  }

  $sql = "SELECT DISTINCT avatar, offer.id, offer.title, adress, price, h_type.name AS type, rooms, guests,
  checkin, checkout,
  (SELECT GROUP_CONCAT(feature.name SEPARATOR ', ') FROM of_feature
  LEFT JOIN feature ON of_feature.feature_id = feature.id WHERE offer_id = offer.id) AS features,
  description, location_x, location_y
  FROM offer
  INNER JOIN h_type ON type_id = h_type.id " .$ext.
  " GROUP BY offer.id ORDER BY offer.date DESC
  LIMIT 10";

  $result = mysqli_query($db_link, $sql);

  if (!$result) {
    print(mysqli_error($db_link));
    exit();
  }

  $data = [];
  $offers = mysqli_fetch_all($result, MYSQLI_ASSOC);

  // Get photos
  $sql = "SELECT offer.id, path FROM of_photo LEFT JOIN offer ON offer.id = offer_id";

  $result = mysqli_query($db_link, $sql);

  if (!$result) {
    print(mysqli_error($db_link));
    exit();
  }

  $photos = mysqli_fetch_all($result, MYSQLI_ASSOC);

  $data = [];

  foreach ($offers as $offer) {
    (!empty($offer['features'])) ? $offer['features'] = explode(', ', $offer['features']) : $offer['features'] = [];
    $of_photos = [];

    foreach ($photos as $photo) {

      if ($offer['id'] == $photo['id']) {
        array_push($of_photos, $photo['path']);
      }
    }

    $offer['photos'] = $of_photos;
    array_push($data, $offer);
  }

  $response = json_encode($data);
  echo $response;
}
