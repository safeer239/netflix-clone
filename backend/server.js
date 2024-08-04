const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const movieRoute = require("./routes/movieRoute.js");
const authRoute = require("./routes/authRoute");
const tvShowRoute = require("./routes/tvShowRoute");
const searchRoute = require("./routes/searchRoute.js");
const path = require("path");

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/movie",movieRoute);
app.use("/api/v1/tv", tvShowRoute);
app.use("/api/v1/search", searchRoute);


const {ENV_VARS} = require('./config/envVars');
const { connectDB } = require("./config/database.js");
// const __dirname=path.resolve()

if(ENV_VARS.NODE_ENV === "production"){
     app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*",(req,res)=>{
      res.sendFile(path.resolve(__dirname,"../frontend/dist/index.html"));
    })  
}

const PORT = ENV_VARS.PORT || 8080;

app.listen(PORT, () => {
  console.log("server listening on port " + PORT);
  connectDB()
});
