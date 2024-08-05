
const User=require("../models/user")

exports.createUser=(req,res)=>{
    const {name,email,password}=req.body
    const user=new User(req.body)
    console.log("request",req.body)
    res.send(user)
}


