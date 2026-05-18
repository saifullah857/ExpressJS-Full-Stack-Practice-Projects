<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=9,20,24,12&height=180&section=header&text=Middleware%20in%20Express.js&fontSize=40&fontColor=fff&animation=twinkling&fontAlignY=38&desc=Token%20Auth%20%7C%20Custom%20Errors%20%7C%20Error%20Middleware%20%7C%20next()&descAlignY=58&descSize=15" width="100%"/>

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

![Module](https://img.shields.io/badge/Module-Middleware%20Practice-9333ea?style=for-the-badge)
![Port](https://img.shields.io/badge/Port-8080-f97316?style=for-the-badge)
![Files](https://img.shields.io/badge/Files-2-6366f1?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-00C851?style=for-the-badge)

<br/>

> 📂 **Part of:** [ExpressJS Full Stack Practice Projects](../README.md) — `Middleware in Express.js` Module

</div>

---

## 📌 About This Module

This module is a **focused deep-dive into Express middleware** — arguably the most important concept to master in the entire Express ecosystem. Everything in Express (routing, parsing, auth, error handling) is built on middleware. This project strips everything else away and practices middleware concepts in isolation with just two files and no database.

| File | Purpose |
|------|---------|
| `app.js` | All routes + custom middleware + error middleware |
| `ExpressErrors.js` | Custom error class with `status` + `message` |

---

## 🗂️ Folder Structure

```
Middleware in express js/
│
├── 📄 app.js            ← Express server: routes, token middleware, error handler
├── 📄 ExpressErrors.js  ← Custom error class extending Error
└── 📦 package.json      ← Single dependency: express ^5.1.0
```

---

## ⚙️ Tech Stack

<div align="center">

| Technology | Version | Purpose |
|---|---|---|
| ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=nodedotjs&logoColor=white&style=flat) | Latest LTS | JavaScript runtime |
| ![Express.js](https://img.shields.io/badge/-Express.js-000?logo=express&logoColor=white&style=flat) | `^5.1.0` | Web framework & middleware engine |

</div>

---

## 🛣️ Routes Overview

| Method | Route | Middleware | Behaviour |
|--------|-------|-----------|-----------|
| `GET` | `/` | None | ✅ Returns `"Hi, I am the root route"` — always accessible |
| `GET` | `/err` | None | 💥 Intentional runtime error — tests error middleware |
| `GET` | `/api` | `checkToken` | 🔒 Returns `"Important data"` only if `?token=giveaccess` |
| `GET` | `/admin` | None | 🚫 Always throws `403 Forbidden` — simulates restricted route |

---

## 🔑 Core Concept 1 — What is Middleware?

Middleware is any function with access to `req`, `res`, and `next`. It sits in the **middle** of the request-response cycle and can:

```
Incoming Request
      │
      ▼
  Middleware 1  →  (modify req/res, then call next())
      │
      ▼
  Middleware 2  →  (check token, log, validate...)
      │
      ▼
  Route Handler →  (send final response)
      │
      ▼
Outgoing Response
```

```js
// Anatomy of a middleware function
let myMiddleware = (req, res, next) => {
    // 1. Do something (log, check, modify)
    console.log("Middleware ran!");

    // 2. Call next() to pass control to the next middleware/route
    next();

    // OR send a response to stop the chain:
    // res.send("Blocked!");
};
```

> 💡 If you **don't call `next()`** and don't send a response, the request will hang forever. Always do one or the other.

---

## 🔑 Core Concept 2 — Route-Specific Middleware (`checkToken`)

Instead of applying middleware globally with `app.use()`, this project applies it **only to specific routes** by passing it as a second argument:

```js
// ── Token validation middleware ──────────────────────────────────────
let checkToken = (req, res, next) => {
    let { token } = req.query;      // ← reads ?token= from the URL

    if (token === "giveaccess") {
        return next();              // ← token valid → pass to route handler
    }

    throw new ExpressError(401, "Access Denied");
    // ← token missing/wrong → throw structured error → caught by error middleware
};

// ── Applied to /api route ONLY ────────────────────────────────────────
app.get("/api", checkToken, (req, res) => {
    //           ↑ middleware runs BEFORE the handler
    res.send("Important data");
});
```

**Testing in browser:**

```
/api                            → 401 Access Denied      (no token)
/api?token=wrongvalue           → 401 Access Denied      (wrong token)
/api?token=giveaccess           → "Important data" ✅    (correct token)
```

> 💡 Multiple middleware can be chained on one route:
> `app.get("/route", mw1, mw2, mw3, handler)`
> They execute **left to right** — each must call `next()` to continue.

---

## 🔑 Core Concept 3 — Custom `ExpressError` Class

> **File:** `ExpressErrors.js`

```js
class ExpressError extends Error {
    constructor(status, message) {
        super();                  // ← calls parent Error constructor
        this.status  = status;   // ← HTTP status code (401, 403, 404, 500...)
        this.message = message;  // ← human-readable description
    }
}

module.exports = ExpressError;
```

**Why custom over plain `Error`:**

```js
// ❌ Plain Error — no status code
throw new Error("Access Denied");
// → error middleware receives it with no status → defaults to 500

// ✅ Custom ExpressError — structured with status
throw new ExpressError(401, "Access Denied");
// → error middleware reads status=401 → sends correct HTTP response
```

**Used across routes:**

```js
// Route-level guard (via middleware)
throw new ExpressError(401, "Access Denied");    // Unauthorized

// Directly inside a route handler
throw new ExpressError(403, "Access to admin is Forbidden");  // Forbidden
```

---

## 🔑 Core Concept 4 — Error-Handling Middleware

Express identifies error-handling middleware by its **4-parameter signature** `(err, req, res, next)`. It must be declared **last** — after all routes.

```js
// ── Error-handling middleware ── MUST be defined LAST ─────────────────
app.use((err, req, res, next) => {
    console.log("=========== ERROR ===========");

    // Destructure with defaults — handles both ExpressError and unknown errors
    let { status = 500, message = "Some error occurred" } = err;

    res.status(status).send(message);
    //         ↑ sends the correct HTTP status code back to the client
});
```

**How errors reach here:**

```
throw new ExpressError(401, "Access Denied")
            │
            ▼
  Express catches it automatically
            │
            ▼
  Skips all normal route/middleware
            │
            ▼
  Jumps directly to (err, req, res, next) handler
            │
            ▼
  res.status(401).send("Access Denied")
```

> ⚠️ **Position matters critically.** If error middleware is declared before routes, it will never receive errors from those routes. Always place it at the very bottom of `app.js`.

---

## 🔑 Core Concept 5 — Intentional Error Route (`/err`)

```js
app.get("/err", (req, res) => {
    abcd = abcd;  // ← ReferenceError: abcd is not defined
});
```

This route exists purely to **test** that the error middleware catches unexpected runtime errors too — not just manually thrown `ExpressError` instances.

```
GET /err
  → ReferenceError thrown (no status, no message on the error)
  → error middleware catches it
  → { status = 500, message = "Some error occurred" }  ← defaults kick in
  → res.status(500).send("Some error occurred")
```

> 💡 This proves the `status = 500` and `message = "Some error occurred"` **destructuring defaults** are working — without them, the server would crash or send an empty response.

---

## 📊 Error Scenarios — Full Map

| Route | Trigger | Error Type | Status | Response |
|-------|---------|-----------|--------|----------|
| `/api` (no token) | `checkToken` throws | `ExpressError` | `401` | `Access Denied` |
| `/api?token=wrong` | `checkToken` throws | `ExpressError` | `401` | `Access Denied` |
| `/admin` | Route throws directly | `ExpressError` | `403` | `Access to admin is Forbidden` |
| `/err` | Runtime `ReferenceError` | Native JS Error | `500` | `Some error occurred` |
| `/api?token=giveaccess` | No error | — | `200` | `Important data` |
| `/` | No error | — | `200` | `Hi, I am the root route` |

---

## 🔄 Middleware Execution Flow — Full Picture

```
                     app.get("/api", checkToken, handler)
                                │
              ┌─────────────────┴──────────────────┐
              │                                    │
         token=giveaccess                   no/wrong token
              │                                    │
        next() called                   throw ExpressError(401)
              │                                    │
         Route handler                    Skip all routes
         res.send("data")                          │
                                      Error middleware fires
                                      res.status(401).send(msg)
```

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
cd "Middleware in express js"

# Install dependencies
npm install

# Start the server
node app.js
# ✅ Server is listening on port 8080
```

### Test All Scenarios in Browser

```
http://localhost:8080/                          → Root route (always works)
http://localhost:8080/api                       → 401 Access Denied
http://localhost:8080/api?token=wrongvalue      → 401 Access Denied
http://localhost:8080/api?token=giveaccess      → Important data ✅
http://localhost:8080/admin                     → 403 Forbidden
http://localhost:8080/err                       → 500 Some error occurred
```

---

## ✅ Concepts Covered

```
✅ Middleware function signature — (req, res, next)
✅ next() — passing control to the next middleware/route
✅ Route-specific middleware — app.get("/route", middleware, handler)
✅ Token-based access control — req.query.token check
✅ Custom ExpressError class — extends Error with status + message
✅ throw new ExpressError() — structured error creation in routes
✅ Error-handling middleware — 4-parameter (err, req, res, next)
✅ Destructuring with defaults — { status = 500, message = "..." } = err
✅ res.status(code).send(msg) — sending correct HTTP status codes
✅ Intentional runtime error — testing error middleware with ReferenceError
✅ Error middleware position — must be declared LAST in app.js
✅ 401 Unauthorized vs 403 Forbidden — correct status code usage
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
✅ Phase 8 — Mini WhatsApp          → Custom Errors + asyncWrap + Dark UI
📍 Phase 9 — Middleware in Express  → Token Auth + Error Handling  ← You are here
⬜ Phase 10 — Wanderlust 🏆         → Full-stack production app
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

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=9,20,24,12&height=100&section=footer" width="100%"/>

*next() or respond. There is no third option. ⚡*

</div>