## TET


Этап первый:
Сверстать сайт по макету.
https://www.figma.com/file/pSTOutsKqfmnKBB40HMPYY/%D0%A2%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5

К сожалению, дизайнер запарился и не скинул моб версию. Придется адаптировать самостоятельно. 
В этом задании не используем фреймворки, шаблонизаторы. 
На выходе должен быть архив со скомпилированным проектом, который наш сотрудник загрузит на сервер, чтобы посмотреть на результат вашей работы

Этап второй:
На этом сайте у пользователя есть возможность зарабатывать внутреннюю валюту за действия на сайте.
При достаточном балансе пользователь может обменять валюту на внутренние товары.
В БД сайта есть 4 таблицы:
users:
- содержит информацию о всех пользователя на сайте
products:
- содержит информацию о всех товарах на сайте
orders_users
- содержит информацию о всех ранее сделанных заказах
coins
- содержит информацию о всех монетах, заработанных пользователями

Некоторые пользователи сайта схитрили и сделали одно и тоже платное действие несколько раз. Будем оплачивать только уникальные действия.
Для разных пользователей цена одного и того же действия может быть разной, это нормально.


Задача: 
На сверстанной странице добавить поле, в котором мы сможем вводить логин пользователя и получать все его данные:
- текущий баланс
- названия товаров
- будем понимать, покупал ли пользователь товары ранее

При клике на Использовать скидку, пользователь покупает товар. Это должно отобразиться в БД

Не используйте фреймворки. Важно посмотреть ваш нативный код
На выходе должен быть архив со скомпилированным проектом, который наш сотрудник загрузит на сервер, чтобы посмотреть на результат вашей работы





-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Авг 19 2022 г., 17:48
-- Версия сервера: 5.7.27-30-log
-- Версия PHP: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `mburnaevg4_fulls`
--

-- --------------------------------------------------------

--
-- Структура таблицы `coins`
--

CREATE TABLE `coins` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `action` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `coins`
--

INSERT INTO `coins` (`id`, `user_id`, `price`, `action`) VALUES
(1, 1, 1, 'ach1'),
(2, 1, 12, 'ach2'),
(3, 1, 3, 'ach3'),
(4, 1, 3, 'ach3'),
(5, 2, 12, 'ach132'),
(6, 2, 5, 'ach2'),
(7, 2, 12, 'ach132'),
(8, 2, 20, 'ach3'),
(9, 2, 12, 'ach132'),
(10, 2, 20, 'ach3'),
(11, 3, 1, 'ach5'),
(12, 3, 2, 'ach6'),
(13, 3, 3, 'ach7'),
(14, 3, 1, 'ach3'),
(15, 3, 2, 'ach132'),
(16, 3, 1, 'ach3'),
(17, 3, 5, 'ach1'),
(18, 3, 20, 'ach2'),
(19, 3, 1, 'ach3'),
(20, 3, 1, 'ach3'),
(21, 1, 2, 'ach7'),
(22, 1, 3, 'ach8'),
(23, 1, 4, 'ach9'),
(24, 4, 1, 'ach3x'),
(25, 4, 2, 'ach1'),
(26, 4, 1, 'ach3x'),
(27, 4, 2, 'ach5'),
(28, 4, 1, 'ach3'),
(29, 4, 2, 'ach4'),
(30, 4, 1, 'ach3'),
(31, 5, 100, 'ach1'),
(32, 5, 100, 'ach1');

-- --------------------------------------------------------

--
-- Структура таблицы `orders_users`
--

CREATE TABLE `orders_users` (
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `orders_users`
--

INSERT INTO `orders_users` (`product_id`, `user_id`) VALUES
(1, 2),
(2, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`id`, `description`, `price`) VALUES
(1, '50% на звонки ST', 5),
(2, '30% за спецкурс', 10),
(3, '50% за курс', 20),
(4, '65% за курс', 25);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `login` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `login`, `pass`) VALUES
(1, 'test1', 'test1', '$2y$10$R7wJNoXd5ogmEVFJ2J6oUukjH4sTMX.nFJGgpCFWDjyE0Jk8gwdpC'),
(2, 'test2', 'test2', '$2y$10$Ak/Da9HEqL.EuWYwDj/67.0LRsbOeRR2q1kA2ZStTvkZ0FDmJx9Wy'),
(3, 'mike', 'user', '$2y$10$2Q4qmlBweqZPpy6nGePteuOcITukI7ESCfPYSN1dFVbTBK2fBpIGC'),
(4, 'test1mike', 'test1m', '$2y$10$vhBYb/qm07ROc0vUr4ndnObga1oEKC7RDsBGisZDwgBtKfJH7h/kC'),
(5, 'mtest2', '2test2', '$2y$10$xbdxtF4NVNYVp74.Jb87r.GMX/lrk26p6qLbOte73DYay1/AKWRXu');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `coins`
--
ALTER TABLE `coins`
  ADD PRIMARY KEY (`id`),
  ADD KEY `coins_users_id_fk` (`user_id`);

--
-- Индексы таблицы `orders_users`
--
ALTER TABLE `orders_users`
  ADD PRIMARY KEY (`product_id`,`user_id`),
  ADD KEY `orders_users_users_id_fk` (`user_id`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `coins`
--
ALTER TABLE `coins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `coins`
--
ALTER TABLE `coins`
  ADD CONSTRAINT `coins_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `orders_users`
--
ALTER TABLE `orders_users`
  ADD CONSTRAINT `orders_users_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `orders_users_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
