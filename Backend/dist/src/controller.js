"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_js_1 = require("./db.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const queries_1 = __importDefault(require("./queries"));
const getArtworks = (req, res) => {
    db_js_1.pool.query(queries_1.default.getArtworks, (error, results) => {
        if (error)
            throw error;
        res.status(200).json(results.rows);
    });
};
exports.default = {
    getArtworks
};
