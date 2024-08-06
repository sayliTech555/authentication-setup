
const User=require("../models/user")
const { sendError } = require("../utills/helper")

exports.createUser=async (req,res)=>{
    const {name,email,password}=req.body
    const user= await User.findOne({email})
    if(user) return sendError(res,"This email already exist")
    
    const newuser=new User(req.body)

    await newuser.save()
    console.log("request",req.body)
    res.send(newuser)
}


exports.signin=(req,res)=>{
    const {email,password}=req.body
    if(!email.trim() || !password.trim()){
        return sendError(res,"Email or password wrong")
    }
}


