-- Database
CREATE TABLE `User`
(
  `id`                INT(11) NOT NULL auto_increment ,
  `name`              VARCHAR(255) NOT NULL ,
  `username`          VARCHAR(255) NOT NULL ,
  `email`             VARCHAR(255) NOT NULL ,
  `phone`             VARCHAR(255) NOT NULL ,
  `website`           VARCHAR(255) NOT NULL ,
  `created_at`        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `updated_at`        DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`)
)
engine = innodb charset=utf8mb4 COLLATE utf8mb4_general_ci;


CREATE TABLE `Address`
(
  `id`                INT(11) NOT NULL ,
  `street`            VARCHAR(255) NOT NULL ,
  `suite`             VARCHAR(255) NOT NULL ,
  `city`              VARCHAR(255) NOT NULL ,
  `zipcode`           VARCHAR(255) NOT NULL ,
  `country`           VARCHAR(255) NOT NULL ,
  `geo_lat`           VARCHAR(255) NOT NULL ,
  `geo_lng`           VARCHAR(255) NOT NULL ,
  `created_at`        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `updated_at`        DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`)
)
engine = innodb charset=utf8mb4 COLLATE utf8mb4_general_ci;


CREATE TABLE `Post`
(
  `id`                INT(11) NOT NULL auto_increment ,
  `userId`            INT(11) NOT NULL ,
  `title`             VARCHAR(255) NOT NULL ,
  `body`              VARCHAR(255) NOT NULL ,
  `created_at`        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `updated_at`        DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`)
)
engine = innodb charset=utf8mb4 COLLATE utf8mb4_general_ci;


CREATE TABLE `Comment`
(
  `id`                INT(11) NOT NULL auto_increment ,
  `postId`            INT(11) NOT NULL ,
  `email`             VARCHAR(255) NOT NULL ,
  `name`             VARCHAR(255) NOT NULL ,
  `body`              VARCHAR(255) NOT NULL ,
  `created_at`        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `updated_at`        DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`)
)
engine = innodb charset=utf8mb4 COLLATE utf8mb4_general_ci;


