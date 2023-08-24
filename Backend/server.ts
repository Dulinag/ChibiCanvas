import express, {Express, Request, Response} from "express";
import dotenv from 'dotenv';
dotenv.config();
import { GetUserReq } from "./src/types"; 

import jwt from "jsonwebtoken";
import controller from "./src/controller";

const cors = require("cors");

const app: Express  = express();

const port: Number = 3001;

app.use(express.json());
app.use(cors()); 

app.get("/", (req, res)=>
{
    res.send("Hello, welcome to the chibi canvas server!");
})

function authenticateToken(req: GetUserReq, res: Response, next: any){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[0];
    console.log("user wants to come but token is " + authHeader);
  
    if(token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) =>
    {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
  }

app.get("/artworks", controller.getArtworks);
app.get("/artwork", controller.getArtwork);
app.post("/createAccount", controller.createAccount);
app.post("/login", controller.loginUser);
app.get("/featured", controller.getFeatured);
app.post('/addToCart', authenticateToken as any, controller.addToCart);
app.delete('/deleteFromCart', authenticateToken as any, controller.deleteFromCart);
app.get("/search/:searchQ", controller.getArtworkSearch);

app.listen(port, () => console.log(`app listening on port ${port}`));
