-- Inserting users
INSERT INTO USERS (username, password, liked_artwork)
VALUES ('alice', 'password123', '{}');

INSERT INTO USERS (username, password, liked_artwork)
VALUES ('bob', 'securepass', '{}');

INSERT INTO USERS (username, password, liked_artwork)
VALUES ('eve', 'evepass', '{}');

-- Inserting artworks
INSERT INTO ARTWORKS (title, price, description, imgurl, thumbnail_link, OwnerName, Artist_Name, Category, quantity, date_created)
VALUES ('Sunset Dreams', '$200', 'A beautiful sunset painting.', 'image_url_1.jpg', 'thumbnail_url_1.jpg', 'alice', 'John Doe', '{"Landscape"}', 1, NOW());

INSERT INTO ARTWORKS (title, price, description, imgurl, thumbnail_link, OwnerName, Artist_Name, Category, quantity, date_created)
VALUES ('Abstract Vision', '$150', 'An abstract painting.', 'image_url_2.jpg', 'thumbnail_url_2.jpg', 'alice', 'Jane Smith', '{"Abstract", "Modern"}', 2, NOW());

INSERT INTO ARTWORKS (title, price, description, imgurl, thumbnail_link, OwnerName, Artist_Name, Category, quantity, date_created)
VALUES ('Mystic Forest', '$180', 'A painting of an enchanted forest.', 'image_url_3.jpg', 'thumbnail_url_3.jpg', 'bob', 'Emily White', '{"Nature"}', 1, NOW());

INSERT INTO ARTWORKS (title, price, description, imgurl, thumbnail_link, OwnerName, Artist_Name, Category, quantity, date_created)
VALUES ('City Lights', '$220', 'A cityscape painting at night.', 'image_url_4.jpg', 'thumbnail_url_4.jpg', 'eve', 'Michael Black', '{"Urban"}', 3, NOW());

-- Inserting records in the cart
INSERT INTO CART (username, product_id, quantity)
VALUES ('alice', 1, 1);

INSERT INTO CART (username, product_id, quantity)
VALUES ('bob', 3, 2);

INSERT INTO CART (username, product_id, quantity)
VALUES ('eve', 4, 1);

-- Inserting featured artworks
INSERT INTO FEATURED (product_id)
VALUES (1);

INSERT INTO FEATURED (product_id)
VALUES (3);

-- Inserting selling records
INSERT INTO SELLING (OwnerName, product_id, quantity)
VALUES ('alice', 2, 3);

INSERT INTO SELLING (OwnerName, product_id, quantity)
VALUES ('bob', 1, 1);

INSERT INTO SELLING (OwnerName, product_id, quantity)
VALUES ('eve', 4, 2);
