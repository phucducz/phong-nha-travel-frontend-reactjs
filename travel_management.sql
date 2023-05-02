-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 30, 2023 at 11:45 AM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `travel_management`
--

DELIMITER $$
--
-- Procedures
--
DROP PROCEDURE IF EXISTS `sp_insertBookDetails`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insertBookDetails` (`name_company` VARCHAR(50), `country` VARCHAR(50), `zip_code` VARCHAR(50), `city` VARCHAR(50), `note` VARCHAR(1000), `payment_method_id` INT, `schedule_detail_id` INT, `name` VARCHAR(50), `surname` VARCHAR(50), `address` VARCHAR(50), `apartment` VARCHAR(50), `number_phone` VARCHAR(50), `email_address` VARCHAR(50))   BEGIN

    DECLARE booked_tour_id_current int;
    SELECT ID INTO booked_tour_id_current FROM booked_tours ORDER BY ID DESC LIMIT 1;

    INSERT INTO `booke_details`(`booked_tour_id`, `name_company`, `country`, `zip_code`, `city`, `note`, `payment_method_id`, `schedule_detail_id`, `name`, `surname`, `address`, `apartment`, `number_phone`, `email_address`) VALUES (booked_tour_id_current, name_company, country, zip_code, city, note, payment_method_id, schedule_detail_id, name, surname, address, apartment, number_phone, email_address);
    
END$$

DROP PROCEDURE IF EXISTS `sp_insertBookedTours`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insertBookedTours` (IN `tour_id` INT, `booked_date` DATETIME, `user_id` INT)   BEGIN
	INSERT INTO booked_tours(tour_id, booked_date, user_id) VALUES (tour_id, booked_date, user_id);
END$$

DROP PROCEDURE IF EXISTS `sp_searchTour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_searchTour` (`tourName` VARCHAR(50))   BEGIN
    SELECT
        tr.id,
        tr.name,
        tr.description,
        p.price_adult AS price,
        t.title AS title,
        i.image AS image,
        t.id AS topicId
    FROM
        prices AS p,
        topics AS t,
        images AS i,
        tours AS tr
    WHERE
        tr.name LIKE CONCAT('%', tourName, '%') AND tr.price_id = p.id AND tr.topic_id = t.id AND i.tour_id = tr.id ;
END$$

DROP PROCEDURE IF EXISTS `sp_selectTour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_selectTour` ()   BEGIN
    SELECT
        tr.id,
        tr.name,
        tr.description,
        p.price_adult AS price,
        t.title AS title,
        i.image AS image,
        t.id AS topicId
    FROM
        prices AS p,
        topics AS t,
        images AS i,
        tours AS tr
    WHERE
        tr.price_id = p.id AND tr.topic_id = t.id AND i.tour_id = tr.id ;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `booked_tours`
--

