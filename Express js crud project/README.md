<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=14,15,30,2&height=180&section=header&text=Express%20CRUD%20Project&fontSize=44&fontColor=fff&animation=twinkling&fontAlignY=38&desc=MongoDB%20%7C%20Mongoose%20%7C%20Tailwind%20CSS%20%7C%20Full%20CRUD%20%7C%20DB%20Seeder&descAlignY=58&descSize=15" width="100%"/>

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

![Module](https://img.shields.io/badge/Module-Express%20CRUD%20Project-0f766e?style=for-the-badge)
![Port](https://img.shields.io/badge/Port-8080-f97316?style=for-the-badge)
![DB](https://img.shields.io/badge/DB-studentDb-47A248?style=for-the-badge)
![Seeded](https://img.shields.io/badge/Seeded%20Students-23-6366f1?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-00C851?style=for-the-badge)

<br/>

> 📂 **Part of:** [ExpressJS Full Stack Practice Projects](../README.md) — `Express CRUD Project` Module

</div>

---

## 📌 About This Module

This is the **most complete project** in the learning series before Wanderlust — a full **Student Management System** backed by a real **MongoDB database**. Unlike the previous REST project that used an in-memory array, every student is persisted in MongoDB through Mongoose, survives server restarts, and can be seeded fresh at any time using the dedicated `init/` seeder script.

The UI is built with **Tailwind CSS via CDN** (no build step) — a major upgrade from Bootstrap, featuring a sticky navbar, responsive card grid, and clean form layouts.

---

## 🗂️ Folder Structure

```
Express js crud project/
│
├── 📄 app.js                       ← Main server — all routes, DB connection
│
├── 📁 models/
│   └── 📄 student.js               ← Mongoose schema with full validation + timestamps
│
├── 📁 init/
│   ├── 📄 index.js                 ← DB seeder — wipes & re-inserts all sample data
│   └── 📄 data.js                  ← 23 sample students across varied departments
│
├── 📁 views/
│   └── 📁 students/
│       ├── 🏠 index.ejs            ← All students — responsive Tailwind card grid
│       ├── ➕ create.ejs           ← Add new student form (8 fields)
│       ├── 🔍 show.ejs             ← Student detail page with Edit & Delete
│       └── ✏️  edit.ejs            ← Pre-filled update form (PUT override)
│
└── 📦 package.json
```

---

## ⚙️ Tech Stack & Dependencies

<div align="center">

| Package | Version | Purpose |
|---|---|---|
| ![Express](https://img.shields.io/badge/-Express.js-000?logo=express&style=flat) | `^5.1.0` | Web server & routing |
| ![EJS](https://img.shields.io/badge/-EJS-B4CA65?logoColor=black&style=flat) | `^3.1.10` | Server-side HTML templating |
| ![Mongoose](https://img.shields.io/badge/-Mongoose-880000?style=flat) | `^9.0.0` | MongoDB ODM — schema, models, queries |
| ![method-override](https://img.shields.io/badge/-method--override-0078D4&style=flat) | `^3.0.0` | PUT & DELETE from HTML forms |
| ![TailwindCSS](https://img.shields.io/badge/-Tailwind_CSS_v4-06B6D4?logo=tailwindcss&logoColor=white&style=flat) | Browser CDN | Utility-first responsive UI |

</div>

---

## 🛣️ REST Routes — Full CRUD

| # | Method | Route | View | Action |
|---|--------|-------|------|--------|
| 1 | `GET` | `/` | — | 🏠 Home page (plain text) |
| 2 | `GET` | `/students` | `index.ejs` | 📋 List all students from MongoDB |
| 3 | `GET` | `/students/create` | `create.ejs` | ➕ Show create form |
| 4 | `POST` | `/students` | _(redirect)_ | 💾 Save new student to DB → redirect `/students` |
| 5 | `GET` | `/students/:id` | `show.ejs` | 🔍 Single student detail page |
| 6 | `GET` | `/students/:id/edit` | `edit.ejs` | ✏️ Pre-filled edit form |
| 7 | `PUT` | `/students/:id` | _(redirect)_ | 🔄 Update student in DB → redirect to `/students/:id` |
| 8 | `DELETE` | `/students/:id` | _(redirect)_ | 🗑️ Delete student → redirect `/students` |

---

## 🗄️ Mongoose Schema — `models/student.js`

The Student model has **8 fields** with full validation, a smart image default, and automatic timestamps.

```js
const studentSchema = new mongoose.Schema({

    name: {
        type:     String,
        required: true,
        trim:     true           // ← strips whitespace from both ends
    },

    department: {
        type:     String,
        required: true
    },

    image: {
        type:    String,
        default: "https://img.freepik.com/.../student.jpg",
        set: (v) => v === "" ? "https://img.freepik.com/.../student.jpg" : v
        // ← if the user submits an empty image URL, fall back to default
    },

    semester: {
        type:     Number,
        required: true,
        min:      1,
        max:      8              // ← semesters 1–8 only
    },

    description: {
        type:      String,
        required:  true,
        minlength: 10,
        maxlength: 500
    },

    collegeName: {
        type:     String,
        required: true
    },

    location: {
        type:     String,
        required: true
    },

    cgpa: {
        type:     Number,
        required: true,
        min:      0,
        max:      4.0            // ← CGPA between 0.00 and 4.00
    }

}, { timestamps: true });       // ← auto adds createdAt & updatedAt fields
```

### Key Schema Features

| Feature | Field | Rule |
|---------|-------|------|
| `trim: true` | `name` | Removes accidental leading/trailing spaces |
| `min/max` | `semester` | Only values 1–8 accepted |
| `min/max` | `cgpa` | Only values 0.00–4.00 accepted |
| `minlength/maxlength` | `description` | Between 10 and 500 characters |
| `default` + `set()` | `image` | Falls back to placeholder if URL is empty |
| `timestamps: true` | — | Auto-generates `createdAt` & `updatedAt` |

> 💡 The `set()` function on `image` is a **Mongoose setter** — it runs before saving and converts an empty string `""` to the default URL, preventing broken image tags in the UI.

---

## 🌱 DB Seeder — `init/`

This is a **standalone script** separate from the main server. Running it wipes the `students` collection and inserts all 23 sample students fresh — useful for resetting the database to a clean state during development.

### `init/index.js`

```js
const initDB = async () => {
    await studentListing.deleteMany({});         // ← wipe entire collection
    await studentListing.insertMany(initData.data); // ← insert all 23 students
    console.log("data is initialized");
};

initDB();
```

### How to Run the Seeder

```bash
# From the project root
node init/index.js
# ✅ connected to DB
# ✅ data is initialized
```

> ⚠️ Running the seeder **deletes all existing data** including any students you added manually. Only run it to reset the database.

### Sample Students in `init/data.js` (23 total)

| Name | Department | College | CGPA |
|------|------------|---------|------|
| Saad Ahmed | Electrical Engineering | FAST NUCES | 3.15 |
| Ali Raza | Computer Science | Punjab University | 3.45 |
| Hina Khan | Pharmacy | University of Lahore | 3.82 |
| Ayesha Bibi | Business Administration | LUMS | 3.90 |
| Hamza Malik | Mechanical Engineering | UET Lahore | 3.28 |
| Farah Javed | Software Engineering | Comsats University | 3.67 |
| Bilal Hussain | Civil Engineering | NED University | 3.11 |
| Nimra Shah | Psychology | Kinnaird College | 3.85 |
| Umar Farooq | Data Science | FAST NUCES | 3.70 |
| Shazia Noreen | Biotechnology | University of Karachi | 3.52 |
| Adeel Sharif | Artificial Intelligence | Air University | 3.60 |
| Kiran Fatima | English Literature | Forman Christian College | 3.88 |
| Rizwan Ali | Cyber Security | Superior University | 3.49 |
| Maham Tariq | Sociology | GCU Lahore | 3.75 |
| Azlan Haider | Marketing | Iqra University | 3.29 |
| Zara Ansari | Computer Science | FAST University | 3.92 |
| Adnan Yousaf | Information Technology | Virtual University | 3.33 |
| Sania Gul | Chemistry | Quaid-i-Azam University | 3.66 |
| Imran Bashir | Electrical Engineering | UET Taxila | 3.10 |
| Maria Iqbal | Fine Arts | National College of Arts | 3.80 |
| Talha Rehman | BS Mathematics | GCU Lahore | 3.58 |
| Hira Salman | Computer Engineering | NUST | 3.72 |
| Usman Javed | Economics | Lahore School of Economics | 3.40 |

---

## 🔑 Key Code Concepts

### Nested Body Parsing — `req.body.student`

All form inputs use the `student[field]` naming convention — this groups all student data under a single `student` key in `req.body`, making it clean to pass directly to Mongoose:

```html
<input name="student[name]"       ...>
<input name="student[department]" ...>
<input name="student[cgpa]"       ...>
```

```js
// On POST — all fields come as one object
let newStudent = new studentListing(req.body.student);
await newStudent.save();

// On PUT — spread the student object into findByIdAndUpdate
await studentListing.findByIdAndUpdate(id, { ...req.body.student });
```

### PUT via Method Override

```js
app.use(methodOverride('_method'));
```

```html
<!-- Edit form sends POST but ?_method=PUT tells Express to treat it as PUT -->
<form action="/students/<%= student._id %>?_method=PUT" method="POST">
```

```html
<!-- Delete button sends POST but ?_method=DELETE -->
<form method="POST" action="/students/<%= student._id %>?_method=DELETE">
```

### MongoDB `_id` Instead of UUID

Unlike the previous REST project (which used `uuidv4()`), here MongoDB's built-in `_id` (ObjectId) is used for all lookups:

```js
// Find by MongoDB ObjectId
const student = await studentListing.findById(id);

// Update by ObjectId
await studentListing.findByIdAndUpdate(id, { ...req.body.student });

// Delete by ObjectId
await studentListing.findByIdAndDelete(id);
```

---

## 🎨 UI — Tailwind CSS Design

All views share a consistent **teal & sky blue** design language using Tailwind CSS v4 via browser CDN (no build step needed).

| Element | Tailwind Classes | Effect |
|---------|-----------------|--------|
| Navbar | `fixed top-0 shadow-xl z-50` | Sticky top bar on all pages |
| Card grid | `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4` | Responsive 4-column layout |
| Profile photo | `w-24 h-24 rounded-full object-cover` | Circular avatar on cards |
| Buttons | `rounded-full bg-teal-500 hover:bg-teal-600 transition` | Pill-shaped with hover |
| Form inputs | `bg-sky-200 rounded-lg focus:ring-2 focus:ring-teal-500` | Sky-blue fields |
| Detail card | `flex gap-6` with `w-1/3` image + `w-2/3` content | Side-by-side layout |
| Edit/Delete | `bg-blue-600` / `bg-red-600 rounded-full` | Color-coded action buttons |

---

## 🚀 Getting Started

### Prerequisites

```bash
node -v    # v14+
mongod     # MongoDB must be running on port 27017
```

### Installation

```bash
cd "Express js crud project"
npm install
```

### Step 1 — Seed the Database (optional)

```bash
node init/index.js
# ✅ connected to DB
# ✅ data is initialized  (23 students inserted)
```

### Step 2 — Start the Server

```bash
node app.js
# ✅ connecting to DB
# ✅ Server is listening on port 8080
```

### Step 3 — Open in Browser

```
http://localhost:8080/students           ← All students grid
http://localhost:8080/students/create    ← Add new student
http://localhost:8080/students/:id       ← View student detail
http://localhost:8080/students/:id/edit  ← Edit student
```

---

## ✅ Concepts Covered

```
✅ MongoDB connection via mongoose.connect()
✅ Mongoose Schema with 8 fields + full validation
✅ trim, required, min, max, minlength, maxlength
✅ Mongoose setter — set() for image fallback on empty string
✅ timestamps: true — auto createdAt & updatedAt
✅ Separate DB seeder script (init/index.js)
✅ deleteMany({}) + insertMany([]) for clean re-seeding
✅ Full CRUD — GET, POST, PUT, DELETE (8 routes)
✅ findById() — lookup by MongoDB ObjectId
✅ findByIdAndUpdate() — update by ObjectId
✅ findByIdAndDelete() — delete by ObjectId
✅ req.body.student — nested form body pattern
✅ Spread operator {...req.body.student} in update
✅ method-override — PUT & DELETE from HTML forms
✅ express.static() — serve public assets
✅ Tailwind CSS v4 (browser CDN, no build step)
✅ Responsive card grid — 1→2→3→4 columns
✅ Circular profile image with fallback default
```

---

## 🗺️ Where This Fits in the Journey

```
✅ Phase 1 — ExpressJs              → Basics: routing, EJS, dynamic pages
✅ Phase 2 — ExpressJsClassTwo      → GET/POST, req.query/body, JS OOP
✅ Phase 3 — Rest In Express        → Full CRUD REST API (in-memory)
✅ Phase 4 — Mongoose               → MongoDB schemas, models & validation
✅ Phase 5 — Database Relationships → Embedded, Referenced & Middleware
✅ Phase 6 — Restfull Api 01        → Student CRUD + Multer File Uploads
📍 Phase 7 — Express CRUD Project   → MongoDB-backed Student CRUD + Tailwind  ← You are here
⬜ Phase 8 — Wanderlust 🏆          → Full-stack production app
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

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=14,15,30,2&height=100&section=footer" width="100%"/>

*Real database. Real persistence. Real project. 🗄️*

</div>