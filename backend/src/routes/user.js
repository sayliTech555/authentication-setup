const router=require("express").Router()
const  {createUser}=require("../controllers/user")
const { validateUser, validate } = require("../middlewears/validator")

router.post("/create",validateUser,validate,createUser)

module.exports=router