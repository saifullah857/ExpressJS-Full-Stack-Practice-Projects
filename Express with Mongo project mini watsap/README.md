<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=3,8,30&height=180&section=header&text=Mini%20WhatsApp&fontSize=50&fontColor=fff&animation=twinkling&fontAlignY=38&desc=Express%20%7C%20MongoDB%20%7C%20Custom%20Error%20Handling%20%7C%20asyncWrap&descAlignY=58&descSize=15" width="100%"/>

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

![Module](https://img.shields.io/badge/Module-Mini%20WhatsApp-25D366?style=for-the-badge)
![Port](https://img.shields.io/badge/Port-8080-10b981?style=for-the-badge)
![DB](https://img.shields.io/badge/DB-fakewatsapp-47A248?style=for-the-badge)
![Seeded](https://img.shields.io/badge/Seeded%20Chats-5-6366f1?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-00C851?style=for-the-badge)

<br/>

> 📂 **Part of:** [ExpressJS Full Stack Practice Projects](../README.md) — `Mini WhatsApp` Module

</div>

---

## 📌 About This Module

**Mini WhatsApp** is a full-stack chat simulation app — the most polished mini-project in the series. Built on top of MongoDB and Express, it introduces two crucial backend patterns not seen in previous modules: a **custom `ExpressError` class** for structured error creation and an **`asyncWrap` utility** that eliminates repetitive try-catch blocks across all async routes.

The UI is a dark WhatsApp-inspired theme built with **Bootstrap 5**, **Font Awesome**, and **Lordicon animated 3D icons** — the most visually complete project before Wanderlust.

---

## 🗂️ Folder Structure

```
Express with Mongo project mini watsap/
│
├── 📄 index.js           ← Main server — all routes, asyncWrap, error middleware
├── 📄 init.js            ← DB seeder — inserts 5 sample chats
├── 📄 ExpressErorr.js    ← Custom error class extending Error
│
├── 📁 models/
│   └── 📄 chats.js       ← Chat Mongoose schema (from, to, msg, created_at)
│
├── 📁 views/
│   ├── 🏠 index.ejs      ← All chats — dark card UI with edit & delete
│   ├── ➕ new.ejs        ← Create new chat form (glassmorphism card)
│   ├── ✏️  edit.ejs      ← Pre-filled update form
│   └── 🔍 show.ejs       ← Single chat detail view
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
| ![Mongoose](https://img.shields.io/badge/-Mongoose-880000?style=flat) | `^8.19.3` | MongoDB ODM |
| ![method-override](https://img.shields.io/badge/-method--override-0078D4&style=flat) | `^3.0.0` | PUT & DELETE from HTML forms |
| ![Bootstrap](https://img.shields.io/badge/-Bootstrap_5-7952B3?logo=bootstrap&logoColor=white&style=flat) | `5.3.3 CDN` | Responsive dark-themed UI |
| ![Font Awesome](https://img.shields.io/badge/-Font_Awesome-528DD7?logo=fontawesome&logoColor=white&style=flat) | `6.6.0 CDN` | Icons throughout UI |
| ![Lordicon](https://img.shields.io/badge/-Lordicon-25D366&style=flat) | CDN | Animated 3D WhatsApp-style icons |

</div>

---

## 🛣️ REST Routes — Full CRUD

| # | Method | Route | View | Action |
|---|--------|-------|------|--------|
| 1 | `GET` | `/` | — | 🏠 Home — plain text confirmation |
| 2 | `GET` | `/chats` | `index.ejs` | 💬 All chats from MongoDB |
| 3 | `GET` | `/chats/new` | `new.ejs` | ➕ New chat form |
| 4 | `POST` | `/chats` | _(redirect)_ | 💾 Save chat to DB → redirect `/chats` |
| 5 | `GET` | `/chats/:id` | `show.ejs` | 🔍 Single chat detail |
| 6 | `GET` | `/chats/:id/edit` | `edit.ejs` | ✏️ Pre-filled edit form |
| 7 | `PUT` | `/chats/:id` | _(redirect)_ | 🔄 Update chat → redirect `/chats` |
| 8 | `DELETE` | `/chats/:id` | _(redirect)_ | 🗑️ Delete chat → redirect `/chats` |

---

## 🗄️ Chat Schema — `models/chats.js`

```js
const chatSchema = mongoose.Schema({
    from: {
        type:     String,
        required: true,     // ← sender name is mandatory
    },
    to: {
        type:     String,
        required: true,     // ← receiver name is mandatory
    },
    msg: {
        type:      String,
        maxLength: 100      // ← messages capped at 100 characters
    },
    created_at: {
        type:     Date,
        required: true,     // ← timestamp is mandatory (set manually on save)
    }
});

const Chat = mongoose.model("Chat", chatSchema);
// → stored in "chats" collection in "fakewatsapp" database
```

> 💡 Unlike the previous CRUD project which used `{ timestamps: true }`, here `created_at` is a **manual Date field** — it's explicitly set to `new Date()` when creating each chat, giving full control over the timestamp format used in the UI.

---

## 🔴 Key Concept 1 — Custom `ExpressError` Class

> **File:** `ExpressErorr.js`

This is the **first project** in the series to introduce a custom error class — a production-grade pattern for creating structured, meaningful errors instead of generic ones.

```js
class ExpressErorr extends Error {
    constructor(status, message) {
        super();                  // ← calls Error's constructor
        this.status  = status;   // ← HTTP status code (e.g. 404, 500)
        this.message = message;  // ← human-readable error message
    }
}

module.exports = ExpressErorr;
```

**Used in routes like this:**

```js
let chat = await Chat.findById(id);

if (!chat) throw new ExpressErorr(404, "Chat not found!");
//          ↑ creates a structured error object with status + message
//            caught by the global error-handling middleware below
```

**Without this class:**
```js
// Bare Error — no status code, just a generic message
throw new Error("Chat not found");  // → always becomes 500
```

**With this class:**
```js
throw new ExpressErorr(404, "Chat not found!");  // → correctly becomes 404
```

---

## 🟠 Key Concept 2 — `asyncWrap` Utility

Instead of wrapping every async route in `try { } catch(err) { next(err) }`, a reusable `asyncWrap` higher-order function handles it automatically:

```js
function asyncWrap(fn) {
    return function(req, res, next) {
        fn(req, res, next).catch((err) => next(err));
        //                        ↑ any rejected promise is passed to next()
        //                          which routes it to the error middleware
    }
}
```

**Every async route is wrapped with it:**

```js
// Without asyncWrap — repetitive try/catch on every route
app.get("/chats/:id", async (req, res, next) => {
    try {
        let chat = await Chat.findById(id);
        res.render("show.ejs", { chat });
    } catch(err) {
        next(err);
    }
});

// With asyncWrap — clean, no try/catch needed
app.get("/chats/:id", asyncWrap(async (req, res, next) => {
    let chat = await Chat.findById(id);
    if (!chat) throw new ExpressErorr(404, "Chat not found!");
    res.render("show.ejs", { chat });
}));
```

> 💡 `asyncWrap` is a **higher-order function** — it takes a function and returns a new function. This is the manual precursor to packages like `express-async-errors` which do the same thing automatically.

---

## 🔵 Key Concept 3 — Two-Layer Error Handling Middleware

The project has **two separate error middleware functions** chained together — a pattern for separating error classification from error response:

```js
// ── Layer 1: Classify & log the error ──────────────────────────────
app.use((err, req, res, next) => {
    console.log(err);

    if (err.name === "ValidationError") {
        err = handleValidationErr(err);  // ← intercept Mongoose validation errors
    }

    next(err);  // ← pass to Layer 2
});

// ── Layer 2: Send the response ──────────────────────────────────────
app.use((err, req, res, next) => {
    let { status = 500, message = "Some Error Occurred" } = err;
    res.status(status).send(message);
    //         ↑ uses the status from ExpressErorr (404, etc.)
    //           or defaults to 500 for unknown errors
});
```

```
Error thrown
    │
    ▼
asyncWrap catches → next(err)
    │
    ▼
Layer 1 Middleware → classifies (ValidationError check) → next(err)
    │
    ▼
Layer 2 Middleware → sends HTTP status + message to client
```

### Mongoose ValidationError Handler

```js
const handleValidationErr = (err) => {
    console.log("This is a validation error. Please follow the rules.");
    console.dir(err.message);
    return err;  // ← returns the same error (can be modified here)
};
```

> 💡 This pattern lets you intercept **specific error types** (Mongoose validation, cast errors, auth errors) at Layer 1 and transform them before Layer 2 sends the response.

---

## 🔄 UPDATE route — `runValidators: true`

```js
await Chat.findByIdAndUpdate(
    id,
    { from, msg, to },
    { runValidators: true, new: true }
    //  ↑ critical: by default Mongoose skips schema
    //    validation on update — this option enforces it
);
```

> ⚠️ Without `runValidators: true`, you could update a chat with an empty `from` field even though the schema marks it as `required: true`. Always include this option on updates.

---

## 🌱 DB Seeder — `init.js`

```js
let allChats = [
  { from: "ahsan",  to: "umer",   msg: "Hey Umer, are you free for a quick call?",       created_at: new Date() },
  { from: "laiba",  to: "hamza",  msg: "Please send me the notes from today's lecture.", created_at: new Date() },
  { from: "ali",    to: "hassan", msg: "Don't forget about the group meeting at 6 PM.",  created_at: new Date() },
  { from: "zoya",   to: "amna",   msg: "Happy Birthday Amna! Hope you have a great day!", created_at: new Date() },
  { from: "bilal",  to: "fatima", msg: "Can you review my assignment before submission?", created_at: new Date() },
];

Chat.insertMany(allChats);
```

Run it once to populate the database:

```bash
node init.js
# ✅ Connection is established successfully
# (5 chats inserted into fakewatsapp.chats)
```

---

## 🎨 UI Design — WhatsApp Dark Theme

All views share a consistent **dark WhatsApp-green** design language:

| Element | Style | Effect |
|---------|-------|--------|
| Background | `radial-gradient(#0d1117, #1a1f24, #000)` | Deep dark radial |
| Chat cards | `linear-gradient(#1b1b1b, #252525)` + `border-radius: 20px` | Dark glossy cards |
| Hover effect | `translateY(-5px) scale(1.02)` + green glow | Lift with WhatsApp glow |
| Animated icon | Lordicon `dxjqoygy.json` with `#25d366` colour | Looping 3D chat icon |
| Edit button | `linear-gradient(#25d366, #128c7e)` rounded-pill | WhatsApp green |
| Delete button | `linear-gradient(#ff4747, #b30000)` + trash icon rotate | Red with hover rotation |
| New Chat button | `linear-gradient(#00c46a, #007d3a)` rounded pill + glow | Floating CTA button |
| Forms | `backdrop-filter: blur(8px)` glassmorphism card | Frosted glass look |
| Input focus | `box-shadow: 0 0 8px rgba(37,211,102,0.4)` | Green glow on focus |
| Font | `Poppins` via Google Fonts | Clean modern sans-serif |
| Animation | `fadeInUp` CSS keyframe | Smooth entrance on load |

---

## 🚀 Getting Started

### Prerequisites

```bash
node -v    # v14+
mongod     # MongoDB running on port 27017
```

### Installation

```bash
cd "Express with Mongo project mini watsap"
npm install
```

### Step 1 — Seed the Database

```bash
node init.js
# ✅ Connection is established successfully
```

### Step 2 — Start the Server

```bash
node index.js
# ✅ Connection established successfully
# 🚀 App is listening on port 8080
```

### Step 3 — Open in Browser

```
http://localhost:8080/chats          ← All chats
http://localhost:8080/chats/new      ← New chat form
http://localhost:8080/chats/:id      ← Single chat
http://localhost:8080/chats/:id/edit ← Edit chat
```

---

## ✅ Concepts Covered

```
✅ MongoDB connection to "fakewatsapp" database
✅ Chat schema — from, to, msg (maxLength), created_at (manual Date)
✅ runValidators: true — enforce schema rules on findByIdAndUpdate
✅ Custom ExpressError class — extends Error with status + message
✅ throw new ExpressError(404, "msg") — structured route errors
✅ asyncWrap() — higher-order function to replace try/catch on every route
✅ Two-layer error middleware — classify then respond
✅ ValidationError handler — intercept Mongoose errors by name
✅ method-override — PUT & DELETE from HTML forms
✅ DB seeder (init.js) — Chat.insertMany() with 5 sample chats
✅ Lordicon animated 3D icons — CDN-based loop animations
✅ Font Awesome 6 — icon library throughout all views
✅ Bootstrap 5 dark navbar — collapse, toggler, nav-links
✅ Glassmorphism form card — backdrop-filter blur effect
✅ CSS fadeInUp animation — smooth card entrance on load
✅ WhatsApp-green hover glow — box-shadow on buttons & cards
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
✅ Phase 7 — Express CRUD Project   → MongoDB-backed Student CRUD + Tailwind
📍 Phase 8 — Mini WhatsApp          → Custom Errors + asyncWrap + Dark UI  ← You are here
⬜ Phase 9 — Wanderlust 🏆          → Full-stack production app
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

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=3,8,30&height=100&section=footer" width="100%"/>

*Handle errors gracefully. Wrap async cleanly. Ship confidently. 💬*

</div>