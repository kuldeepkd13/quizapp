const mongoose = require("mongoose");

const userScehma = mongoose.Schema({
    username:String,
    email:String
})

const UserModel = mongoose.model("user",userScehma)

module.exports={UserModel}