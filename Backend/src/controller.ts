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

const getArtwork = async (req:any, res:any) =>
{
    const results = await getArtworkByID(req.body.product_id);
    return res.send(results);
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

const addToCart = async (req: any, res: any) =>
{
  let username = req.user.username;
  let productID = req.body.product_id;
  let quantity = req.body.quantity;

  const userCart = await pool.query(queries.checkCart, [username, productID]);
  console.log('userCart is ' + JSON.stringify(userCart.rows));
    // need to add checks to see if the user is trying to add more than the quantity of the product the owner has
    // need checks for if the user is trying to add an item to their cart that they own
  pool.query(queries.addCart, [`${username}`, `${productID}`, `${quantity}`], (err: any, results: any)=>
  {
    if(err) throw err;
    res.status(201).send("successfully added item to cart");
  });
}

const deleteFromCart = async (req: any, res:any) =>
{
  let username = req.user.username;
  let productID = req.body.product_id;
  let quantity = req.body.quantity;

  const userCart = await pool.query(queries.checkCart, [username, productID]);
  if(userCart.rowCount == 0)
  {
    return res.status(403).send('item does not exist in cart');
  }
  // need to adds checks to see if we are trying to delete more than we have so we can warn the user.
  // currently, we will delete the item from the cart if the user tries to delete more than they have
  pool.query(queries.updateCart, [`${username}`, `${productID}`, `${quantity}`], (err: any, results:any)=>{
    if(err) throw err;
    res.status(201).send("successfully removed item to cart");
  })

  const numCart = await pool.query(queries.checkQuantityCart,[`${username}`, `${productID}`] );
  if(numCart.rows[0].quantity < 0)
  {
    await pool.query(queries.deleteFromCart, [`${username}`, `${productID}`]);
  }
}

const getArtworkSearch = async (req: any, res:any ) =>
{
  let searchQuery = req.params.searchQ;
  const results = await pool.query(queries.searchQuery, [`${searchQuery}`]);
    // can be improved such as 
    // it only works with searching something like "Nature" or "Urban" which gets the respective item(s) for each. but when combined as "Nature Urban", we wont get any search results
  console.log("results are " + JSON.stringify(results.rows));
  // res.status(201).send("successfully searched for " + searchQuery);
  res.status(201).send(results.rows);
}

export default {
    getArtworks,
    loginUser,
    createAccount,
    getFeatured,
    addToCart,
    deleteFromCart,
    getArtwork,
    getArtworkSearch
}