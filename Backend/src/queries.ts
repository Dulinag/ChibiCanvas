const getArtworks = "SELECT * FROM ARTWORKS;";
const addUser = "INSERT INTO USERS(username, password) VALUES ($1, $2)";
const checkUserExists = "SELECT * FROM USERS WHERE username=$1";


export default {
    getArtworks,
    addUser,
    checkUserExists
}