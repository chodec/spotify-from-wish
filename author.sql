-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 04, 2017 at 05:21 PM
-- Server version: 5.7.11
-- PHP Version: 7.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `api`
--

-- --------------------------------------------------------

--
-- Table structure for table `author`
--

CREATE TABLE `author` (
  `id` int(40) NOT NULL,
  `name` varchar(40) COLLATE utf8_czech_ci NOT NULL,
  `real_name` varchar(40) COLLATE utf8_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Dumping data for table `author`
--

INSERT INTO `author` (`id`, `name`, `real_name`) VALUES
(1, 'tfk', 'Thousand foot krutch'),
(2, 'tdg', 'Three days Grace'),
(3, 'disturbed', 'Disturbed'),
(4, 'apocalyptica', 'Apocalyptica');

-- --------------------------------------------------------

--
-- Table structure for table `songs`
--

CREATE TABLE `songs` (
  `id_song` int(20) NOT NULL,
  `name` varchar(20) COLLATE utf8_czech_ci NOT NULL,
  `real_name` varchar(40) COLLATE utf8_czech_ci NOT NULL,
  `author` varchar(20) COLLATE utf8_czech_ci NOT NULL,
  `real_author` varchar(40) COLLATE utf8_czech_ci NOT NULL,
  `id_author` int(44) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Dumping data for table `songs`
--

INSERT INTO `songs` (`id_song`, `name`, `real_name`, `author`, `real_author`, `id_author`) VALUES
(1, 'absolute', 'Absolute', 'tfk', 'Thousand foot krutch', 1),
(2, 'riot', 'Riot', 'tdg', 'Three days Grace', 2),
(3, 'hand_granade', 'Hand Granade', 'tfk', 'Thousand foot krutch', 1),
(4, 'warrior', 'Warrior', 'disturbed', 'Disturbed', 3),
(5, 'im_not_jesus', 'I\'m not Jesus', 'apocalyptica', 'Apocalyptica', 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`id_song`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
