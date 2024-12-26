const router = require("express").Router();
const User = require("../models/user")
const Book = require("../models/book");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./UserAuth");

router.put("/add-to-cart", authenticateToken, async (req, res) => {
    try {
        const { id, bookid } = req.headers;


        // Check if both id and bookid are provided
        if (!id || !bookid) {
            return res.status(400).json({ message: "ID and Book ID are required" });
        }

        const userData = await User.findById(id);
        console.log("User data:", userData);

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the book is already in the cart
        const isPresent = userData.cart.includes(bookid);
        console.log("Is book already in cart?", isPresent);

        if (isPresent) {
            // If the book is already in the cart, send the response and stop further execution
            return res.status(200).json({ message: "Book is already added to cart" });
        }

        // Add the book to the cart if not already present
        await User.findByIdAndUpdate(id, { $push: { cart: bookid } });

        // Send a success response
        res.status(200).json({ message: "Book added successfully to cart" });
    } catch (error) {
        console.error("Error occurred:", error);
        // Catch any errors and send an internal server error response
        res.status(501).json({ message: "Internal server error", error: error.message });
    }
});


//delete book from cart

router.delete("/delete-book-from-cart/:bookid", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const{bookid}=req.params
        const userData = await User.findById(id);
        const isPresent =  userData.cart.includes(bookid);
        if (isPresent) {
            await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });
        }
        res.status(504).json({ message: "Remove successfully" });

    } catch (error) {
        res.status(502).json({ message: "Internals servers error" });
    }
})


//get particular  cart book of the user

router.get("/get-cart-books", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate("cart")
        const carts =  userData.cart.reverse();

        res.json({
            status: "successfull",
            data: carts
        });

    } catch (error) {
        res.status(502).json({ message: "Internals servers error" });
    }
})
module.exports = router;