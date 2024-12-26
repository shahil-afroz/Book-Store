const router = require("express").Router();
const User = require("../models/user")
const Book = require("../models/book");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./UserAuth");

//add new books -----admin

router.post("/add-book", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id);
        if (user.role != "admin") {
            return res.status(800).json({ message: "You are not having access" });
        }
        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            language: req.body.language
        });
        await book.save();
        res.status(200).json({ message: "Books add successfully" })
    } catch (error) {
        res.status(501).json({ message: "Internals servers error" });
    }
})

//update book
router.put("/Update-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            language: req.body.language
        })


        res.status(201).json({ message: "Book update  successfully" })
    } catch (error) {
        res.status(501).json({ message: "Internals servers error" });
    }
})

//delete book
router.delete("/delete-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndDelete(bookid);
        res.status(201).json({ message: "Book Delete  successfully" })
    } catch (error) {
        res.status(502).json({ message: "Internals servers error" });
    }
})


//get all books
router.get("/get-all-book", async (req, res) => {
    try {
        const books =await Book.find().sort({createdAt:-1});
       
        res.json({ status:"Success",
            data:books
         });
    } catch (error) {
        res.status(502).json({ message: "An error occur" });
    }
})


//get recentlty added book Which limit is 4
router.get("/get-recent-book", async (req, res) => {
    try {
        const books =await Book.find().sort({createdAt:-1}).limit(4);
       
        res.json({ status:"Success",
            data:books
         });
    } catch (error) {
        res.status(502).json({ message: "An error occur" });
    }
})


//get book by id 

router.get("/get-book-by-id/:id", async (req, res) => {
    try {
        const {id}=req.params;
        const books =await Book.findById(id);
       
        res.json({ status:"Success",
            data:books
         });
    } catch (error) {
        res.status(502).json({ message: "An error occur" });
    }
})
module.exports = router;