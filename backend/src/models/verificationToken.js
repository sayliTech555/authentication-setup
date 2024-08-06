const mongoose=require('mongoose')
const bcrypt = require('bcrypt');
const verificationTokenSchema=new mongoose.Schema({
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



verificationTokenSchema.pre("save", async function(next){
    if(this.isModified("otp")){
        let hash= await bcrypt.hash(this.otp,8)
        this.otp=hash
    }
    next()
})

verificationTokenSchema.methods.compareToken = async function (otp){
    try {
        const result= await bcrypt.compareSync(otp,this.otp)
        return result
    } catch (error) {
        return error
    }
}

module.exports=mongoose.model("verifacationToken",verificationTokenSchema)