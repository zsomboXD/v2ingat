
CREATE TABLE IF NOT EXISTS `ingatlanok` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kategoriaId` int(11) NOT NULL,
  `leiras` varchar(500) NOT NULL DEFAULT '',
  `hirdetesDatuma` date NOT NULL,
  `tehermentes` tinyint(4) NOT NULL DEFAULT 1,
  `ar` int(11) NOT NULL,
  `kepUrl` varchar(200) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `FK_ingatlanok_kategoriak` (`kategoriaId`),
  CONSTRAINT `FK_ingatlanok_kategoriak` FOREIGN KEY (`kategoriaId`) REFERENCES `kategoriak` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

-- Dumping data for table ingatlanok.ingatlanok: ~6 rows (approximately)
INSERT INTO `ingatlanok` (`id`, `kategoriaId`, `leiras`, `hirdetesDatuma`, `tehermentes`, `ar`, `kepUrl`) VALUES
	(1, 1, 'Kertvárosi részén, egyszintes házat kínálunk nyugodt környezetben, nagy telken.', '2022-02-24', 1, 30000000, 'https://res.cloudinary.com/myblog2024/image/upload/v1738354146/houses/h1_nxj9wb.jpg'),
	(2, 1, 'Belvárosi környezetben, árnyékos helyen kis méretű családi ház eladó.', '2022-01-12', 1, 35000000, 'https://res.cloudinary.com/myblog2024/image/upload/v1738354147/houses/h3_ofo7nt.jpg'),
	(3, 1, 'Belvárosi környezetben, árnyékos helyen kis méretű családi ház eladó. Tömegközlekedéssel könnyen megközelíthető.', '2022-02-10', 1, 40000000, 'https://res.cloudinary.com/myblog2024/image/upload/v1738354148/houses/h2_fj3wlf.jpg'),
	(4, 3, 'Nagy garázs kertvárosi környezetben kiadó.', '2022-02-27', 0, 15000000, 'https://res.cloudinary.com/myblog2024/image/upload/v1738354150/houses/h4_ydvilw.jpg'),
	(5, 5, '10 hektáros mezőhazdasági terület eladó. ', '2022-01-31', 1, 5000000, 'https://res.cloudinary.com/myblog2024/image/upload/v1738354147/houses/h5_huwhrm.jpg'),
	(6, 6, 'Felújításra szoruló üzemcsarnok zöld környezetben áron alul eladó. ', '2022-01-12', 1, 15000000, 'https://res.cloudinary.com/myblog2024/image/upload/v1738354150/houses/h6_vb62no.jpg');

-- Dumping structure for table ingatlanok.kategoriak
CREATE TABLE IF NOT EXISTS `kategoriak` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nev` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

-- Dumping data for table ingatlanok.kategoriak: ~6 rows (approximately)
INSERT INTO `kategoriak` (`id`, `nev`) VALUES
	(1, 'Ház'),
	(2, 'Lakás'),
	(3, 'Garázs'),
	(4, 'Építési telek'),
	(5, 'Mezőgazdasági terület'),
	(6, 'Ipari ingatlan');
