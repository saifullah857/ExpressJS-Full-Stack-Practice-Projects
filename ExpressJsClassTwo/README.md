<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,20,24&height=180&section=header&text=ExpressJs%20Class%20Two&fontSize=45&fontColor=fff&animation=twinkling&fontAlignY=38&desc=GET%20vs%20POST%20%7C%20Query%20Params%20%7C%20JS%20OOP&descAlignY=58&descSize=18" width="100%"/>



<br/>

<!-- Badges -->
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)

![Module](https://img.shields.io/badge/Module-Class%20Two-F7A800?style=for-the-badge)
![Port](https://img.shields.io/badge/Port-8080-8E44AD?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-00C851?style=for-the-badge)
![Express](https://img.shields.io/badge/Express-v5.1.0-orange?style=for-the-badge)

<br/>

> 📂 **Part of:** [ExpressJS Full Stack Practice Projects](../README.md) — `Class Two` Module

</div>

---

## 📌 About This Module

This is **Class Two** of the ExpressJS learning journey — a hands-on deep dive into how HTTP actually works between a **Frontend** and **Backend**. The module is split into two focused parts:

| Part | Folder | Topic |
|------|--------|-------|
| 🖥️ Backend | `Backend/` | Express server — GET & POST routes, query params, request body |
| 🌐 Frontend | `Frontend/` | JavaScript OOP — Classes, Inheritance, `super()` |

---

## 🗂️ Folder Structure

```
ExpressJsClassTwo/
│
├── 📁 Backend/
│   ├── 📄 index.js          ← Express server with GET & POST /register routes
│   ├── 📦 package.json      ← Dependencies (Express ^5.1.0)
│   └── 📦 package-lock.json
│
└── 📁 Frontend/
    ├── 🌐 index.html        ← HTML form (GET & POST demos — toggled via comments)
    └── 📜 app.js            ← JavaScript OOP: Person, Student, Teacher classes
```

---

## ⚙️ Tech Stack

<div align="center">

| Technology | Role |
|---|---|
| ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=nodedotjs&logoColor=white&style=flat) | JavaScript runtime |
| ![Express.js](https://img.shields.io/badge/-Express.js-000000?logo=express&logoColor=white&style=flat) | Web server & routing |
| ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black&style=flat) | OOP — Classes & Inheritance |
| ![HTML5](https://img.shields.io/badge/-HTML5-E34F26?logo=html5&logoColor=white&style=flat) | Form submission (GET & POST) |

</div>

---

## 🖥️ Backend — Express Server

### Routes

| Method | Route | Data Source | Description |
|--------|-------|-------------|-------------|
| `GET` | `/register` | `req.query` | Reads `user` & `password` from URL query string |
| `POST` | `/register` | `req.body` | Reads `user` & `password` from form body |

### Middleware Used

```js
app.use(express.urlencoded({ extended: true })) // parses HTML form data
app.use(express.json())                          // parses JSON body
```

> 💡 **Key Insight:** Without these two middleware lines, `req.body` will be `undefined` — a very common beginner mistake!

### 📡 GET Route — Query Params

```js
app.get("/register", (req, res) => {
    let { user, password } = req.query;
    res.send(`Standard GET Response and welcome @${user}`);
});
```

🔗 Test it: `http://localhost:8080/register?user=Saif&password=1234`

### 📮 POST Route — Request Body

```js
app.post("/register", (req, res) => {
    let { user, password } = req.body;
    res.send(`Standard response by POST and welcome @${user}`);
});
```

> 🔒 POST sends data **invisibly** in the request body — much safer than GET for passwords!

---

## 📊 GET vs POST — The Core Concept

```
┌─────────────────────────────────────────────────────────┐
│                    HTTP Methods                          │
├──────────────────────┬──────────────────────────────────┤
│        GET           │            POST                   │
├──────────────────────┼──────────────────────────────────┤
│ Data in URL          │ Data in request body              │
│ ?user=Saif&pass=123  │ Hidden from URL                   │
│ req.query            │ req.body                          │
│ Visible / Bookmarkable│ Secure / Not cached              │
│ For fetching data    │ For submitting / creating data    │
└──────────────────────┴──────────────────────────────────┘
```

---

## 🌐 Frontend — JavaScript OOP

The `Frontend/app.js` demonstrates **Object-Oriented Programming** in JavaScript using ES6 Classes — a critical concept before building full-stack apps where you model real-world entities.

### 🧱 Class Hierarchy

```
        Person
       /      \
  Student    Teacher
```

### Code Walkthrough

```js
// Base Class
class Person {
    constructor(name, age) {
        this.name = name;
        this.age  = age;
    }
    talk() {
        console.log(`Hi, my name is ${this.name}`);
    }
}

// Child Class — inherits from Person
class Student extends Person {
    constructor(name, age, marks) {
        super(name, age);     // ← calls Person's constructor
        this.marks = marks;
    }
}

// Child Class — inherits from Person
class Teacher extends Person {
    constructor(name, age, subject) {
        super(name, age);     // ← calls Person's constructor
        this.subject = subject;
    }
}
```

### Key OOP Concepts Demonstrated

| Concept | Keyword | What it does |
|---------|---------|-------------|
| Class definition | `class` | Blueprint for creating objects |
| Constructor | `constructor()` | Runs when `new` is called |
| Inheritance | `extends` | Child gets parent's properties & methods |
| Parent call | `super()` | Invokes the parent class constructor |
| Instance method | `talk()` | Shared method available on all `Person` objects |

---

## 🌐 Frontend — HTML Forms

`index.html` has both a GET and POST form (POST is commented out by default to switch between them):

```html
<!-- GET Form — data goes in the URL -->
<form action="http://localhost:8080/register" method="get">
    <input type="text"     name="user"     placeholder="Username" />
    <input type="password" name="password" placeholder="Password" />
    <input type="submit"   value="Submit" />
</form>

<!-- POST Form — data goes in the body (uncomment to test) -->
<form action="http://localhost:8080/register" method="post">
    ...
</form>
```

---

## 🚀 Getting Started

### Prerequisites

```bash
node -v    # v14+
npm -v
```

### Run the Backend

```bash
# Navigate to the Backend folder
cd ExpressJsClassTwo/Backend

# Install dependencies
npm install

# Start the server
node index.js
# ✅ Server listening on port 8080
```

### Test the Routes

**GET (via browser or URL bar):**
```
http://localhost:8080/register?user=Saif&password=1234
```

**POST (via the HTML form):**
```
1. Open Frontend/index.html in your browser
2. Fill in the form fields
3. Click Submit → data sent via POST body
```

---

## ✨ Concepts Covered

```
✅ GET route  →  req.query  →  data in URL
✅ POST route →  req.body   →  data in body
✅ express.urlencoded()  →  parse HTML form submissions
✅ express.json()        →  parse JSON payloads
✅ JS Classes & constructor()
✅ Class Inheritance with extends
✅ super() — calling the parent constructor
✅ Instance methods shared across child classes
```

---

## 🗺️ Where This Fits in the Journey

```
✅ Phase 1 — ExpressJs         → Basic routing, EJS, dynamic pages
📍 Phase 2 — ExpressJsClassTwo → GET/POST, req.query/body, JS OOP  ← You are here
⬜ Phase 3 — Middleware        → Custom middleware, next(), error handling
⬜ Phase 4 — REST in Express   → Full RESTful API conventions
⬜ Phase 5 — Mongoose          → MongoDB integration
⬜ Phase 6 — Wanderlust 🏆     → Full-stack production app
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

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,20,24&height=100&section=footer" width="100%"/>

*One class at a time. One concept at a time. 💛*

</div>