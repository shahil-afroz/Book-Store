const router = require("express").Router();
const User = require("../models/user")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken }=require("./UserAuth")
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

// Sign-in route
router.post("/sign-in", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the username exists
        const exiusername = await User.findOne({ username });
        if (!exiusername) {
            return res.status(409).json({ message: "Invalid credentials" });
        }
        // console.log(exiusername);

        // Compare the password
        const isPasswordMatch = await bcrypt.compare(password, exiusername.password);
        if (isPasswordMatch) {
            // Generate JWT token if password matches
            const authClaims = [
                { name: exiusername.username },
                { role: exiusername.role }
            ];
            const token = jwt.sign({ authClaims }, "123ripone", { expiresIn: "30d" });
//  console.log(token);
            // Send response with token and user info
            return res.status(200).json({
                id: exiusername._id,
                role: exiusername.role,
                token: token,
            });
        } else {
            return res.status(408).json({ message: "Invalid credentials" });
        }

    } catch (error) {
        console.error(error);
        return res.status(501).json({ message: "Internal server error" });
    }
});


//get user information
router.get("/get-user-info",authenticateToken,async (req,res)=>{
    try {
        const {id}=req.headers;
        const data=await User.findById(id).select("-password");
        return res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

//update adress api
router.put("/update-adress",authenticateToken,async (req,res)=>{
    try {
        const {id}=req.headers;
        const {adress}=req.body;
        await User.findByIdAndUpdate(id,{adress:adress});
        return res.status(300).json({message:"adress update successfully"});
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }

})
module.exports = router;