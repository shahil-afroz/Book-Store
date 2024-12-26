const router = require("express").Router();
const User = require("../models/user")
const Book = require("../models/book");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./UserAuth");

//add book to Favourites
router.put("/add-book-to-favourite", authenticateToken, async (req, res) => {
    try {
 
        const { id, bookid } = req.headers;

        // Check if ID and Book ID are present in the request body
        if (!id || !bookid) {
            return res.status(400).json({ message: "User ID and Book ID are required" });
        }

        // Find the user
        const userData = await User.findById(id);

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the book is already in the user's favourites
        const isPresent = userData.favourites.includes(bookid);
     

        if (isPresent) {
            return res.status(200).json({ message: "Book is already added to favourites" });
        }

        // Add the book to favourites if not already present
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $push: { favourites: bookid } },
            { new: true } // Return the updated user document
        );

        // Check if the user was updated successfully
        if (!updatedUser) {
            return res.status(500).json({ message: "Failed to add book to favourites" });
        }

        // Send a success response
        res.status(200).json({
            message: "Book added successfully to favourites",
            data: updatedUser.favourites // Optionally return the updated favourites array
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


//delete book from favourites

router.delete("/delete-book-from-favourites", authenticateToken, async (req, res) => {
    try {
  
        const { id, bookid } = req.headers;
        const userData = await User.findById(id);
        const isPresent =  userData.favourites.includes(bookid);
        if (isPresent) {
            return await User.findByIdAndUpdate(
                id, // The user id you want to update
                { $pull: { favourites: bookid } }, // The operation to remove the book from the favourites array
                { new: true } // Optional: returns the updated document instead of the original document
            );
        }
        res.status(504).json({ message: "Remove successfully" });

    } catch (error) {
        res.status(502).json({ message: "Internals servers error" });
    }
})


//get particular  favourite book of the user

router.get("/get-favourite-books", authenticateToken, async (req, res) => {
    try {
       
        const { id } = req.headers;
        
        const userData = await User.findById(id).populate("favourites")
        const favoBooks = userData.favourites;

        res.json({
            status: "successfull",
            data: favoBooks
        });

    } catch (error) {
        res.status(502).json({ message: "Internals servers error" });
    }
})


module.exports = router;