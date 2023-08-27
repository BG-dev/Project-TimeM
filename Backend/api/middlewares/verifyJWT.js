const userIntegration = require("../../integration/user");

const jwt = require("jsonwebtoken");
async function verifyJWT(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err)
        return res.json({
          isLoggedIn: false,
          message: "Failed To Authenticate",
        });
      const user = await userIntegration.getOneBy({
        username: decoded.username,
      });
      req.user = user;
      // req.user.id = decoded.id;
      // req.user.username = decoded.username;
      next();
    });
  } else {
    res.json({ message: "Incorrect Token Given", isLoggedIn: false });
  }
}

module.exports = verifyJWT;
