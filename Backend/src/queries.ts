const getArtworks = "SELECT * FROM ARTWORKS;";
const addUser = "INSERT INTO USERS(username, password) VALUES ($1, $2)";
const checkUserExists = "SELECT * FROM USERS WHERE username=$1";
const getFeatured = "SELECT * FROM FEATURED;";
const getArtworkByID = "SELECT * FROM ARTWORKS WHERE product_id=$1";
const checkCart = 'SELECT * FROM (SELECT * FROM CART WHERE username =$1) categories WHERE categories.product_id = $2;'
const addCart = 'UPDATE CART SET quantity = quantity + $3 WHERE product_id = $2 AND username = $1;';
const updateCart = 'UPDATE CART SET quantity = quantity - $3 WHERE product_id = $2 AND username = $1;';
const checkQuantityCart = 'SELECT quantity FROM CART WHERE username=$1 AND product_id=$2;';
const deleteFromCart = 'DELETE FROM CART WHERE username=$1 AND product_id=$2';
const searchQuery = "SELECT * from ARTWORKS where $1 = ANY(category);";


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
    searchQuery
}