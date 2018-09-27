create database if not exists `nodejs-course`;
use `nodejs-course`;


create table users
(
	id int not null auto_increment
		primary key,
	username varchar(100) default '' not null,
	email varchar(100) default '' not null,
	password varchar(100) default '' not null,
	created_at timestamp default CURRENT_TIMESTAMP null
)
;


create table orders
(
	id int not null auto_increment
		primary key,
	total decimal(10,2) not null,
	created_at timestamp default CURRENT_TIMESTAMP not null,
	intent varchar(10) default 'sale' null,
	status varchar(10) default 'approved' not null,
	paypal_transaction varchar(30) not null
)
;


create table order_detail
(
	id int not null auto_increment
		primary key,
	order_id int null,
	product_id int not null,
	qty mediumint null,
	constraint order_detail_orders_id_fk
		foreign key (order_id) references orders (id),
	constraint order_detail_products_id_fk
		foreign key (product_id) references products (id)
)
;

create index order_detail_orders_id_fk
	on order_detail (order_id)
;

create index order_detail_products_id_fk
	on order_detail (product_id)
;


create table products
(
	id int not null auto_increment
		primary key,
	name varchar(100) not null,
	picture varchar(100) default 'default.png' not null,
	price decimal(10,2) not null,
	description text null,
	constraint products_name_uindex
		unique (name)
)
;

INSERT INTO `nodejs-course`.products (name, picture, price, description) VALUES ('iphone4', 'iphone4.png', 100.00, 'El iPhone 4 pesa 137 g y tiene un grosor de 9.30 mm, mientras que mide 115.20 mm de alto y 58.60 mm de ancho.');
INSERT INTO `nodejs-course`.products (name, picture, price, description) VALUES ('iphone5', 'iphone5.png', 200.00, 'El iPhone 5 lleva equipado la primera pantalla Retina con tecnología táctil incorporada. Con ello se consigue más píxeles, una mejor calidad del color y una pantalla de 4 pulgadas más delgada con una resolución de 1136 x 640 píxeles.');
INSERT INTO `nodejs-course`.products (name, picture, price, description) VALUES ('iphone6', 'iphone6.png', 400.00, 'El iPhone 6 tiene un tamaño de pantalla de 4.7 pulgadas, con una resolución de 1334 x 750. La pantalla es de tipo IPS. Tiene una densidad de píxeles de 326 ppp. Además, con la protección Recubrimiento oleofóbico te aseguras resistencia frente a arañazos y golpes.');
INSERT INTO `nodejs-course`.products (name, picture, price, description) VALUES ('iphone7', 'iphone7.png', 800.00, 'El iPhone 7 Plus cuenta con una doble cámara. Una de las lentes es gran angular con una apertura de ƒ/1.8 y la otra teleobjetivo con una apertura de ƒ/2.8, lo que le permite al iPhone tomar fotografías con un zoom óptico de 2x y zoom digital hasta de 10x y fotos con profundidad de campo. Ambas cámaras cuentan con 12 megapíxeles y grabación 4K.');
INSERT INTO `nodejs-course`.products (name, picture, price, description) VALUES ('iMac21.5', 'imac21.png', 1400.00, 'Pantalla de 21,5 pulgadas (en diagonal) retroiluminada por LED con tecnología IPS; resolución de 1.920 por 1.080 compatible con millones de colores');
INSERT INTO `nodejs-course`.products (name, picture, price, description) VALUES ('imac27', 'imac27.png', 3500.00, 'Pantalla Retina 5K de 27 pulgadas (en diagonal) con tecnología IPS; resolución de 5.120 por 2.880 compatible con millones de colores');
INSERT INTO `nodejs-course`.products (name, picture, price, description) VALUES ('iPad Air', 'ipad.png', 500.00, 'La pantalla del Apple iPad Air tiene un tamaño de 9.7 pulgadas y cuenta con una resolución de 2048 X 1536. Hablamos de una pantalla IPS. Está protegida de arañazos y golpes mediante una capa recubrimiento oleofóbico. La densidad de píxeles, que se mide en puntos por pulgada, es de 264 ppp.');
INSERT INTO `nodejs-course`.products (name, picture, price, description) VALUES ('MacBook Pro', 'macbook-pro.png', 2000.00, 'Pantalla retroiluminada por LED de 13,3 pulgadas (en diagonal) con tecnología IPS; resolución nativa de 2.560 por 1.600 a 227 píxeles por pulgada compatible con millones de colores');
INSERT INTO `nodejs-course`.products (name, picture, price, description) VALUES ('MacBook Air', 'macbook-air.png', 1400.00, 'Intel Core i5 de doble núcleo a 1,6 GHz (Turbo Boost de hasta 2,7 GHz) con 3 MB de caché de nivel 3 compartida Opción de configuración con Intel Core i7 de doble núcleo a 2,2 GHz (Turbo Boost de hasta 3,2 GHz) y 4 MB de caché de nivel 3 compartida');

create table places
(
	id int not null auto_increment
		primary key,
	name varchar(60) not null,
	address varchar(80) not null,
	lat float(10,6) not null,
	lng float(10,6) not null,
	type varchar(100) not null,
	description text not null
)
;

