"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_js_1 = require("./db.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const queries_1 = __importDefault(require("./queries"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getArtworks = (req, res) => {
    db_js_1.pool.query(queries_1.default.getArtworks, (error, results) => {
        if (error)
            throw error;
        res.status(200).json(results.rows);
    });
};
const createAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req body is " + JSON.stringify(req.body));
    let username = req.body.username;
    let password = req.body.password;
    const userExists = yield db_js_1.pool.query(queries_1.default.checkUserExists, [username]);
    if (userExists.rowCount > 0) {
        console.log("username exists");
        res.status(404).send("username exists");
    }
    else {
        const salt = yield bcrypt_1.default.genSalt();
        const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 10);
        yield db_js_1.pool.query(queries_1.default.addUser, [`${username}`, `${hashedPassword}`]);
        console.log("encrypted password and added to db");
        res.status(201).send("encrypted password and added to db");
    }
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let username = req.body.username;
    let password = '';
    console.log("username is " + username);
    const userExists = yield db_js_1.pool.query(queries_1.default.checkUserExists, [username]);
    if (userExists.rowCount == 0) {
        console.log("This user does not exist");
        return res.send("this user does not exist");
    }
    else {
        password = userExists.rows[0].password;
    }
    console.log('password is ' + password);
    console.log("req body password: " + req.body.password);
    if (yield bcrypt_1.default.compare(req.body.password, password)) {
        console.log("bcrypt says this is a good password");
        const user = { username: username };
        const accessToken = generateAccessToken(user);
        return res.json({ accessToken: accessToken });
        // return res.send("success");
    }
    else {
        console.log("bcrypt says this is NOT a good password");
        return res.send("not allowed");
    }
});
function generateAccessToken(user) {
    return jsonwebtoken_1.default.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
}
exports.default = {
    getArtworks,
    loginUser,
    createAccount
};
