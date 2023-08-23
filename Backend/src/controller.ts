import {pool} from "./db.js";
import dotenv from 'dotenv';
dotenv.config();
import queries from "./queries";


const getArtworks = (req: any, res:any) =>
{
    pool.query(queries.getArtworks, (error: any, results:any) =>
    {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

export default {
    getArtworks
}