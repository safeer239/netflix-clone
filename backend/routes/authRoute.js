const express = require("express");
const router = express.Router();
const { signup, logout, login, authCheck } = require("../controller/authController");
const { verifyToken } = require("../utils/token");

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/authCheck",verifyToken, authCheck);
module.exports = router;
