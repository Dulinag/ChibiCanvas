CREATE TABLE USERS(
    username VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
	liked_artwork INT[]
);
CREATE TABLE ARTWORKS (
	product_id SERIAL PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
    price VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    imgurl VARCHAR(255) NOT NULL,
	thumbnail_link VARCHAR(255),
	OwnerName VARCHAR(255) references users(username) ON DELETE CASCADE,
	Artist_Name VARCHAR(255),
	Category VARCHAR(255)[],
	quantity INT NOT NULL,
	date_created TIMESTAMP
);
CREATE TABLE CART (
    username VARCHAR(255) REFERENCES users(username) ON DELETE CASCADE,
    product_id INT REFERENCES ARTWORKS(product_id) ON DELETE CASCADE,
    quantity INT NOT NULL,
	PRIMARY KEY (username, product_id)
);



CREATE TABLE FEATURED(
	product_id INT REFERENCES ARTWORKS(product_id) ON DELETE CASCADE
);

CREATE TABLE SELLING (
	OwnerName VARCHAR(255) references users(username) ON DELETE CASCADE,
	product_id INT REFERENCES ARTWORKS(product_id) ON DELETE CASCADE,
	quantity INT
);
