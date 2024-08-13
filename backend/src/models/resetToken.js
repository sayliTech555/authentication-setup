const mongoose=require('mongoose')
const bcrypt = require('bcrypt');
const resetTokenSchema=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true

    },
    otp:{
        type:String,
        require:true      
    },
    createdAt :{
        type:Date,
        expires:3600,
        default:Date.now()
    }
})



resetTokenSchema.pre("save", async function(next){
    if(this.isModified("otp")){
        let hash= await bcrypt.hash(this.otp,8)
        this.otp=hash
    }
    next()
})

resetTokenSchema.methods.compareToken = async function (otp){
    try {
        console.log("otp==>",otp,this.otp)
        const result= await bcrypt.compareSync(otp,this.otp)
        console.log("result==>",result)
        return result
    } catch (error) {
        return error
    }
}

module.exports=mongoose.model("resetToken",resetTokenSchema)