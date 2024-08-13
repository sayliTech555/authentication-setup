const { isValidObjectId } = require("mongoose");
const { sendError } = require("../utills/helper");
const User = require("../models/user");
const ResetToken = require("../models/resetToken");


exports.isResetTokenValid=async(req,res,next)=>{
const {token,id}=req.query;
if(!token || !id) return sendError(res,"Invalid Request !")

if (!isValidObjectId(id)) return sendError(res, "Invalid User !")

const user= await User.findById(id)
if(!user) return sendError(res,"user not Found !");

const resetToken = await ResetToken.findOne({owner:user._id})

if(!resetToken) return sendError(res,"Reset Token Not Found !");

const isValid= await resetToken.compareToken(token)

console.log("isValid",isValid)
if(!isValid) return sendError(res,"Reset Token inValid !");

req.user=user
next()

}