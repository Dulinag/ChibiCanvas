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
const createAccount = async (req: any, res: any) => {
  console.log("req body is " + JSON.stringify(req.body));
  let username = req.body.username;
  let password = req.body.password;
  
  const userExists = await pool.query(queries.checkUserExists, [username]);

  if (userExists.rowCount > 0) {
    console.log("username exists");
    res.status(404).send("username exists");
  } else {
    const saltRounds = 10; // You can adjust this value as needed
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt); // Using 'password' instead of 'req.body.password'
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
  if(userCart.rowCount > 0)
  {
    pool.query(queries.updateCart,  [`${username}`, `${productID}`, `${quantity}`]);
    return res.status(201).send("Successfully updated quantity in cart");
  }
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
  let quantity = -1* req.body.quantity;

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

const addArtwork = async (req: any, res: any) =>
{
    let title = req.body.title;
    let price = req.body.price;
    let description = req.body.description;
    let imgURL = req.body.imgURL;
    // let dateCreated = req.body.date_created;
    let owner = req.user.username;
    console.log("owner is " + owner);
    let artist_name = owner;
    let quantity = 1;
    pool.query(queries.addArtwork, [title, price, description, imgURL, owner, artist_name, quantity])
    .then(()=>{
        console.log("successfully added artwork!");
        res.status(201).send("successfully added artwork!")})
    .catch((err: any)=>{console.log("error " + err);res.status(404).send(err)})
}

const deleteArtwork = async (req: any, res:any) =>
{
    let product_id = req.body.product_id;
    let username = req.user.username;
    pool.query(queries.deleteArtwork, [username, product_id]).then(
        ()=>
        {
            // bug: it runs section this even though the product_id doesnt exist
            console.log("successfuly deleted artowrk!");
            return res.status(201).send("successfuly deleted artowrk!");
        }
    ).catch((err: any)=>
    {
        return res.status(404).send(err);
    })
}
const getCart = async (req: any, res: any) =>
{
  let username = req.user.username;
  const results = await pool.query(queries.getCartQuery, [username]);
  let artworkArr = [];
  for(let product_id = 0;product_id<results.rowCount;product_id++)
  {
    let result = await pool.query(queries.getArtworkByID, [results.rows[product_id].product_id]);
    artworkArr.push(result.rows[0])
  }
  console.log("artworkArr" + JSON.stringify(artworkArr));
  res.json(artworkArr);

}

const getArtworkUser = async(req: any, res: any)=>
{
    let username = req.user.username;
    const artworks = await pool.query(queries.getArtworkByUser, [username]);
    return res.json(artworks.rows);
}


export default {
    getArtworks,
    loginUser,
    createAccount,
    getFeatured,
    addToCart,
    deleteFromCart,
    getArtwork,
    getArtworkSearch,
    addArtwork,
    deleteArtwork,
    getCart,
    getArtworkUser
}
