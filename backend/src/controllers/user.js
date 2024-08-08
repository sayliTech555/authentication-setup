
const jwt = require("jsonwebtoken")
const User=require("../models/user")
const { sendError } = require("../utills/helper")
const VerifacationToken =require("../models/verificationToken")
const { generateOtp, mailTransport } = require("../utills/mail")
const { isValidObjectId } = require("mongoose")

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

    mailTransport().sendMail({
        from:"emailverification@gmail.com",
        to:newuser.email,
        subject:"Verify Your email account",
        html:`<h1>${OTP}</h1>`
    })



    console.log("request",req.body)
    res.send(newuser)
}


exports.signin=async(req,res)=>{
    const {email,password}=req.body
    console.log("res",req.body)
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


exports.verifyEmail=async(req,res)=>{
    const {userId,otp}=req.body

    if(!userId || !otp ) return sendError(res,"Invalid request, missing parameter")

    if(!isValidObjectId(userId))   return sendError(res,"Invalid user Id") 

     const user=await  User.findById(userId)  
     if(!user) return sendError(res,"Sorry , user not found !")

     if(user.verified)  return sendError(res,"This Account already verified") 

     const token=await VerifacationToken.findOne({owner:user._id})
     if(!token) return sendError(res,"Sorry , user not found !")

      const isMatch=await token.compareToken(otp) 
      if(!isMatch) return sendError(res,"Please provide valid token") 

        user.verified=true

    await VerifacationToken.findByIdAndDelete(token._id)
    await user.save()


    mailTransport().sendMail({
        from:"emailverification@gmail.com",
        to:user.email,
        subject:"Verify Your email account",
        html:`<h1>Email Verified Succesfully</h1>`
    })


    res.status(200).json({success:true,message:"your email verified succesfully",user:user})
}