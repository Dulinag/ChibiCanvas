const getArtworks = "SELECT * FROM ARTWORKS;";
const addUser = "INSERT INTO USERS(username, password) VALUES ($1, $2)";
const checkUserExists = "SELECT * FROM USERS WHERE username=$1";
const getFeatured = "SELECT * FROM FEATURED;";
const getArtworkByID = "SELECT * FROM ARTWORKS WHERE product_id=$1";

export default {
    getArtworks,
    addUser,
    checkUserExists,
    getFeatured,
    getArtworkByID
}