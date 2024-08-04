const User = require("../models/userSchema.js");
const bcryptjs = require("bcryptjs");
const { generateTokenAndSetCookie } = require("../utils/token.js");

exports.signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res
        .status(401)
        .json({ status: fail, message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }

    if (password.length < 8) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Passwords must be at least 8 characters",
        });
    }

    const existingUserByEmail =await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const existingUserByUsername =await User.findOne({ username: username });
    if (existingUserByUsername) {
      return res
        .status(401)
        .json({ success: false, message: "Username already exists" });
    }

    const salt =10
    const hashedpassword = await bcryptjs.hash(password, salt)

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
    const newUser = new User({
      email,
      password:hashedpassword,
      username,
      image,
    });
   
    generateTokenAndSetCookie(newUser._id,res)
    await newUser.save()
    res.status(200).json({ success: true, user:{
        ...newUser._doc,
        password:""
    }})
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ success: false, message:"Internal Server Error"})
  }
};

exports.login = async (req, res) => {
  try{
    const {email, password} = req.body

    if(!email || !password){
        return res.status(401).json({ success: false, message:"Invalid email or password"})
    }

    const user = await User.findOne({ email: email})
    if(!user){
        return res.status(404).json({ success: false, message:"User not found"})
    }

    const isPasswordCorrect = await bcryptjs.compare(password,user.password)
    if(!isPasswordCorrect){
        return res.status(404).json({success:false,message:"Invalid Credentials"})
    }

    generateTokenAndSetCookie(user._id,res)
    res.status(200).json({ success: true, user:{
        ...user._doc,
        password:""
    }})
  }
  catch(err){
    console.log(err.message)
  }
};

exports.logout = async (req, res) => {
try{
    res.clearCookie("netflix")
    return res.status(200).json({ success: true, message:"User logged out successfully" })

}catch (err) {
    console.log(err.message)
    return res.status(500).json({ success: false, message:"Internal Server Error"})
}
};


exports.authCheck = async (req, res) => {
  try {
    res.status(200).json({ success: true, user: req.user})
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ success: false, message:"Internal Server Error"})
  }
} 