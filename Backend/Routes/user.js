const router = require("express").Router();
const User = require("../models/user")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./UserAuth")
//signup
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, adress } = req.body;

        //check user name exist?
        const existusername = await User.find({ username: username });
        if (existusername.length > 0) {
            return res.status(405).json({ message: "Username already exist" });
        }


        //check email exist?
        const existemail = await User.find({ email: email });
        if (existemail.length > 0) {
            return res.status(405).json({ message: "Email already exist" });
        }

        //password length check
        if (password.length <= 5) {
            return res.status(400).json({ message: "Password Length Less than 6" });
        }



        //so now there was no previous data in our data base so now new user data will be coming in our databse

        const hashPass = await bcrypt.hash(password, 10);
        const newUser = new User(
            {
                username: username,
                password: hashPass,
                email: email,
                adress: adress

            });
        await newUser.save();
        return res.status(200).json({ message: "sign-up Successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
})

router.post("/sign-in", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Input validation
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide both username and password"
            });
        }

        // Check if the username exists
        const existingUser = await User.findOne({ username });

        // Username doesn't exist
        if (!existingUser) {
            return res.status(401).json({
                success: false,
                message: "Username not found. Please check your username or sign up."
            });
        }

        // Compare the password
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

        // Password doesn't match
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password. Please try again."
            });
        }

        // If authentication successful, generate token
        const authClaims = [
            { name: existingUser.username },
            { role: existingUser.role }
        ];

        const token = jwt.sign({ authClaims }, "123ripone", { expiresIn: "30d" });

        // Send successful response
        return res.status(200).json({
            success: true,
            id: existingUser._id,
            role: existingUser.role,
            token: token,
            message: "Login successful"
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred during login. Please try again later."
        });
    }
});


//get user information
router.get("/get-user-info", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const data = await User.findById(id).select("-password");
        return res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

//update adress api
router.put("/update-adress", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { adress } = req.body;
        await User.findByIdAndUpdate(id, { adress: adress });
        return res.status(300).json({ message: "adress update successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }

})
module.exports = router;