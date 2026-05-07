const express =require("express");

const app=express();
// const path =require("path");

let port=8080;

app.set("view engine","ejs");
// app.set("views",Path2D.join(__dirname , "/views"))

app.get("/" , (req,res)=>{
    res.render("index.ejs")
})
app.get("/roledice",(req,res)=>{
    let diceValue=Math.floor(Math.random()*6)+1
    res.render("roledice.ejs",{diceValue})
})

app.get("/ig/:username", (req, res) => {
  const instaData = require("./data.json");
  let { username } = req.params;
  username = username.toLowerCase().replace(/ /g, "_"); // convert spaces → underscores

  let data = instaData[username];
  console.log("Searching for:", username); // debug line

  if (data) {
    res.render("instagram.ejs", { data });
  } else {
    res.send("User not found!");
  }
});


app.listen(port, ()=>{
console.log(`our app is listining on ${port}`)
})


