const router=require("express").Router()
const  {createUser, signin, verifyEmail, forgetPassword}=require("../controllers/user")
const { validateUser, validate } = require("../middlewears/validator")

router.post("/create",validateUser,validate,createUser)
router.post("/signin",signin)
router.post("/verify-email",verifyEmail)
router.post("/forget-password",forgetPassword)


module.exports=router