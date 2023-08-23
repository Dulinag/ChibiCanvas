"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getArtworks = "SELECT * FROM ARTWORKS;";
const addUser = "INSERT INTO USERS(username, password) VALUES ($1, $2)";
const checkUserExists = "SELECT * FROM USERS WHERE username=$1";
exports.default = {
    getArtworks,
    addUser,
    checkUserExists
};
