const express = require("express");
const { UserModel } = require("../model/User.model");

const userRoute = express.Router();


userRoute.post("/register",async(req,res)=>{
    const {username,email}=req.body
 try {
    const user = await UserModel.findOne({email,username})
    if(user){
        return res.status(200).send({"msg":"User already there",user})
    }
    const newuser = new UserModel({username,email});
    await newuser.save();
    res.status(200).send({"msg":"User Created",newuser})
 } catch (error) {
    res.status(400).send({"msg":error.message})
 }
})

module.exports={userRoute}