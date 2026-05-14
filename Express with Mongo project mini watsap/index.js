const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chats.js");
const methodOverride = require("method-override");
const ExpressErorr = require("./ExpressErorr.js");

// =============== APP SETUP ===============
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// =============== DATABASE CONNECTION ===============
main()
  .then(() => console.log("✅ Connection established successfully"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/fakewatsapp");
}

// =============== ROUTES ===============

// Home route
app.get("/", (req, res) => {
  res.send("Mini WhatsApp server is working...");
});

// INDEX route → Show all chats
app.get("/chats",asyncWrap( async (req, res, next) => {
  
    let chats = await Chat.find();
    res.render("index.ejs", { chats });

  
}));

// NEW route → Display form to create new chat
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// CREATE route → Add new chat to database
app.post("/chats",asyncWrap( async (req, res, next) => {

    let { from, to, msg } = req.body;

    let newChat = new Chat({
      from,
      to,
      msg,
      created_at: new Date(),
    });

    await newChat.save();
    console.log("💾 Chat saved successfully");

    res.redirect("/chats");

  
}));

// EDIT route → Show edit form for one chat
app.get("/chats/:id/edit",asyncWrap( async (req, res, next) => {

    let { id } = req.params;
    let chat = await Chat.findById(id);

    if (!chat) throw new ExpressErorr(404, "Chat not found!");

    res.render("edit.ejs", { chat });

  
}));

// SHOW route → Show one chat
app.get("/chats/:id", asyncWrap( async (req, res, next) => {

    let { id } = req.params;
    let chat = await Chat.findById(id);

    if (!chat) throw new ExpressErorr(404, "Chat not found!");

    res.render("show.ejs", { chat });

 
}));
// function to handle async function for custom error handling
 function asyncWrap(fn){
 return function(req,res,next){
  fn(req,res,next).catch((err)=>next(err))
 }
}

// UPDATE route
app.put("/chats/:id", asyncWrap( async (req, res, next) => {
  
    let { id } = req.params;
    let { from, msg, to } = req.body;

    await Chat.findByIdAndUpdate(
      id,
      { from, msg, to },
      { runValidators: true, new: true }
    );

    res.redirect("/chats");

  
}));

// DELETE route
app.delete("/chats/:id", asyncWrap(async (req, res, next) => {

    let { id } = req.params;
    await Chat.findByIdAndDelete(id);

    console.log(`🗑️ Chat ${id} deleted successfully`);
    res.redirect("/chats");

  
}));
const handleValisationErr=(err)=>{
  console.log(`This is a validation error .Please follow the rules to avoid errors`)
  console.dir(err.message)
  return err;
}

// mdla to print error name

app.use((err,req,res,next)=>{
  console.log(err)
  if(err.name==="ValidationError"){
     err=handleValisationErr(err)
  }

  next(err)
});

// =============== ERROR HANDLING MIDDLEWARE ===============
app.use((err, req, res, next) => {
  let { status = 500, message = "Some Error Occured" } = err;
  res.status(status).send(message);
});

// =============== SERVER LISTEN ===============
app.listen(8080, () => {
  console.log("🚀 App is listening on port 8080");
});
