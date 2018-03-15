INSERT INTO feature (name)
VALUES ('wifi'), ('dishwasher'), ('parking'), ('washer'), ('elevator'), ('conditioner');

INSERT INTO h_type (name)
VALUES ('bungalo'), ('flat'), ('house'), ('palace');

INSERT INTO offer (avatar, title, adress, price, type_id, rooms, guests, checkin, checkout, description, location_x, location_y)
VALUES ("img/avatars/user01.png", "Уютное гнездышко для молодоженов", "102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3", 42000, 3, 3, 6, "14:00", "10:00", "Великолепный таун-хауз в центре Токио. Подходит как туристам, так и бизнесменам. Дом полностью укомплектован и имеет свежий ремонт.", 428, 493),
("img/avatars/user02.png", "Маленькая квартирка рядом с парком", "102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō", 30000, 2, 1, 1, "9:00", "7:00", "Маленькая чистая квартира на краю парка. Без интернета, регистрации и СМС.", 471, 545),
("img/avatars/user03.png", "Небольшая лавочка в парке", "Chiyoda-ku, Tōkyō-to 102-0091", 100, 1, 0, 0, "0:00", "0:00", "Великолепная лавочка прямо в центре парка. Подходит для всех кто любит спать на свежем воздухе.", 744, 534),
("img/avatars/user04.png", "Императорский дворец в центре Токио", "1-1 Chiyoda, Chiyoda-ku, Tōkyō-to 100-8111", 6000000, 4, 35, 93, "21:00", "20:00", "Замечательный дворец в старинном центре города. Только для тех кто может себе позволить дворец. Лакеев и прочих жокеев просим не беспокоить.", 526, 597),
("img/avatars/user05.png", "Милейший чердачок", "102-0094 Tōkyō-to, Chiyoda-ku, Kioichō, 3", 10000, 1, 1, 2, "11:00", "10:00", "Маленькая квартирка на чердаке. Для самых не требовательных.", 361, 517),
("img/avatars/default.png", "Наркоманский притон", "102-0094 Tōkyō-to, Chiyoda-ku, Kioichō, 3", 5000, 1, 3, 6, "11:00", "10:00", "У нас есть всё! Шприцы, интернет, кофе. Для всех кто знает толк в отдыхе. Полицию просим не беспокоить.", 1165, 423),
("img/avatars/user06.png", "Чёткая хата", "102-0081 Tōkyō-to, Chiyoda-ku, Yonbanchō, 5−6", 9000, 2, 2, 3, "17:00", "16:00", "У нас тут все ништяк. Ларек за углом. Шава 24 часа. Приезжайте! Интернетов нет!", 594, 464),
("img/avatars/user07.png", "Стандартная квартира в центре", "Chiyoda-ku, Tōkyō-to 102-0082", 60000, 2, 3, 5, "17:00", "16:00", "Тут красиво, светло и уютно. Есть где разместиться компании из 5 человек. Кофе и печеньки бесплатно.", 452, 382),
("img/avatars/user08.png", "Тихая квартирка недалеко от метро", "102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 17−4", 50000, 2, 1, 3, "23:00", "5:00", "Квартира на первом этаже. Соседи тихие. Для всех, кто терпеть не может шума и суеты.", 976, 505),
("img/avatars/default.png", "Милое гнездышко для фанатов Анимэ", "105-0003 Tōkyō-to, Minato-ku, Nishishinbashi, 2 Chome−3", 90000, 3, 1, 2, "23:00", "5:00", "Азиатов просьба не беспокоить.", 535, 418);