CREATE TABLE `Todo`
(
  `id`                INT(11) NOT NULL auto_increment ,
  `userId`            INT(11) NOT NULL ,
  `title`             VARCHAR(255) NOT NULL ,
  `completed`         BOOLEAN NULL ,
  `created_at`        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `updated_at`        DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`)
)
engine = innodb charset=utf8mb4 COLLATE utf8mb4_general_ci;




-- Values
INSERT INTO User(id, name, username, email, address, phone, website) 
VALUES
(1, "Leanne Graham", "Bret", "Sincere@april.biz", 1, "1-770-736-8031 x56442", "hildegard.org"),
(2, "Ervin Howell", "Antonette", "Shanna@melissa.tv", 2, "010-692-6593 x09125", "anastasia.net"),
(3, "Clementine Bauch", "Samantha", "Nathan@yesenia.net", 3, "1-463-123-4447", "ramiro.info"),
(4, "Patricia Lebsack", "Karianne", "Julianne.OConner@kory.org", 4, "493-170-9623 x156", "kale.biz"),
(5, "Chelsey Dietrich", "Kamren", "Lucio_Hettinger@annie.ca", 5, "(254)954-1289", "demarco.info"),
(6, "Mrs. Dennis Schulist", "Leopoldo_Corkery", "Karley_Dach@jasper.info", 6, "1-477-935-8478 x6430", "ola.org"),
(7, "Kurtis Weissnat", "Elwyn.Skiles", "Telly.Hoeger@billy.biz", 7, "210.067.6132", "elvis.io"),
(8, "Nicholas Runolfsdottir V", "Maxime_Nienow", "Sherwood@rosamond.me", 8, "586.493.6943 x140", "jacynthe.com"),
(9, "Glenna Reichert", "Delphine", "Chaim_McDermott@dana.io", 9, "(775)976-6794 x41206", "conrad.com"),
(0, "Clementina DuBuque", "Moriah.Stanton", "Rey.Padberg@karina.biz", 10, "024-648-3804", "ambrose.net");


INSERT INTO Address(id, street, suite, city, zipcode, geo_lat, geo_lng, country) 
VALUES
(1, "Kulas Light", "Apt. 556", "Gwenborough", "92998-3874", "-37.3159", "81.1496", "United States"),
(2, "Victor Plains", "Suite 879", "Wisokyburgh", "90566-7771", "-43.9509",  "-34.4618", "United States"),
(3, "Douglas Extension", "Suite 847", "McKenziehaven", "59590-4157", "-68.6102",  "-47.0653", "United States"),
(4, "Hoeger Mall", "Apt. 692", "South Elvis", "53919-4257", "29.4572",  "-164.2990", "United States"),
(5, "Skiles Walks", "Suite 351", "Roscoeview", "33263", "-31.8129", "62.5342", "United States"),
(6, "Norberto Crossing", "Apt. 950", "South Christy", "23505-1337", "-71.4197", "71.7478", "United States"),
(7, "Rex Trail", "Suite 280", "Howemouth", "58804-1099", "24.8918", "21.8984", "United States"),
(8, "Ellsworth Summit", "Suite 729", "Aliyaview", "45169", "-14.3990",  "-120.7677", "United States"),
(9, "Dayna Park", "Suite 449", "Bartholomebury", "76495-3109", "24.6463",  "-168.8889", "United States"),
(10, "Kattie Turnpike", "Suite 198", "Lebsackbury", "31428-2261", "-38.2386", "57.2232", "United States");


INSERT INTO Todo(id, userId, title, completed) 
VALUES
(1, 1, "delectus aut autem", false),
(2, 1, "quis ut nam facilis et officia qui", false),
(3, 1, "fugiat veniam minus", false),
(4, 1, "et porro tempora", true),
(5, 1, "laboriosam mollitia et enim quasi adipisci quia provident illum", false),
(6, 1, "qui ullam ratione quibusdam voluptatem quia omnis", false),
(7, 1, "illo expedita consequatur quia in", false),
(8, 1, "quo adipisci enim quam ut ab", true),
(9, 1, "molestiae perspiciatis ipsa", false),
(10, 1, "illo est ratione doloremque quia maiores aut", true);


INSERT INTO Post(id, userId, title, body) 
VALUES
(1, 1, "sunt aut facere repellat provident occaecati excepturi optio reprehenderit", "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"),
(2, 1, "qui est esse", "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"),
(3, 1, "ea molestias quasi exercitationem repellat qui ipsa sit aut", "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"),
(4, 1, "eum et est occaecati", "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"),
(5, 1, "nesciunt quas odio", "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"),
(6, 1, "dolorem eum magni eos aperiam quia", "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae"),
(7, 1, "magnam facilis autem", "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas"),
(8, 1, "dolorem dolore est ipsam", "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae"),
(9, 1, "nesciunt iure omnis dolorem tempora et accusantium", "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas"),
(10, 1, "optio molestias id quia eum", "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error");


INSERT INTO Comment(id, postId, name, email, body) 
VALUES
(1, 1, "id labore ex et quam laborum", "Eliseo@gardner.biz", "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"),
(2, 1, "quo vero reiciendis velit similique earum", "Jayne_Kuhic@sydney.com", "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"),
(3, 1, "odio adipisci rerum aut animi", "Nikita@garfield.biz", "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione"),
(4, 1, "alias odio sit", "Lew@alysha.tv", "non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati"),
(5, 1, "vero eaque aliquid doloribus et culpa", "Hayden@althea.biz", "harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et"),
(6, 2, "et fugit eligendi deleniti quidem qui sint nihil autem", "Presley.Mueller@myrl.com", "doloribus at sed quis culpa deserunt consectetur qui praesentium\naccusamus fugiat dicta\nvoluptatem rerum ut voluptate autem\nvoluptatem repellendus aspernatur dolorem in"),
(7, 2, "repellat consequatur praesentium vel minus molestias voluptatum", "Dallas@ole.me", "maiores sed dolores similique labore et inventore et\nquasi temporibus esse sunt id et\neos voluptatem aliquam\naliquid ratione corporis molestiae mollitia quia et magnam dolor"),
(8, 2, "et omnis dolorem", "Mallory_Kunze@marie.org", "ut voluptatem corrupti velit\nad voluptatem maiores\net nisi velit vero accusamus maiores\nvoluptates quia aliquid ullam eaque"),
(9, 2, "provident id voluptas", "Meghan_Littel@rene.us", "sapiente assumenda molestiae atque\nadipisci laborum distinctio aperiam et ab ut omnis\net occaecati aspernatur odit sit rem expedita\nquas enim ipsam minus"),
(10, 2, "eaque et deleniti atque tenetur ut quo ut", "Carmen_Keeling@caroline.name", "voluptate iusto quis nobis reprehenderit ipsum amet nulla\nquia quas dolores velit et non\naut quia necessitatibus\nnostrum quaerat nulla et accusamus nisi facilis");


CREATE USER 'remoteAdmin'@'localhost' IDENTIFIED BY 'admin';
GRANT ALL PRIVILEGES ON * . * TO 'remoteAdmin'@'localhost'; -- Don't do this in production
FLUSH PRIVILEGES;