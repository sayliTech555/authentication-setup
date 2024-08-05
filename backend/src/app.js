const express=require("express")

const app=express()

app.get("/",(req,res)=>{
    res.send("<h1>app test</h1>")
})

app.listen(8888,()=>{
    console.log("server start on port 8888")
})