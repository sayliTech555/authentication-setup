
const jwt = require("jsonwebtoken")
const User=require("../models/user")
const { sendError } = require("../utills/helper")
const VerifacationToken =require("../models/verificationToken")
const { generateOtp } = require("../utills/mail")

const newtoken=(user)=>{
    return jwt.sign({userId:user._id}, process.env.JWT_SECRET_KEY,{expiresIn:"1d"})
}

exports.createUser=async (req,res)=>{
    const {name,email,password}=req.body
    const user= await User.findOne({email})
    if(user) return sendError(res,"This email already exist")
    
    const newuser=new User(req.body)

    const OTP=generateOtp()
    const verificationToken=new VerifacationToken({
        owner:newuser._id,
        otp:OTP
    })
    await verificationToken.save()
    await newuser.save()
    console.log("request",req.body)
    res.send(newuser)
}


exports.signin=async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return sendError(res,"Email or password wrong")
    }

    const user=await User.findOne({email})
    if(!user){
        return sendError(res,"User not exist")
    }

    const isMatch=await user.comparePassword(password)
    if(!isMatch){
        return sendError(res,"Email or password not match")
    }

    const token=newtoken(user)

    res.json({success:true,user:{name:user.name,email:user.email,id:user._id,token}})
}


