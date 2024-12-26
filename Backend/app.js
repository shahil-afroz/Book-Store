const express = require("express");
const app = express();


//for connect backend to front end using npm i corse 
const cors = require("cors");

//for payment method 
const stripe=require("stripe")("sk_test_51QSB9qLL9bOyeTiNaHETk1YjIcT7L0UwbKSfROZhCoXr6B2fTYmUmtg93vYmEdxzrR5Y74JEp74nHrs5uWNd8AAi00c8T69ni0")
const { v4: uuidv4 } = require('uuid');


require("dotenv").config();
require("./Connection/conn");
//for signup&&signin 
const users = require("./Routes/user");
//for book add in book model
const books = require("./Routes/Book");
//for favourite books
const favourites = require("./Routes/Favourite");
//for carts
const carts = require("./Routes/Cart");
//for order
const orders = require("./Routes/Order");


//here also use the require cors
app.use(cors());


app.use(express.json());
app.use("/api/v1", users);
app.use("/api/v1", books);
app.use("/api/v1",favourites)
app.use("/api/v1", carts);
app.use("/api/v1", orders);



app.get("/", (req, res) => {
    res.send("backend working");
})

app.listen(process.env.PORT, () => {
    console.log(`Server is working for our port ${process.env.PORT}`);
})




//for payment method backend
app.post("/api/v1/payment", async (req, res) => {
    const { token, cart, totalAmount } = req.body;
  
    try {
      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id
      });
  
      const charge = await stripe.charges.create({
        amount: Math.round(totalAmount * 100), // Convert to cents
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchase of ${cart.length} books`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      });
  
      res.status(200).json({ 
        message: "Payment Successful", 
        chargeId: charge.id 
      });
    } catch (error) {
      console.error("Stripe Payment Error:", error);
      res.status(500).json({ 
        message: "Payment Failed", 
        error: error.message 
      });
    }
  });