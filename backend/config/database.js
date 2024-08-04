const mongoose =require('mongoose');
const { ENV_VARS } = require('./envVars');

exports.connectDB =async()=>{
    try{
        await mongoose.connect(ENV_VARS.MONGO_URI).then(()=>{
            console.log("database connection established")
        })
    }
    catch(err){
        console.log(err)
    }
}