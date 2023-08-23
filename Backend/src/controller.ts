import {pool} from "./db";
import dotenv from 'dotenv';
dotenv.config();
import queries from "./queries";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const getArtworks = (req: any, res:any) =>
{
    pool.query(queries.getArtworks, (error: any, results:any) =>
    {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const createAccount = async (req: any, res: any) =>
{
    console.log("req body is " + JSON.stringify(req.body));
  let username = req.body.username;
  let password = req.body.password;
  const userExists =  await pool.query(queries.checkUserExists, [username]);
  if(userExists.rowCount > 0)
  {
    console.log("username exists");
    res.status(404).send("username exists");
  } else
  {
    const salt =  await bcrypt.genSalt()
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await pool.query(queries.addUser, [`${username}`, `${hashedPassword}`]);
      console.log("encrypted password and added to db");
      res.status(201).send("encrypted password and added to db");
  }
}

const loginUser = async (req: any, res: any) =>
{
  let username = req.body.username;
  let password = '';
  console.log("username is " + username);
  const userExists = await pool.query(queries.checkUserExists, [username]);
  if(userExists.rowCount == 0)
  {
    console.log("This user does not exist");
    return res.send("this user does not exist");
  } else
  {
    password = userExists.rows[0].password;

  }

  console.log('password is ' + password);
  console.log("req body password: " + req.body.password);

  if (await bcrypt.compare(req.body.password, password))
    {
      console.log("bcrypt says this is a good password");

      const user = {username: username};
      const accessToken = generateAccessToken(user);
      return res.json({accessToken:accessToken});
      

      // return res.send("success");
    } else {
      console.log("bcrypt says this is NOT a good password");

      return res.send("not allowed");
    }
}

function generateAccessToken(user: any)
{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: '1h'});
}

const getArtworkByID = async (id: Number) =>
{
    const res = await pool.query(queries.getArtworkByID, [id]);
    return res.rows;
}

const getFeatured = async (req: any, res: any) =>
{
    const featuredRes = await pool.query(queries.getFeatured);
    let featuredResults = [];
    for(let id = 0;id<featuredRes.rowCount;id++)
    {
        // console.log("ID we are giving is " + featuredRes.rows[id].product_id);
        let oneRes = await getArtworkByID(featuredRes.rows[id].product_id);
        featuredResults.push(oneRes);
    }
    return res.send(featuredResults);
}


export default {
    getArtworks,
    loginUser,
    createAccount,
    getFeatured
}