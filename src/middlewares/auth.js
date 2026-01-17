// Handling Auth Middlewares for all HTTP requests
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Unauthorised access");
    }
    const decodedData = await jwt.verify(token, "Dev@Tinder$2212");
    const { _id } = decodedData;
    const user = await User.findById(_id);
    if (!user) throw new Error("User doesn't Exist");
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = { userAuth };
