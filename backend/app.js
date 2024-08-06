const express=require("express")
const userRouter=require("./src/routes/user")
require("dotenv").config()
require("./src/db/configue")
const app=express()

const PORT=process.env.PORT || 8000
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("<h1>app test</h1>")
})
app.use("/api/user",userRouter)

app.listen(PORT,()=>{
    console.log(`server start on port ${PORT}`)
})