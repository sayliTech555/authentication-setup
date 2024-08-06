exports.sendError=(res,message)=>{
    return res.status(401).json({success:false,error:(message)})
}