const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
         console.log(authHeader,"qwq");
    // If token is not provided
    if (token == null) {
        return res.status(408).json({ message: "Token required" });
    }

    // Verifying the token
    jwt.verify(token, "123ripone", (err, user) => {
        if (err) {
            return res.status(408).json({ message: "Token expired" });
        }

        // Add user to the request object and proceed to next middleware
        req.user = user;
        next(); // Proceed to the next middleware/route handler
    });
};

module.exports = { authenticateToken };
