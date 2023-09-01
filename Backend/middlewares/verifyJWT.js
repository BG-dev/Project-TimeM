const User = require("../models/User");
const jwt = require("jsonwebtoken");

async function verifyJWT(req, res, next) {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err)
                return res.status(401).json({
                    isLoggedIn: false,
                    message: "Failed To Authenticate",
                });
            const user = await User.findById(decoded.id);
            if (!user)
                return res.status(401).json({
                    isLoggedIn: false,
                    message: "Failed To Authenticate",
                });
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({
            message: "Incorrect Token Given",
            isLoggedIn: false,
        });
    }
}

module.exports = verifyJWT;
