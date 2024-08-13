
const jwt = require("jsonwebtoken")
const User=require("../models/user")
const { sendError, cryptoRandomBytes } = require("../utills/helper")
const VerifacationToken =require("../models/verificationToken")
const { generateOtp, mailTransport } = require("../utills/mail")
const { isValidObjectId } = require("mongoose")
const ResetToken = require("../models/resetToken")

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

exports.forgetPassword=async(req,res)=>{
        const {email}=req.body
        if(!email) return sendError(res,"Please provide valid email")  
         const user =await  User.findOne({email})
        if(!user)   return sendError(res,"User Not Exist") 

        const token=await ResetToken.findOne({owner:user._id})    
        
        if(token) return sendError(res,"Only after 1 hour you can request for another token !") 

        const randomToken=await cryptoRandomBytes()   
        console.log("randomToken",randomToken)
        const resetToken= new ResetToken({owner:user._id,otp:randomToken})
        await resetToken.save()    
        mailTransport().sendMail({
            from:"security@gmail.com",
            to:user.email,
            subject:"Reset mail",
            html:`<button><p><a href="http://localhost:3000/reset-password?token=${randomToken}&id=${user._id}" target="_blank" class="button">Learn More</a></p>
 </button>`
        })

        res.json({success:true,message:"Password reset link sent to your email"})
}

exports.resetPassword=async(req,res)=>{

    const {password} =req.body

    const user=await User.findById(req.user._id)
    if(!user) return sendError(res, "user Not Found !")

    const isSamePassword = await user.comparePassword(password)    
    if(isSamePassword) return sendError(res,"new password must be the differnt")

    if(password.trim().length<8 || password.trim().length>20  ) return sendError(res,"password must be 8 to 20 character long !")    

    user.password=password.trim()
    await user.save()    

    await ResetToken.findOneAndDelete({owner:user._id})

    mailTransport().sendMail({
        from:"security@gmail.com",
        to:user.email,
        subject:"Reset mail successfull",
        html:`<h1>password reset successfully</h1>`
    })

    res.json({success:true,message:"password reset successfully"})

}