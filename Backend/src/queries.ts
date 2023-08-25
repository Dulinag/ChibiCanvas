const getArtworks = "SELECT * FROM ARTWORKS;";
const addUser = "INSERT INTO USERS(username, password) VALUES ($1, $2)";
const checkUserExists = "SELECT * FROM USERS WHERE username=$1";
const getFeatured = "SELECT * FROM FEATURED;";
const getArtworkByID = "SELECT * FROM ARTWORKS WHERE product_id=$1";
const getArtworkCartbyID = "SELECT * FROM CART WHERE username=$1 AND product_id=$2";
const checkCart = 'SELECT * FROM (SELECT * FROM CART WHERE username =$1) categories WHERE categories.product_id = $2;'
const addCart = 'INSERT INTO CART(username, product_id, quantity) VALUES ($1, $2, $3)';
const updateCart = 'UPDATE CART SET quantity = (quantity + $3) WHERE product_id = $2 AND username = $1;';
const checkQuantityCart = 'SELECT quantity FROM CART WHERE username=$1 AND product_id=$2;';
const deleteFromCart = 'DELETE FROM CART WHERE username=$1 AND product_id=$2';
const searchQuery = "SELECT * from ARTWORKS where $1 = ANY(category);";
const addArtwork = "INSERT INTO ARTWORKS(title, price, description, imgurl, date_created, ownername, artist_name, quantity) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, $5, $6, $7);"
const deleteArtwork = "DELETE FROM ARTWORKS WHERE ownername=$1 and product_id=$2";
const getCartQuery = "SELECT * FROM CART WHERE username =$1";

export default {
    getArtworks,
    addUser,
    checkUserExists,
    getFeatured,
    getArtworkByID,
    addCart,
    checkCart,
    updateCart,
    checkQuantityCart,
    deleteFromCart,
    searchQuery,
    addArtwork,
    deleteArtwork,
    getCartQuery,
    getArtworkCartbyID
}