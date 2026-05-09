const express = require("express");
const app = express();
const path = require("path");
const {v4:uuidv4}=require('uuid');
var methodOverride = require('method-override')

let port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


let posts = [
  {  id: uuidv4(),
    username: "saifi-coder",
    content: "Hi I am a MERN stack web developer",
  },
  { id: uuidv4(),
    username: "shajan",
    content: "Learn, grow, and earn",
  },
  { id: uuidv4(),
    username: "aspireCollege",
    content: "Anspire kar",
  },
  { id: uuidv4(),
    username: "punjabCollege",
    content: "You are the future",
  },
];

app.get("/", (req, res) => {
  res.send("Server is working well 🚀");
});


app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts }); // views/posts.ejs
});

app.get("/posts/new", (req, res) => {
  res.render("view.ejs"); // views/posts.ejs
});

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id)
    res.render("showPost.ejs",{post})
});


app.post("/posts",(req,res)=>{
  let { username,content}=req.body;
  let id=uuidv4();
 posts.push({id, username, content });
  res.redirect("/posts");

})

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>id===p.id)
    post.content=newContent; 
    res.redirect("/posts")
})
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id)
    res.render("edit.ejs",{post})
})

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params
     posts=posts.filter((p)=>id !==p.id)
    res.redirect("/posts");
})
app.listen(port, () => {
  console.log(`✅ Server is listening on port ${port}`);
});