DROP TABLE IF EXISTS `booked_tours`;
CREATE TABLE IF NOT EXISTS `booked_tours` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tour_id` int NOT NULL,
  `booked_date` datetime NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_booked_users` (`user_id`),
  KEY `fk_booked_tours` (`tour_id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `booked_tours`
--

INSERT INTO `booked_tours` (`id`, `tour_id`, `booked_date`, `user_id`) VALUES
(79, 2, '2023-03-31 00:00:00', 1),
(80, 1, '2023-03-31 00:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `booke_details`
--

DROP TABLE IF EXISTS `booke_details`;
CREATE TABLE IF NOT EXISTS `booke_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `booked_tour_id` int NOT NULL,
  `name_company` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `zip_code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `note` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_method_id` int NOT NULL,
  `schedule_detail_id` int NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `surname` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apartment` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `number_phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_address` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_bookDetails_scheduleDetails` (`schedule_detail_id`),
  KEY `fk_bookeDetails_BookedTour` (`booked_tour_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `booke_details`
--

INSERT INTO `booke_details` (`id`, `booked_tour_id`, `name_company`, `country`, `zip_code`, `city`, `note`, `payment_method_id`, `schedule_detail_id`, `name`, `surname`, `address`, `apartment`, `number_phone`, `email_address`) VALUES
(32, 79, 'F8 Ofical', 'Việt Nam', 'TPSĐ21000148', 'Đồng Tháp', 'admin testing...', 1, 1, 'Phúc Đức', 'Dương Vĩnh', 'TP. Sa Đéc', '192/5, Khóm 4, Phường 1, TP. Sa Đéc', '0763700336', 'admin1005@gmail.com'),
(33, 80, 'F8 Ofical', 'Việt Nam', 'TPSĐ21000148', 'Đồng Tháp', 'testing...', 2, 1, 'Phúc Đức', 'Dương Vĩnh', 'lý thường kiệt, khóm 4, phường 1, tp sa đéc', '192/5, Khóm 4, Phường 1, TP. Sa Đéc', '0763700336', 'admin1005@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
CREATE TABLE IF NOT EXISTS `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` blob NOT NULL,
  `tour_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_images_tours` (`tour_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `image`, `tour_id`) VALUES
(1, 0x2e2e2f696d616765732f70686f6e672d6e68612d6b652d62616e672d7061726b2d323532783231322e6a7067, 1),
(2, 0x2e2e2f696d616765732f686f69616e2d373230783630362e6a7067, 2),
(3, 0x2e2e2f696d616765732f73756f692d6d6f6f632d7175616e672d62696e682d342d373230783630362e6a7067, 3),
(4, 0x2e2e2f696d616765732f616e682d6361752d6869656e2d6c756f6e672d3031342e6a7067, 4),
(5, 0x2e2e2f696d616765732f32303139303530325f3139353331332d322d353331783335342e6a7067, 5);

-- --------------------------------------------------------

--
-- Table structure for table `payment_methods`
--

DROP TABLE IF EXISTS `payment_methods`;
CREATE TABLE IF NOT EXISTS `payment_methods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payment_methods`
--

INSERT INTO `payment_methods` (`id`, `name`) VALUES
(1, 'Thanh toán trực tuyến'),
(2, 'Thanh toán trực tiếp');

-- --------------------------------------------------------

--
-- Table structure for table `prices`
--

DROP TABLE IF EXISTS `prices`;
CREATE TABLE IF NOT EXISTS `prices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `price_adult` float NOT NULL,
  `price_children` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `prices`
--

INSERT INTO `prices` (`id`, `price_adult`, `price_children`) VALUES
(1, 1150000, 1035000),
(2, 4800000, 4320000),
(3, 12500000, 11250000),
(4, 750000, 675000);

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

DROP TABLE IF EXISTS `schedules`;
CREATE TABLE IF NOT EXISTS `schedules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `start` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `middle` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `end` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `schedules`
--

INSERT INTO `schedules` (`id`, `start`, `middle`, `end`) VALUES
(1, 'chưa biết', 'chưa biết', 'chưa biết');

-- --------------------------------------------------------

--
-- Table structure for table `schedule_details`
--

DROP TABLE IF EXISTS `schedule_details`;
CREATE TABLE IF NOT EXISTS `schedule_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tour_id` int NOT NULL,
  `schedule_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_scheduleDetails_tours` (`tour_id`),
  KEY `fk_scheduleDetails_schedules` (`schedule_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `schedule_details`
--

INSERT INTO `schedule_details` (`id`, `tour_id`, `schedule_id`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `topics`
--

DROP TABLE IF EXISTS `topics`;
CREATE TABLE IF NOT EXISTS `topics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `topics`
--

INSERT INTO `topics` (`id`, `title`) VALUES
(1, 'Tour Quảng Bình nổi bật'),
(2, 'Tuor hằng ngày'),
(3, 'Tour đang ưu đãi');

-- --------------------------------------------------------

--
-- Table structure for table `tours`
--

DROP TABLE IF EXISTS `tours`;
CREATE TABLE IF NOT EXISTS `tours` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_id` int NOT NULL,
  `topic_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tours_prices` (`price_id`),
  KEY `fk_tours_topic` (`topic_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tours`
--

INSERT INTO `tours` (`id`, `name`, `description`, `price_id`, `topic_id`) VALUES
(1, 'TOUR ĐỘNG PHONG NHA – ĐỘNG THIÊN ĐƯỜNG', 'TOUR ĐỘNG PHONG NHA – ĐỘNG THIÊN ĐƯỜNG là chương trình tham quan Vườn quốc gia Phong Nha Kẻ Bàng của Quảng Bình nổi tiếng với những hang động tuyệt đẹp và hệ động thực vật đa dạng phong phú, bạn hãy đặt tour du lịch TOUR ĐỘNG PHONG NHA – ĐỘNG THIÊN ĐƯỜNG  để tận mắt ngắm nhìn tuyệt tác của thiên nhiên này vì “trăm nghe không bằng một thấy”. TOUR ĐỘNG PHONG NHA – ĐỘNG THIÊN ĐƯỜNG 1 Ngày cùng Phong Nha Travel sẽ đem đến cho quý khách những giây phút thư giản thoải mái hòa mình vào thiên nhiên cùng núi rừng Phong nha – Kẽ bàng. Với hơn 300 hang động lớn nhỏ Phong Nha – Kẻ Bàng được ví như một bảo tàng địa chất khổng lồ, chứa đựng lịch sử hơn 400 triệu năm trước của trái đất. Đặc điểm nổi bật ở đây là hệ thống sông ngầm trong hang động trong lòng núi đá vôi.Phong Nha với vẻ đẹp hoang sơ nhưng vô cùng kỳ vỹ làm say đắm lòng người.', 1, 1),
(2, 'Tour Đà Nẵng Hội An-Hội AN-Huế-Quảng Bình 5 ngày 4', 'Tour Đà Nẵng Hội An-Hội AN-Huế-Quảng Bình 5 ngày 4 đêm. là chương trình Chọn lọc tham quan các điểm đến hấp dẫn trong 4 tỉnh Miền Trung: Đà Nẵng – Hội An – Huế – Quảng Bình. Miền trung không chỉ sỡ hữu nhiều điểm đến hấp dẫn là những di sản văn hóa thế giới cùng các bãi tắm, vịnh biển đẹp là những điều kiện làm nên chuỗi sản phẩm du lịch Miền Trung thu hút du khách từ khắp mọi nơi.Tour Đà Nẵng Hội An-Hội AN-Huế-Quảng Bình 5 ngày 4 đêm. mở đầu với Quảng Bình được mệnh danh là “Vương Quốc Hang Động” khám phá Động Thiên Đường và Động Phong Nha, tham quan Vĩ Tuyến 17 “nhân chứng lịch sử” chia cắt đất Việt suốt 21 năm, đến Cố đô Huế với các điểm đến chọn lọc cùng thưởng thức những làn điệu Ca Huế trên dòng sông Hương thơ mộng, thăm Vịnh Lăng Cô, chinh phục đỉnh Bà Nà – Núi Chúa, khám phá triền núi Đông Nam Bán Đảo Sơn Trà. Chương trình được chúng tôi chọn lọc kỹ lưỡng cùng các dịch vụ tốt nhất chắc chắn sẽ làm bạn hài lòng.', 2, 1),
(3, 'Tour Động Động Thiên Đường Suối Nước Moọc', 'Để khám phá thiên nhiên hoang sơ hùng vĩ của Vườn quốc gia Phong Nha Kẻ Bàng một trong những vùng đá vôi nhiệt đới cổ đại nhất, rộng lớn nhất thế giới quý khách hãy đặt Tour du lịch Quảng Bình 1 ngày tham quan Động Thiên Đường Suối Nước Moọc vô cùng hấp dẫn.Tham gia tour Phong Nha Kẻ Bàng tham quan Động Thiên Đường Suối Nước Moọc 1 ngày khởi hành hàng ngày sẽ đưa du khách tìm hiểu sự đa dạng và quý hiếm của động thực vật, nhìn tận mắt những loại động vật thuộc danh mục sách đỏ của Việt Nam và thế giới hay chiêm nhưỡng kệt tác thạch nhủ trong động Thiên Đường, tận hưởng những giây phút thư giản thoải mái khi đắm mình trong dòng nước mát tại Suối Nước Moọc.', 3, 1),
(4, 'TOUR ĐỒNG HỚI – NTLS TRƯỜNG SƠN – THÀNH CỔ – CẦU H', 'Tour thăm lại chiến trường xưa ở Quảng Trị. Một trong những địa danh ác liệt nhất trong chiến tranh Việt Nam. Những di tích lịch sử Quốc Gia đặc biệt trong khu vực phi quân sự DMZ.Hãy đặt TOUR ĐỒNG HỚI – NTLS TRƯỜNG SƠN – THÀNH CỔ – CẦU HIỀN LƯƠNG ngay hôm nay. Để hưởng dịch vụ tốt nhất.', 3, 1),
(5, 'Tour Công viên OZo – bãi biển đá nhãy 1 ngày', 'Tour Công viên OZo – bãi biển đá nhãy 1 ngày. Là chương trình du lịch Quảng Bình khởi hành hàng ngày, du khách sẽ có dịp trải nghiệm cuộc sống của cư dân bản địa, thưởng ngoạn bức tranh sơn thủy hữu tình của Vườn quốc gia Phong Nha Kẻ Bàng.Được ngâm mình trong làn suối trong mát, trãi nghiệm trò chơi trên dây, Đám mình trong làn nước mát của bãi tắm đá nhảy.Du khách bỏ ra chí phí thấp được hưởng dịch vụ tốt nhất Bên cạnh đó sẽ có những người bạn cùng sở thích đồng hành cùng quý khách.hãy đặt Tour Công viên OZo – bãi biển đá nhãy 1 ngày ngay hôm nay.', 4, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `phone_number`) VALUES
(1, 'admin', '1005', 'admin1005@gmail.com', '0763700336');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booked_tours`
--
ALTER TABLE `booked_tours`
  ADD CONSTRAINT `fk_booked_tours` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`),
  ADD CONSTRAINT `fk_booked_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `booke_details`
--
ALTER TABLE `booke_details`
  ADD CONSTRAINT `fk_bookDetails_scheduleDetails` FOREIGN KEY (`schedule_detail_id`) REFERENCES `schedule_details` (`id`),
  ADD CONSTRAINT `fk_bookeDetails_BookedTour` FOREIGN KEY (`booked_tour_id`) REFERENCES `booked_tours` (`id`);

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `fk_images_tours` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`);

--
-- Constraints for table `schedule_details`
--
ALTER TABLE `schedule_details`
  ADD CONSTRAINT `fk_scheduleDetails_schedules` FOREIGN KEY (`schedule_id`) REFERENCES `schedules` (`id`),
  ADD CONSTRAINT `fk_scheduleDetails_tours` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`);

--
-- Constraints for table `tours`
--
ALTER TABLE `tours`
  ADD CONSTRAINT `fk_tours_prices` FOREIGN KEY (`price_id`) REFERENCES `prices` (`id`),
  ADD CONSTRAINT `fk_tours_topic` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
