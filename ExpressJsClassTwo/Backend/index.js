const express= require("express")
const app=express();
app.use(express.urlencoded({extended:true}))
app.use(express.json())

let port=8080;

app.get("/register",(req,res)=>{
    let { user, password}=req.query;
    res.send(`Standered Get Responce and welcome @${user}`)
})

app.post("/register",(req,res)=>{
    let { user ,password} =req.body
    res.send(`standard response by POST and welcom  @${user}`)
})


app.listen(port,()=>{
    console.log(`our port is listinig on port ${port}`);
})