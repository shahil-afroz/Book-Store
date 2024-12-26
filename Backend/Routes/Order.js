const router = require("express").Router();
const User = require("../models/user")
const Book = require("../models/book");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./UserAuth");
const Order = require("../models/order");

//place order

router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

        if (!order || order.length === 0) {
            return res.status(400).json({ message: "Order cannot be empty" });
        }

        // Loop through the order data
        for (const orderData of order) {
            if (!orderData._id) {
                // Ensure each orderData object has a valid _id
                return res.status(400).json({ message: "Invalid order data" });
            }

            // Create a new order
            const newOrder = new Order({ user: id, book: orderData._id });

            // Save the new order in the database
            const orderDatafromDb = await newOrder.save();


            // Save the order in the user's orders array
            await User.findByIdAndUpdate(id, {
                $push: { orders: orderDatafromDb._id }
            });

            // Clear the item from the user's cart
            await User.findByIdAndUpdate(id, {
                $pull: { cart: orderData._id }
            });
        }

        return res.json({
            status: "success",
            message: "Order placed successfully"
        });

    } catch (error) {
        console.error("Error occurred:", error); // Log the error for debugging

        // Send a more detailed error message to the client
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

//get order history of particular user
router.get("/get-order-history", authenticateToken, async (req, res) => {
    try {

        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: { path: "book" }
        })
        const ordersData = userData.orders.reverse();

        res.json({
            status: "successfull",
            data: ordersData
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
})
//get all order history of user
router.get("/get-all-order", authenticateToken, async (req, res) => {
    try {
        // Fetch orders and populate fields correctly
        const userData = await Order.find()
            .populate({
                path: "user",  // Ensure "book" is a valid reference in the schema
            })
            .populate({
                path: "book",  // Ensure "user" is the correct field in the Order schema
            })
            .sort({ createdAt: -1 });  // Make sure the field is "createdAt"

        // Return success response with data
        return res.json({
            status: "successful",
            data: userData
        });
    } catch (error) {
        // Log the error and return a server error response
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


//update order

router.put("/update-status/:id", authenticateToken, async (req, res) => {
    try {

        const { id } = req.headers;
        await Order.findByIdAndUpdate(id, { status: req.body.status });


        return res.json({
            status: "successfull",
            message: "Status Updated successfully"
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
})
module.exports = router;