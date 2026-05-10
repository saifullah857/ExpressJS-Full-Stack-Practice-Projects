<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=47,142,48,20&height=180&section=header&text=Mongoose&fontSize=52&fontColor=fff&animation=twinkling&fontAlignY=38&desc=MongoDB%20%7C%20Schema%20%7C%20Models%20%7C%20CRUD%20%7C%20Validation&descAlignY=58&descSize=16" width="100%"/>

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

![Module](https://img.shields.io/badge/Module-Mongoose%20Basics-880000?style=for-the-badge)
![DB: test](https://img.shields.io/badge/DB-test%20(Users)-47A248?style=for-the-badge)
![DB: amazon](https://img.shields.io/badge/DB-amazon%20(Books)-47A248?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-00C851?style=for-the-badge)

<br/>

> 📂 **Part of:** [ExpressJS Full Stack Practice Projects](../README.md) — `Mongoose` Module

</div>

---

## 📌 About This Module

This module introduces **Mongoose** — the ODM (Object Data Modeling) library that bridges Node.js and MongoDB. Instead of writing raw MongoDB queries, Mongoose lets you define **Schemas**, create **Models**, and perform all database operations using clean, readable JavaScript.

The module is split into **two practice files**, each connecting to a different MongoDB database and demonstrating a different set of concepts:

| File | Database | Collection | Focus |
|------|----------|------------|-------|
| `index.js` | `test` | `users` | Connect → Schema → Model → Full CRUD |
| `books.js` | `amazon` | `books` | Schema Validation — required, unique, enum, min, default, array |

---

## 🗂️ Folder Structure

```
Mongoose/
│
├── 📄 index.js      ← User schema + all CRUD operations (with commented examples)
├── 📄 books.js      ← Book schema with full validation rules
└── 📦 package.json  ← Single dependency: mongoose ^8.19.3
```

---

## ⚙️ Tech Stack

<div align="center">

| Technology | Version | Purpose |
|---|---|---|
| ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=nodedotjs&logoColor=white&style=flat) | Latest LTS | JavaScript runtime environment |
| ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white&style=flat) | Local `27017` | NoSQL document database |
| ![Mongoose](https://img.shields.io/badge/-Mongoose-880000?style=flat) | `^8.19.3` | Schema, models, validation & queries |

</div>

---

## 📄 File 1 — `index.js` (User CRUD)

**Database:** `mongodb://127.0.0.1:27017/test`
**Collection:** `users`

### Step 1 — Connect to MongoDB

```js
const mongoose = require('mongoose');

main().then(() => {
    console.log("Connection successful");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}
```

### Step 2 — Define Schema

```js
const userSchema = mongoose.Schema({
    name:  String,
    email: String,
    age:   Number,
});
```

### Step 3 — Create Model

```js
const User = mongoose.model("User", userSchema);
// Mongoose auto-creates a "users" collection in MongoDB
```

---

### CRUD Operations Practiced

#### ➕ Create — Single Document

```js
const user2 = new User({
    name:  "Mam Hira",
    email: "hira@gmail.com",
    age:   25
});
user2.save()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
```

#### ➕ Create — Multiple Documents

```js
User.insertMany([
    { name: "Aleesha",     email: "aleesha@gmail.com", age: 23 },
    { name: "Muskan",      email: "muskan@gmail.com",  age: 22 },
    { name: "QuratulAin",  email: "qura@gmail.com",    age: 22 },
]).then((res) => console.log(res));
```

#### 🔍 Read — Find by ID

```js
User.findById("690c2d2dac386fa46987a266")
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
```

#### ✏️ Update — Find & Update

```js
User.findOneAndUpdate(
    { name: "Hira Mam" },           // filter
    { name: "Hira Akbar" },         // update
    { new: true }                   // return updated doc
).then((res) => console.log(res))
 .catch((err) => console.log(err));
```

#### 🗑️ Delete — Find One & Delete

```js
User.findOneAndDelete({ name: "Aleesha" })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
```

#### 🗑️ Delete — Delete One

```js
User.deleteOne({ name: "Muskan" })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
```

---

## 📄 File 2 — `books.js` (Schema Validation)

**Database:** `mongodb://127.0.0.1:27017/amazon`
**Collection:** `books`

This file focuses on **Schema Validation** — restricting what data can be saved into MongoDB at the model level.

### Book Schema with Full Validation

```js
const bookSchema = new mongoose.Schema({
    title: {
        type:      String,
        required:  true,      // ← field cannot be empty
        unique:    true,      // ← no duplicate titles allowed
        maxLength: 30,        // ← max 30 characters
    },
    author: {
        type: String
    },
    price: {
        type: Number,
        min:  1,              // ← price must be at least 1
    },
    discount: {
        type:    Number,
        default: false,       // ← defaults to false if not provided
    },
    category: {
        type: String,
        enum: ["fiction", "Non Fiction"]  // ← only these two values allowed
    },
    genre: [String]           // ← array of strings
});
```

### Validation Rules Summary

| Field | Type | Rules Applied |
|-------|------|---------------|
| `title` | String | `required`, `unique`, `maxLength: 30` |
| `author` | String | No validation |
| `price` | Number | `min: 1` |
| `discount` | Number | `default: false` |
| `category` | String | `enum: ["fiction", "Non Fiction"]` |
| `genre` | [String] | Array of strings |

### Creating & Saving a Book

```js
const Book = mongoose.model("Book", bookSchema);

let book1 = new Book({
    title:    "Earth and Environment",
    author:   "Grock",
    price:    300,
    discount: 0,
    category: "Non Fiction",
    genre:    ["non fiction", "environmental science", "good book"]
});

book1.save()
    .then((res) => console.log(`Book Saved: ${res}`))
    .catch((err) => console.log(err));
```

---

## 🔑 Key Concepts Covered

### Schema vs Model

```
mongoose.Schema(...)         → defines the SHAPE of a document (blueprint)
mongoose.model("Name", schema) → creates the CLASS to interact with the collection
```

> 💡 Mongoose automatically **pluralises & lowercases** the model name:
> `"User"` → `users` collection, `"Book"` → `books` collection

### `{ new: true }` in Updates

```js
User.findOneAndUpdate(filter, update, { new: true })
//  Without { new: true }  →  returns the OLD document
//  With    { new: true }  →  returns the UPDATED document  ✅
```

### `.save()` vs `insertMany()`

| Method | Use When |
|--------|----------|
| `new Model({...}).save()` | Inserting a single document with full control |
| `Model.insertMany([...])` | Bulk inserting multiple documents at once |

### Array Fields in Schema

```js
genre: [String]
// Stored as: ["non fiction", "environmental science", "good book"]
// A native MongoDB array — no extra config needed
```

---

## 🚀 Getting Started

### Prerequisites

Make sure MongoDB is **running locally**:

```bash
mongod
# or
mongosh   # to verify connection
```

### Installation

```bash
# Navigate to the folder
cd Mongoose

# Install dependencies
npm install

# Run User CRUD file
node index.js
# ✅ Connection successful

# Run Book Schema file
node books.js
# ✅ Connection successful
# ✅ Book Saved: ...
```

> 💡 **To test different operations** in `index.js`, comment/uncomment the relevant CRUD blocks — each block demonstrates a different Mongoose method.

---

## ✅ Concepts Covered

```
✅ mongoose.connect()              →  connect to local MongoDB
✅ mongoose.Schema()               →  define document structure
✅ mongoose.model()                →  create collection interface
✅ new Model({}).save()            →  insert single document
✅ Model.insertMany([])            →  bulk insert documents
✅ Model.findById()                →  find by MongoDB _id
✅ Model.findOneAndUpdate()        →  find & update with { new: true }
✅ Model.findOneAndDelete()        →  find & delete by field
✅ Model.deleteOne()               →  delete first matching document
✅ Schema validation — required    →  field must be present
✅ Schema validation — unique      →  no duplicate values
✅ Schema validation — maxLength   →  string length limit
✅ Schema validation — min         →  minimum numeric value
✅ Schema validation — default     →  fallback value if not provided
✅ Schema validation — enum        →  restrict to allowed values only
✅ Array fields [String]           →  store arrays in MongoDB documents
```

---

## 🗺️ Where This Fits in the Journey

```
✅ Phase 1 — ExpressJs           → Basics: routing, EJS, dynamic pages
✅ Phase 2 — ExpressJsClassTwo   → GET/POST, req.query/body, JS OOP
✅ Phase 3 — Rest In Express     → Full CRUD REST API with method-override
📍 Phase 4 — Mongoose            → MongoDB + ODM schemas & validation  ← You are here
⬜ Phase 5 — Restfull Api 01     → Student API + File Uploads
⬜ Phase 6 — Wanderlust 🏆       → Full-stack production app
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

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=47,142,48,20&height=100&section=footer" width="100%"/>

*Schema first. Always. 🍃*

</div>