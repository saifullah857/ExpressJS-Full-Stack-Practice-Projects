<div align="center">

<!-- Animated Header -->
<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=30&pause=1000&color=00D4FF&center=true&vCenter=true&width=600&lines=🚀+ExpressJS+Basics;Routing+%7C+EJS+Templates+%7C+Dynamic+Pages;From+Zero+to+First+Express+Server!" alt="Typing SVG" />

<br/>

<!-- Badges Row 1 -->
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

<!-- Badges Row 2 -->
![Status](https://img.shields.io/badge/Status-Active-00C851?style=for-the-badge)
![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/Express-v5.1.0-orange?style=for-the-badge)
![Port](https://img.shields.io/badge/Port-8080-purple?style=for-the-badge)

<br/>

> 📂 **Part of:** [ExpressJS Full Stack Practice Projects](../README.md) — `Basics` Module

<hr/>

</div>

## 📌 About This Module

This is the **foundational module** of the ExpressJS learning journey — where it all begins! This folder covers the very first steps of building a web server with Express.js: setting up routes, rendering dynamic HTML with **EJS templating**, and passing data from the server to views.

---

## 🗂️ Folder Structure

```
ExpressJs/
├── 📄 index.js           ← Main server entry point
├── 📦 package.json       ← Project metadata & dependencies
├── 🗃️ data.json          ← Mock Instagram user data
└── 📁 views/
    ├── 🏠 index.ejs      ← Home page template
    ├── 🎲 roledice.ejs   ← Dice roller page
    ├── 📸 instagram.ejs  ← Instagram profile viewer
    └── 🎨 style.css      ← Shared stylesheet
```

---

## ⚙️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=nodedotjs&logoColor=white&style=flat) | Latest LTS | JavaScript runtime |
| ![Express](https://img.shields.io/badge/-Express.js-000000?logo=express&logoColor=white&style=flat) | `^5.1.0` | Web server framework |
| ![EJS](https://img.shields.io/badge/-EJS-B4CA65?logo=ejs&logoColor=black&style=flat) | `^3.1.10` | Server-side HTML templating |

---

## 🛣️ API Routes

| Method | Route | Description | View |
|--------|-------|-------------|------|
| `GET` | `/` | 🏠 Home page | `index.ejs` |
| `GET` | `/roledice` | 🎲 Roll a random dice (1–6) | `roledice.ejs` |
| `GET` | `/ig/:username` | 📸 Instagram profile viewer | `instagram.ejs` |

---

## ✨ Features Covered

- ✅ **Basic Express Server** — spinning up a server on port `8080`
- ✅ **EJS View Engine** — `app.set("view engine", "ejs")`
- ✅ **Static Routing** — simple `GET` routes rendering EJS views
- ✅ **Dynamic Routing** — route parameters with `req.params`
- ✅ **Passing Data to Views** — server → template variable injection
- ✅ **Reading JSON Data** — loading and querying `data.json`
- ✅ **URL Normalization** — converting spaces to underscores for clean lookups

---

## 🚀 Getting Started

### Prerequisites

Make sure you have **Node.js** installed:

```bash
node -v   # Should be v14+
npm -v
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/saifullah857/<repo-name>.git

# 2. Navigate to this module
cd ExpressJs

# 3. Install dependencies
npm install

# 4. Start the server
node index.js
```

### 🌐 Open in Browser

```
http://localhost:8080/           → Home Page
http://localhost:8080/roledice   → Dice Roller
http://localhost:8080/ig/hr_manager  → Instagram Profile Demo
```

---

## 🎲 Demo Highlights

### Dice Roller `/roledice`
Every time you visit this route, the server generates a **random dice value (1–6)** and injects it into the EJS template — a clean demonstration of server-side data passing.

```js
app.get("/roledice", (req, res) => {
  let diceValue = Math.floor(Math.random() * 6) + 1;
  res.render("roledice.ejs", { diceValue });
});
```

### Instagram Profile Viewer `/ig/:username`
A mock profile page that reads from `data.json`, looks up the username dynamically, and renders a styled profile — simulating real-world dynamic data rendering.

```js
app.get("/ig/:username", (req, res) => {
  const instaData = require("./data.json");
  let { username } = req.params;
  username = username.toLowerCase().replace(/ /g, "_");
  let data = instaData[username];
  data ? res.render("instagram.ejs", { data }) : res.send("User not found!");
});
```

---

## 📚 Concepts Learned

```
Express Server Setup
      │
      ├── app.set("view engine", "ejs")
      ├── app.get("/", ...) ─── Static Route
      ├── app.get("/roledice", ...) ─── Dynamic Server Logic
      └── app.get("/ig/:username", ...) ─── Route Parameters
                  │
                  └── req.params → data lookup → res.render(view, data)
```

---

## 📦 Dependencies

```json
{
  "express": "^5.1.0",
  "ejs": "^3.1.10"
}
```

---

## 🗺️ Learning Path

> This module is **step 1** of the full learning journey:

```
[📍 You are here]
ExpressJs (Basics)
    │
    ▼
ExpressJsClassTwo
    │
    ▼
Middleware in Express.js
    │
    ▼
Rest In Express
    │
    ▼
Restfull Api Project 01
    │
    ▼
Express with Mongo (Mini Project)
    │
    ▼
Express js CRUD Project
    │
    ▼
Express Major Project 🏆
```

---

## 👨‍💻 Author

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-saifullah857-181717?style=for-the-badge&logo=github)](https://github.com/saifullah857)
[![Made With Love](https://img.shields.io/badge/Made%20With-❤️-red?style=for-the-badge)]()

*Building from Basics → Real-World Full-Stack Applications using Express.js*

</div>

---

<div align="center">

⭐ **If this helped you, give the repo a star!** ⭐

![Footer](https://capsule-render.vercel.app/api?type=waving&color=00D4FF&height=100&section=footer)

</div>