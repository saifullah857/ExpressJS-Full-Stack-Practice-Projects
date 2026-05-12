<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=1,12,16,24&height=180&section=header&text=RESTful%20API%20Project%2001&fontSize=42&fontColor=fff&animation=twinkling&fontAlignY=38&desc=Student%20CRUD%20%7C%20Multer%20File%20Uploads%20%7C%20UUID%20%7C%20Method%20Override&descAlignY=58&descSize=15" width="100%"/>

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)
![Multer](https://img.shields.io/badge/Multer-FF6600?style=for-the-badge&logo=npm&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![UUID](https://img.shields.io/badge/UUID-FF6B6B?style=for-the-badge&logo=npm&logoColor=white)

![Module](https://img.shields.io/badge/Module-RESTful%20API%20Project%2001-2563eb?style=for-the-badge)
![Port](https://img.shields.io/badge/Port-8085-10b981?style=for-the-badge)
![Students](https://img.shields.io/badge/Seeded%20Students-8-EAC755?style=for-the-badge&logoColor=black)
![Status](https://img.shields.io/badge/Status-Complete-00C851?style=for-the-badge)

<br/>

> 📂 **Part of:** [ExpressJS Full Stack Practice Projects](../README.md) — `RESTful API Project 01` Module

</div>

---

## 📌 About This Module

This is the **first real full-stack project** in the learning journey — a complete **Student Management System** with a styled UI. It combines every REST concept learned so far and adds **Multer file upload** support, letting users upload real profile images when creating or editing students.

The project runs on an **in-memory data store** (no database) with 8 pre-seeded students, each with a name, department, semester, CGPA, and profile image. All CRUD operations work through a styled EJS + Bootstrap 5 interface.

---

## 🗂️ Folder Structure

```
Restfull Api project 01/
│
├── 📄 index.js                  ← Main server — all routes, Multer config, data store
├── 📦 package.json              ← Dependencies
│
├── 📁 views/
│   ├── 🏠 index.ejs             ← All students — Bootstrap card grid (Read All)
│   ├── ➕ new.ejs               ← Add student form with image upload (Create)
│   ├── 🔍 showstudent.ejs       ← Single student profile card (Read One)
│   └── ✏️  editstudent.ejs      ← Edit form with current image preview (Update)
│
└── 📁 public/
    └── 📁 uploads/              ← Multer saves uploaded images here
```

---

## ⚙️ Tech Stack & Dependencies

<div align="center">

| Package | Version | Purpose |
|---|---|---|
| ![Express](https://img.shields.io/badge/-Express.js-000?logo=express&style=flat) | `^5.1.0` | Web server & REST routing |
| ![EJS](https://img.shields.io/badge/-EJS-B4CA65?logoColor=black&style=flat) | `^3.1.10` | Server-side HTML templating |
| ![Multer](https://img.shields.io/badge/-Multer-FF6600&style=flat) | `^2.0.2` | Multipart form data & file uploads |
| ![method-override](https://img.shields.io/badge/-method--override-0078D4&style=flat) | `^3.0.0` | PATCH & DELETE from HTML forms |
| ![uuid](https://img.shields.io/badge/-uuid-FF6B6B&style=flat) | `^13.0.0` | Unique ID per student |
| ![Bootstrap](https://img.shields.io/badge/-Bootstrap_5-7952B3?logo=bootstrap&logoColor=white&style=flat) | `5.3.3` | Responsive UI via CDN |

</div>

---

## 🎓 Pre-Seeded Students

The app launches with **8 students** already in memory, covering a variety of CS departments:

| # | Name | Department | Semester | CGPA |
|---|------|------------|----------|------|
| 1 | Ali Khan | Computer Science | 6th | 3.75 |
| 2 | Ayesha Malik | Software Engineering | 5th | 3.90 |
| 3 | Bilal Ahmed | Information Technology | 4th | 3.45 |
| 4 | Hina Tariq | Data Science | 8th | 3.88 |
| 5 | Saif Ullah | Artificial Intelligence | 7th | 3.67 |
| 6 | Maria Nawaz | Cyber Security | 3rd | 3.52 |
| 7 | Usman Raza | Computer Science | 2nd | 3.25 |
| 8 | Fatima Noor | Software Engineering | 1st | 3.94 |

---

## 🛣️ REST Routes — Full CRUD

| # | Method | Route | View | Action |
|---|--------|-------|------|--------|
| 1 | `GET` | `/students` | `index.ejs` | 📋 List all students as Bootstrap cards |
| 2 | `GET` | `/students/new` | `new.ejs` | ➕ Show add-student form with file upload |
| 3 | `POST` | `/students` | _(redirect)_ | 💾 Save student + upload image via Multer |
| 4 | `GET` | `/students/:id` | `showstudent.ejs` | 🔍 Show single student profile card |
| 5 | `GET` | `/students/:id/edit` | `editstudent.ejs` | ✏️ Show edit form with current image preview |
| 6 | `PATCH` | `/students/:id` | _(redirect)_ | 🔄 Update student fields + optionally new image |
| 7 | `DELETE` | `/students/:id` | _(redirect)_ | 🗑️ Delete student → redirect to `/students` |

---

## 📸 Multer — File Upload Integration

This is the **key new concept** in this project. Multer is a middleware that handles `multipart/form-data` — the encoding type required when uploading files through an HTML form.

### Configuration

```js
const multer = require("multer");

// dest: where uploaded files are saved on disk
const upload = multer({ dest: path.join(__dirname, "public/uploads/") });
```

> 💡 Multer saves files with a **hashed filename** (no extension) to avoid naming conflicts — e.g. `6515e9f7767e207e19ed85d6f9002aa0`. The original filename and extension are stored in `req.file` but not used by default.

### Using Multer on Routes

```js
// upload.single("image") → processes one file from the field named "image"
app.post("/students", upload.single("image"), (req, res) => {
    const { name, department, cgpa, semester } = req.body;
    const imagePath = "/uploads/" + req.file.filename;  // ← saved file path
    const id = uuidv4();
    students.push({ id, name, department, cgpa, semester, image: imagePath });
    res.redirect("/students");
});
```

### Multer on PATCH — Optional Image Update

```js
app.patch("/students/:id", upload.single("image"), (req, res) => {
    const singleStudent = students.find((std) => std.id === id);

    singleStudent.name       = name;
    singleStudent.department = department;
    singleStudent.cgpa       = cgpa;
    singleStudent.semester   = semester;

    // Only update image if a new file was uploaded
    if (req.file) {
        singleStudent.image = "/uploads/" + req.file.filename;
    }
    // If no new file → existing image is kept as-is ✅

    res.redirect("/students");
});
```

### HTML Form for File Upload

```html
<!-- enctype="multipart/form-data" is REQUIRED for file uploads -->
<form action="/students" method="post" enctype="multipart/form-data">
    <input type="text"   name="name"       required />
    <input type="number" name="cgpa"       step="0.01" />
    <input type="text"   name="semester"   required />
    <input type="text"   name="department" required />
    <input type="file"   name="image"      accept="image/*" />
    <button type="submit">Add Student</button>
</form>
```

> ⚠️ Without `enctype="multipart/form-data"`, the file will **not** be sent to the server — a very common mistake.

---

## 🔑 Core Concepts Breakdown

### DELETE via Method Override

HTML forms only support GET and POST — the `method-override` package fixes this:

```js
app.use(methodOverride("_method"));
```

```html
<!-- form method is POST but ?_method=DELETE tells Express to treat it as DELETE -->
<form action="/students/<%= singleStudent.id %>?_method=DELETE" method="POST">
    <button type="submit" class="delete">Delete</button>
</form>
```

### Finding a Student by ID

```js
// Array.find() → returns the first match or undefined
const singleStudent = students.find((std) => id === std.id);

if (singleStudent) {
    res.render("showstudent.ejs", { singleStudent });
} else {
    res.status(404).send("Student not found");  // ← proper 404 handling
}
```

### Deleting a Student by ID

```js
// Array.filter() → returns all students EXCEPT the one to delete
students = students.filter((std) => std.id !== id);
res.redirect("/students");
```

### 404 Guard on PATCH

```js
if (!singleStudent) {
    return res.status(404).send("Student not found");
}
```

---

## 🎨 UI Design Highlights

The views follow a consistent **dark card + beige-gold gradient** design theme:

| Element | Style |
|---------|-------|
| Page background | `linear-gradient(#E3D6C8, #EAC755)` beige-to-gold |
| Student cards | `#0f172a` dark slate with hover lift + shadow |
| Profile image | 220px cover height, blue bottom border |
| Department badge | Gold gradient pill badge |
| Action buttons | Blue (View), Green (Edit), Red (Delete) |
| Forms | Glassmorphism card with gold focus rings |
| Edit form | Shows current image preview before upload input |
| Font | `Poppins` / `Inter` via Google Fonts |
| Animation | CSS `fadeIn` on all cards and forms |

---

## 📄 Views Overview

| View | Route | Key Features |
|------|-------|-------------|
| `index.ejs` | `GET /students` | Bootstrap card grid, student image, department badge, View / Edit / Delete buttons |
| `new.ejs` | `GET /students/new` | Glassmorphism form card, file input with `enctype`, gold focus rings |
| `showstudent.ejs` | `GET /students/:id` | Circular profile image, full detail list, gold label colors, back button |
| `editstudent.ejs` | `GET /students/:id/edit` | Pre-filled inputs, **current image preview**, optional new upload, PATCH override |

---

## 🚀 Getting Started

### Prerequisites

```bash
node -v   # v14+
npm -v
```

### Installation & Run

```bash
# Navigate to the folder
cd "Restfull Api project 01"

# Install all dependencies
npm install

# Start the server
node index.js
# ✅ Server is listening on port 8085
```

### Open in Browser

```
http://localhost:8085/students           ← All students
http://localhost:8085/students/new       ← Add new student
http://localhost:8085/students/:id       ← View single student
http://localhost:8085/students/:id/edit  ← Edit student
```

---

## ✅ Concepts Covered

```
✅ Full REST CRUD (7 routes) — GET, POST, PATCH, DELETE
✅ Multer middleware           — multipart/form-data file uploads
✅ upload.single("image")     — process one file per request
✅ req.file.filename           — access saved file path from Multer
✅ Optional image update       — if (req.file) pattern on PATCH
✅ enctype="multipart/form-data" — required HTML form attribute for files
✅ method-override             — PATCH & DELETE from HTML forms
✅ UUID                        — unique ID generation per student
✅ Array.find()                — look up student by ID
✅ Array.filter()              — delete student by ID
✅ Array.some()                — existence check before delete
✅ res.status(404)             — proper HTTP error responses
✅ express.static()            — serve uploaded images from /public
✅ Bootstrap 5 card grid       — responsive 3-column layout
✅ CSS fadeIn animation        — smooth card entrance on load
✅ Image preview in edit form  — show current image before new upload input
```

---

## 🗺️ Where This Fits in the Journey

```
✅ Phase 1 — ExpressJs              → Basics: routing, EJS, dynamic pages
✅ Phase 2 — ExpressJsClassTwo      → GET/POST, req.query/body, JS OOP
✅ Phase 3 — Rest In Express        → Full CRUD REST API with method-override
✅ Phase 4 — Mongoose               → MongoDB schemas, models & validation
✅ Phase 5 — Database Relationships → Embedded, Referenced & Middleware
📍 Phase 6 — Restfull Api 01        → Student CRUD + Multer File Uploads  ← You are here
⬜ Phase 7 — Wanderlust 🏆          → Full-stack production app
```

---

## 👨‍💻 Author

<div align="center">

**Saif Ullah Khalid**

[![GitHub](https://img.shields.io/badge/GitHub-saifullah857-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/saifullah857/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Saif_Ullah_Khalid-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/saif-ullah-khalid-412221379/)

</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=1,12,16,24&height=100&section=footer" width="100%"/>

*Upload it. Store it. Serve it. 📸*

</div>