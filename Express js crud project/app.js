const express = require("express");
const app = express();
const path = require("path");
var methodOverride = require('method-override')
const mongoose = require('mongoose');
const studentListing = require("./models/student.js");

let port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

main()
    .then(() => console.log(`connecting to DB`))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/studentDb');
}

app.get("/",  (req, res) => {
   res.send("Home page")
})

// app.get("/test", async (req, res) => {
    
//     let sampleData = new studentListing({
//         name: "Hina Khan",
//     department: "Pharmacy",
    
//     semester: 7,
//     description: "Focused on clinical pharmacy and patient care, with excellent academic performance.",
//     collegeName: "University of Lahore",
//     location: "Lahore, Pakistan",
//     cgpa: 3.82
//     })
//     await sampleData.save();
//     console.log(`sample data is saved`)
//     res.send("successfully saved your sample data in database")
// })


// index route 

app.get("/students",async(req,res)=>{
  const allStudents=  await studentListing.find({})
    res.render("students/index.ejs",{allStudents})    
    
})
//show sreate route

app.get("/students/create",(req,res)=>{
    res.render("students/create.ejs")
})

//show rout
app.get("/students/:id",async(req,res)=>{
    let {id}=req.params
   const student= await studentListing.findById(id);
   res.render("students/show.ejs",{student})
})

//create new student route 
app.post("/students",async(req,res)=>{
    let newStudent=new studentListing(req.body.student)
   await newStudent.save()
    res.redirect("/students")
})

//show  edit route form page

app.get("/students/:id/edit",async (req,res)=>{
    let {id}=req.params
  let  student= await studentListing.findById(id)
    res.render("students/edit.ejs",{student})
})

//update route

app.put("/students/:id",async(req,res)=>{
    let {id}=req.params
   let updatedStudent= await studentListing.findByIdAndUpdate(id,{...req.body.student});
   res.redirect(`/students/${id}`)

})

//delete route

app.delete("/students/:id",async(req,res)=>{
    let {id}=req.params
    let deleteStudent=await studentListing.findByIdAndDelete(id)
    res.redirect("/students")
})






app.listen(port, () => {
    console.log(`✅ Server is listening on port ${port}`);
});