INSERT INTO of_feature(offer_id, feature_id)
VALUES (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (2, 5), (2, 6), (4, 1), (4, 2), (4, 3), (4, 4), (4, 5), (4, 6),
(5, 1), (5, 4), (5, 5), (6, 1), (6, 2), (6, 3), (6, 4), (6, 5), (6, 6), (7, 2), (7, 3), (7, 4), (7, 5), (7, 6),
(8, 1), (8, 2), (8, 4), (8, 6), (9, 1), (9, 2), (9, 4), (10, 1), (10, 2), (10, 3), (10, 4), (10, 5), (10, 6);

INSERT INTO of_photo(offer_id, path)
VALUES (1, "https://cdn.ostrovok.ru/t/x500/mec/hotels/11000000/10360000/10357700/10357605/10357605_25_b.jpg"),
 (1, "https://cdn.ostrovok.ru/t/x500/mec/hotels/11000000/10360000/10357700/10357605/10357605_27_b.jpg"),
 (1, "https://cdn.ostrovok.ru/t/x500/mec/hotels/11000000/10360000/10357700/10357605/10357605_17_b.jpg"),
 (1, "https://cdn.ostrovok.ru/t/x500/mec/hotels/11000000/10360000/10357700/10357605/10357605_30_b.jpg"),
 (1, "https://cdn.ostrovok.ru/t/x500/mec/hotels/10000000/9160000/9151200/9151174/9151174_1_b.jpg"),
 (1, "https://cdn.ostrovok.ru/t/x500/mec/hotels/10000000/9160000/9151200/9151174/9151174_12_b.jpg"),
 (1, "https://cdn.ostrovok.ru/t/x500/mec/hotels/10000000/9160000/9151200/9151174/9151174_5_b.jpg"),
 (2, "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/01488611-c1f9-4854-ad67-9f0ad3e857e6.jpeg"),
 (2, "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/d976dd4b-2a7e-415a-a2a2-afc51caf8006.jpeg"),
 (4, "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/5a29d708-9396-40bf-b002-92c5fdeb5c90.jpeg"),
 (4, "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/23e332cb-1379-4582-85ac-901d6c441635.jpeg"),
 (4, "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/1c859bbf-61d6-4295-b463-c1d0cbf62592.jpeg"),
 (4, "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/f5e66549-1940-4659-b27a-652f5c809231.jpeg"),
 (4, "https://cdn.ostrovok.ru/t/x500/mec/hotels/11000000/10360000/10357700/10357605/10357605_30_b.jpg"),
 (4, "https://cdn.ostrovok.ru/t/x500/laterooms/hotelphotos/laterooms/274510/gallery/economy-apartment-shinjuku-tokyo-tokyo_040220130219545024.jpg"),
 (4, "https://cdn.ostrovok.ru/t/x500/laterooms/hotelphotos/laterooms/274510/gallery/economy-apartment-shinjuku-tokyo-tokyo_040220130215449816.jpg"),
 (4, "https://cdn.ostrovok.ru/t/x500/laterooms/hotelphotos/laterooms/274510/gallery/economy-apartment-shinjuku-tokyo-tokyo_040220130206399539.jpg"),
 (4, "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/69d53ff8-cd47-479d-8c9a-5170352aa169.jpeg"),
 (4, "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/19614107-a1da-4a0b-8a93-95107704a598.jpeg"),
 (4, "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/a97c72b9-e311-4a5a-863d-ea1e31ae9924.jpeg"),
 (4, "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/d2a52c68-e877-4902-be6d-c7f3cb198437.jpeg"),
 (5, "https://cdn.ostrovok.ru/t/x500/mec/hotels/5000000/4500000/4493700/4493658/4493658_17_b.jpg"),
 (5, "https://cdn.ostrovok.ru/t/x500/mec/b4/c6/b4c674087f12b74bc71fe073923ec744dfe1ed8f.jpeg"),
 (5, "https://cdn.ostrovok.ru/t/x500/mec/1e/e8/1ee854db105a1f6bcd19ea62e1aa294724af7885.jpeg"),
 (5, "https://cdn.ostrovok.ru/t/x500/mec/ca/9a/ca9ad256650553cdce9d8ff8baad93d4f17b9484.jpeg"),
 (6, "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/42624d02-3198-4979-b521-194024454eb7.jpeg"),
 (7, "https://cdn.ostrovok.ru/t/x500/mec/a4/bb/a4bbfa3d98c0ddf60e95e610509dbede8160e40e.jpeg"),
 (7, "https://cdn.ostrovok.ru/t/x500/mec/hotels/1000000/480000/470500/470466/470466_12_b.jpg"),
 (7, "https://cdn.ostrovok.ru/t/x500/mec/hotels/1000000/480000/470500/470466/470466_17_b.jpg"),
 (7, "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/aa9f9334-acd2-46f7-ae6e-4ae039376ec6.jpeg"),
 (8, "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/987935fb-633a-46b8-9b76-76af9f35c5e3.jpeg"),
 (8, "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/434b2eda-5af9-4b93-b97d-4e7514621ff1.jpeg"),
 (8, "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/fa9c3bba-a64a-4019-ab50-102bf6e5d691.jpeg"),
 (8, "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/f779d886-18a6-4ffb-b7c2-f5d4d0c8952a.jpeg"),
 (9, "https://cdn.ostrovok.ru/t/x500/mec/9b/6c/9b6cacd832ce9f3db3f17b3a2f368958710ce518.jpeg"),
 (9, "https://cdn.ostrovok.ru/t/x500/mec/9c/5d/9c5dc5a6daf5353bb44b5696df1c1186c55173b9.jpeg"),
 (9, "https://cdn.ostrovok.ru/t/x500/mec/cd/c6/cdc6e4a1df6259cb54c75edb6ac351180b49b5ec.jpeg"),
 (9, "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/abcedd44-bfbd-411d-9919-fa2ac82ef6b0.jpeg"),
 (10, "https://cdn.ostrovok.ru/t/x500/second2/1389653673/9237e4e2ff53d3d1beb69e49412df972.jpg"),
 (10, "https://cdn.ostrovok.ru/t/x500/second/1389604422/ff530e241de007ce3af7bdd23719ae0a.jpg"),
 (10, "https://cdn.ostrovok.ru/t/x500/mec/hotels/2000000/1480000/1479400/1479346/1479346_34_b.jpg"),
 (10, "https://cdn.ostrovok.ru/t/x500/mec/hotels/2000000/1480000/1479400/1479346/1479346_40_b.jpg");
