const { query, validationResult, check } = require('express-validator');


exports.validateUser=[
    check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is missing!")
    .isLength({min:3,max:20})
    .withMessage("name should be 3 to 20 character long"),
    check("email")
    .normalizeEmail()
    .isEmail()
    .withMessage("Email is Envalid!"),
    check("password")
    .not()
    .isEmpty()
    .withMessage("Password is missing!")
    .isLength({min:8,max:20})
    .withMessage("password must be 8 to 20 character long")


]  


exports.validate=(req,res,next)=>{
    const error=validationResult(req).array()
    if(!error.length) return next()

     res.status(400).json({success:false,error:error[0].msg})   
}