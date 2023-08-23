"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const controller_1 = __importDefault(require("./src/controller"));
const app = (0, express_1.default)();
const port = 3001;
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello, welcome to the chibi canvas server!");
});
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[0];
    console.log("user wants to come but token is " + authHeader);
    if (token == null)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err)
            return res.sendStatus(403);
        req.user = user;
        next();
    });
}
app.get("/artworks", controller_1.default.getArtworks);
app.post("/createAccount", controller_1.default.createAccount);
app.post("/login", controller_1.default.loginUser);
app.listen(port, () => console.log(`app listening on port ${port}`));
