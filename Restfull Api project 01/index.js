const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
const multer = require("multer");

let port = 8085;

let students = [
  {
    id: uuidv4(),
    name: "Ali Khan",
    department: "Computer Science",
    semester: "6th",
    cgpa: 3.75,
    image: "https://images.unsplash.com/photo-1615109398623-88346a601842?auto=format&fit=crop&q=60&w=900",
  },
  {
    id: uuidv4(),
    name: "Ayesha Malik",
    department: "Software Engineering",
    semester: "5th",
    cgpa: 3.9,
    image: "https://images.unsplash.com/photo-1653250198415-6bae22e0c796?auto=format&fit=crop&q=60&w=900",
  },
  {
    id: uuidv4(),
    name: "Bilal Ahmed",
    department: "Information Technology",
    semester: "4th",
    cgpa: 3.45,
    image: "https://plus.unsplash.com/premium_photo-1661602011150-6c6f8b9ba788?auto=format&fit=crop&q=60&w=900",
  },
  {
    id: uuidv4(),
    name: "Hina Tariq",
    department: "Data Science",
    semester: "8th",
    cgpa: 3.88,
    image: "https://img.freepik.com/premium-photo/cute-smiling-girl-student-holding-notebooks-looking-cheerful-camera-studying-college-university-standing-blue-background_1258-70144.jpg",
  },
  {
    id: uuidv4(),
    name: "Saif Ullah",
    department: "Artificial Intelligence",
    semester: "7th",
    cgpa: 3.67,
    image: "https://images.unsplash.com/photo-1677563231818-7d4e2c7b7c2c?auto=format&fit=crop&q=60&w=900",
  },
  {
    id: uuidv4(),
    name: "Maria Nawaz",
    department: "Cyber Security",
    semester: "3rd",
    cgpa: 3.52,
    image: "https://images.unsplash.com/photo-1574660430686-b2a255cfce68?auto=format&fit=crop&q=60&w=900",
  },
  {
    id: uuidv4(),
    name: "Usman Raza",
    department: "Computer Science",
    semester: "2nd",
    cgpa: 3.25,
    image: "https://images.unsplash.com/photo-1616236800965-0afe257d60cd?auto=format&fit=crop&q=60&w=900",
  },
  {
    id: uuidv4(),
    name: "Fatima Noor",
    department: "Software Engineering",
    semester: "1st",
    cgpa: 3.94,
    image: "https://plus.unsplash.com/premium_photo-1661375081843-c68173f0fae8?auto=format&fit=crop&q=60&w=900",
  },
];

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

const upload = multer({ dest: path.join(__dirname, "public/uploads/") });

app.get("/students", (req, res) => {
  res.render("index.ejs", { students });
});

app.get("/students/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/students", upload.single("image"), (req, res) => {
  const { name, department, cgpa, semester } = req.body;
  const imagePath = "/uploads/" + req.file.filename;
  const id = uuidv4();
  students.push({ id, name, department, cgpa, semester, image: imagePath });
  res.redirect("/students");
});

app.get("/students/:id", (req, res) => {
  const { id } = req.params;
  const singleStudent = students.find((std) => id === std.id);
  if (singleStudent) {
    res.render("showstudent.ejs", { singleStudent });
  } else {
    res.status(404).send("Student not found");
  }
});

app.get("/students/:id/edit", (req, res) => {
  const { id } = req.params;
  const singleStudent = students.find((std) => id === std.id);
  res.render("editstudent.ejs", { singleStudent });
});

app.patch("/students/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { name, department, cgpa, semester } = req.body;
  const singleStudent = students.find((std) => std.id === id);
  if (!singleStudent) {
    return res.status(404).send("Student not found");
  }
  singleStudent.name = name;
  singleStudent.department = department;
  singleStudent.cgpa = cgpa;
  singleStudent.semester = semester;
  if (req.file) {
    singleStudent.image = "/uploads/" + req.file.filename;
  }
  res.redirect("/students");
});

app.delete("/students/:id", (req, res) => {
  const { id } = req.params;
  const studentExists = students.some((std) => std.id === id);
  if (!studentExists) {
    return res.status(404).send("Student not found");
  }
  students = students.filter((std) => std.id !== id);
  
  res.redirect("/students");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