INSERT INTO `nodejs-course`.places (name, address, lat, lng, type, description) VALUES ('Marisquería Balmes', 'Carrer de Balmes, 413, 08022 Barcelona, España', 41.407413, 2.138107, '1', 'Marisquería Balmes');
INSERT INTO `nodejs-course`.places (name, address, lat, lng, type, description) VALUES ('Brasería Balmes', 'Carrer de Balmes, 450, 08022 Barcelona, España', 41.40897, 2.137681, '1', 'Brasería Balmes');
INSERT INTO `nodejs-course`.places (name, address, lat, lng, type, description) VALUES ('Diagonal Calzados', 'Avinguda Diagonal, 20, 08019 Barcelona, España', 41.411083, 2.216314, '2', 'Diagonal Calzados');
INSERT INTO `nodejs-course`.places (name, address, lat, lng, type, description) VALUES ('Diagonal Mar McDonalds', '08019 Barcelona, España', 41.410282, 2.218309, '3', 'Diagonal Mar McDonalds');
INSERT INTO `nodejs-course`.places (name, address, lat, lng, type, description) VALUES ('Calzados unidos tarragona', 'Carrer del Vent, 25, 43201 Reus, Tarragona, España', 41.153255, 1.106032, '2', 'Calzados unidos tarragona');
INSERT INTO `nodejs-course`.places (name, address, lat, lng, type, description) VALUES ('Gym Barcelona', 'Carrer de València, 437, 08013 Barcelona, España', 41.402546, 2.176247, '4', 'Gym Barcelona');
INSERT INTO `nodejs-course`.places (name, address, lat, lng, type, description) VALUES ('Restaurante carrefour', 'Carrer de la Creu 30, 17002 Gerona, Girona, España', 41.975796, 2.821335, '1', 'Restaurante carrefour');
INSERT INTO `nodejs-course`.places (name, address, lat, lng, type, description) VALUES ('Restaurante tres cantos Madrid', '28760 Tres Cantos, Madrid, España', 40.608307, -3.714286, '1', 'Restaurante tres cantos Madrid');
INSERT INTO `nodejs-course`.places (name, address, lat, lng, type, description) VALUES ('Consultoría Doña Berenguela', 'Calle de Dona Berenguela, 3, 09005 Burgos, España', 42.35033, -3.695281, '6', 'Consultoría Doña Berenguela');
INSERT INTO `nodejs-course`.places (name, address, lat, lng, type, description) VALUES ('Bcn Bit Sistemas y Gestión', 'Ctra. Molins de Rei, 79, 08191 Rubí, Barcelona, España', 41.475204, 2.031222, '6', 'Bcn Bit Sistemas y Gestión');
INSERT INTO `nodejs-course`.places (name, address, lat, lng, type, description) VALUES ('PcComponentes', 'Calle de Cavanilles, 35, 28007 Madrid, España', 40.40539, -3.674189, '6', 'PcComponentes');
INSERT INTO `nodejs-course`.places (name, address, lat, lng, type, description) VALUES ('Deportes Moya Madrid', 'Av. del Mediterráneo, 26, 28007 Madrid, España', 40.40679, -3.673741, '5', 'Deportes Moya');
INSERT INTO `nodejs-course`.places (name, address, lat, lng, type, description) VALUES ('Deportes Halcón Madrid', 'Calle del Dr. Urquiola, 6, 28025 Madrid, España', 40.387684, -3.743064, '5', 'Deportes Halcón');
INSERT INTO `nodejs-course`.places (name, address, lat, lng, type, description) VALUES ('Sport BCN', 'Carrer de la Llacuna, 47, 08005 Barcelona, España', 41.40012, 2.200034, '5', 'Sport');
INSERT INTO `nodejs-course`.places (name, address, lat, lng, type, description) VALUES ('Gym Fitness Bcn', 'Carrer de Mallorca, 318, 08037 Barcelona, España', 41.397907, 2.168149, '4', 'Gym Fitness Bcn');
INSERT INTO `nodejs-course`.places (name, address, lat, lng, type, description) VALUES ('Restaurante Boca Grande Bcn', 'Passatge de la Concepció, 12, 08008 Barcelona, España', 41.394512, 2.159855, '1', 'Restaurante Boca Grande');
INSERT INTO `nodejs-course`.places (name, address, lat, lng, type, description) VALUES ('Gym Carrefour Paterna', 'C.C. Carrefour Paterna, Urb. Norte, s/n, 46980 Paterna, Valencia, España', 39.515144, -0.440725, '4', 'Gym Paterna');
INSERT INTO `nodejs-course`.places (name, address, lat, lng, type, description) VALUES ('Viajes Bilbao Express', 'Máximo Aguirre, 18 Bis - 6º Dpto 7, 48011 Bilbao, Vizcaya, España', 43.263058, -2.938369, '4', 'Gym Bilbao Express');
INSERT INTO `nodejs-course`.places (name, address, lat, lng, type, description) VALUES ('Calzados Calenda Córdoba', 'Calle Manuel de Sandoval, 3, 14008 Córdoba, España', 37.887623, -4.781684, '2', 'Calzados Calenda Córdoba');
INSERT INTO `nodejs-course`.places (name, address, lat, lng, type, description) VALUES ('Calzada de Calatrava', 'Calzada de Calatrava, Cdad. Real, España', 38.613613, -3.763826, '2', 'Calzada de Calatrava');
INSERT INTO `nodejs-course`.places (name, address, lat, lng, type, description) VALUES ('PcComponentes Galicia', 'Calle de Cavanilles, 35, 28007 Galicia, España', 43.363056, -8.41154, '6', 'PcComponentes Galicia');



