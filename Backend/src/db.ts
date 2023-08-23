const Pool = require("pg").Pool;
import credentials from "./credentials.json";

const pool = new Pool(credentials);

export {pool};
