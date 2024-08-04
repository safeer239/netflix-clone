const jwt = require("jsonwebtoken");
const { ENV_VARS } = require("../config/envVars");
const User = require("../models/userSchema");

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });

  res.cookie("netflix", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: ENV_VARS.NODE_ENV !== "development",
  });
};

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies["netflix"];

    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: "Unauthorized User" });
    }

    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ status: false, message: "Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ status: false, message: "user not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};

module.exports = { generateTokenAndSetCookie, verifyToken };
