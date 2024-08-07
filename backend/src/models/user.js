const mongoose=require('mongoose')
const bcrypt = require('bcrypt');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        
    },
    avtar:{
        type:String,
        default:""
    },
    verified:{
        type:Boolean,
        default:false,
        require:true
    }
})



userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        let hash= await bcrypt.hash(this.password,8)
        this.password=hash
    }
    next()
})

userSchema.methods.comparePassword = async function (password){
    try {
        const result= await bcrypt.compareSync(password,this.password)
        return result
    } catch (error) {
        return error
    }
}

module.exports=mongoose.model("user",userSchema)