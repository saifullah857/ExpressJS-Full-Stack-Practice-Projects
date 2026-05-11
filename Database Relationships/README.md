<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,14,24,30&height=180&section=header&text=Database%20Relationships&fontSize=42&fontColor=fff&animation=twinkling&fontAlignY=38&desc=Embedded%20Docs%20%7C%20Referenced%20Docs%20%7C%20Populate%20%7C%20Mongoose%20Middleware&descAlignY=58&descSize=15" width="100%"/>

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

![Module](https://img.shields.io/badge/Module-Database%20Relationships-6c5ce7?style=for-the-badge)
![Embedded](https://img.shields.io/badge/Embedded-Documents-47A248?style=for-the-badge)
![Referenced](https://img.shields.io/badge/Referenced-Documents-0078D4?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-00C851?style=for-the-badge)

<br/>

> 📂 **Part of:** [ExpressJS Full Stack Practice Projects](../README.md) — `Database Relationships` Module

</div>

---

## 📌 About This Module

This module covers one of the most important topics in backend development — **how to model relationships between data in MongoDB using Mongoose**. Unlike SQL databases with JOIN tables, MongoDB offers two distinct strategies for linking related data, and this module practices both hands-on across three real files.

| File | Database | Relationship Type | Pattern |
|------|----------|------------------|---------|
| `user.js` | `relationDemo` | User ↔ Addresses | **Embedded Documents** |
| `post.js` | `relationDemo` | User ↔ Posts | **Referenced Documents** + `populate()` |
| `customer.js` | `dbRelation` | Customer ↔ Orders | **Referenced Documents** + **Mongoose Middleware** |

---

## 🗂️ Folder Structure

```
Database Relationships/
│
├── 📄 user.js       ← Embedded documents: User with nested addresses array
├── 📄 post.js       ← Referenced documents: Post stores User ObjectId + populate()
├── 📄 customer.js   ← Referenced + post middleware: cascade delete orders on customer delete
└── 📦 package.json  ← Dependencies: express ^5.2.1, mongoose ^9.0.0
```

---

## ⚙️ Tech Stack

<div align="center">

| Technology | Version | Purpose |
|---|---|---|
| ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=nodedotjs&logoColor=white&style=flat) | Latest LTS | JavaScript runtime |
| ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white&style=flat) | Local `27017` | NoSQL document database |
| ![Mongoose](https://img.shields.io/badge/-Mongoose-880000?style=flat) | `^9.0.0` | ODM — schemas, models, populate, middleware |
| ![Express](https://img.shields.io/badge/-Express.js-000?logo=express&logoColor=white&style=flat) | `^5.2.1` | Included as dependency |

</div>

---

## 🔵 Strategy 1 — Embedded Documents

> **File:** `user.js` | **DB:** `relationDemo`

In this strategy, related data lives **directly inside the parent document** as a nested array. No separate collection needed.

### When to Use Embedded

- The child data **belongs only** to one parent (e.g. a user's own addresses)
- You always fetch the child data **together** with the parent
- The child data is **small and bounded** in size

### Schema

```js
const UserSchema = new Schema({
    username: String,
    addresses: [{
        _id:     false,         // ← disables auto _id on each address subdocument
        location: String,
        city:     String,
    }]
});

const User = mongoose.model("User", UserSchema);
```

> 💡 `_id: false` — by default Mongoose adds an `_id` to every subdocument in an array. Setting it to `false` removes that, keeping address objects clean and lightweight.

### Adding Embedded Data

```js
let addUserData = async () => {
    let user1 = new User({
        username: "Saif Ullah Khalid",
        addresses: [{
            location: "Kot Wassan Singh",
            city:     "Phool Nagar"
        }]
    });

    // Push more addresses into the embedded array
    user1.addresses.push({
        location: "Aspire College Phool Nagar",
        city:     "Phool Nagar"
    });

    let result = await user1.save();
    console.log(result);
};
```

### How It Looks in MongoDB

```json
{
  "_id": "...",
  "username": "Saif Ullah Khalid",
  "addresses": [
    { "location": "Kot Wassan Singh",         "city": "Phool Nagar" },
    { "location": "Aspire College Phool Nagar","city": "Phool Nagar" }
  ]
}
```

---

## 🟠 Strategy 2 — Referenced Documents + `populate()`

> **File:** `post.js` | **DB:** `relationDemo`

In this strategy, documents in **separate collections** are linked using **ObjectId references**. Mongoose's `.populate()` method resolves those references at query time — similar to a SQL JOIN.

### When to Use Referenced

- The child data is **shared** or **reused** across multiple parents
- You sometimes need child data **independently** of the parent
- The relationship is **one-to-many** with unbounded growth

### Schemas

```js
const UserSchema = new Schema({
    username: String,
    email:    String,
});

const postSchema = new Schema({
    content: String,
    likes:   Number,
    user: {
        type: Schema.Types.ObjectId,   // ← stores just the _id of the User
        ref:  "User"                   // ← tells populate() which model to look up
    }
});

const User = mongoose.model("User", UserSchema);
const Post = mongoose.model("Post", postSchema);
```

### Linking a Post to a User

```js
const addData = async () => {
    let user = await User.findOne({ username: "saifullahKhalid" });

    let post2 = new Post({
        content: "bye bye :)",
        likes:   24,
    });

    post2.user = user;   // ← assigns the full user object; Mongoose extracts the _id

    let data = await post2.save();
    console.log(data);
    // Saved as: { content: "bye bye :)", likes: 24, user: ObjectId("...") }
};
```

### Fetching with `populate()`

```js
const getData = async () => {
    let data = await Post.find({}).populate("user");
    console.log(data);
};
getData();
```

**Without populate:**
```json
{ "content": "bye bye :)", "likes": 24, "user": "64abc123..." }
```

**With populate:**
```json
{
  "content": "bye bye :)",
  "likes": 24,
  "user": {
    "_id":      "64abc123...",
    "username": "saifullahKhalid",
    "email":    "saif@gmail.com"
  }
}
```

> `.populate("user")` replaces the stored `ObjectId` with the **full User document** automatically.

---

## 🔴 Strategy 3 — Referenced Documents + Mongoose Middleware (Cascade Delete)

> **File:** `customer.js` | **DB:** `dbRelation`

This file builds on referencing and adds **Mongoose post middleware** — a hook that automatically runs after a database operation. Here it solves the **orphaned documents problem**: when a Customer is deleted, all their linked Orders should also be deleted.

### Schemas

```js
const OrderSchema = new Schema({
    item:  String,
    price: Number,
});

const customerSchema = new Schema({
    name:   String,
    orders: [{
        type: Schema.Types.ObjectId,
        ref:  "Order"              // ← references the Order model
    }]
});
```

### The Cascade Delete Middleware

```js
// Runs AFTER findOneAndDelete completes
customerSchema.post("findOneAndDelete", async (customer) => {
    if (customer.orders.length) {
        // Delete all orders whose _id is in customer's orders array
        let res = await Order.deleteMany({ _id: { $in: customer.orders } });
        console.log(res);
    }
});
```

```
Customer deleted   →   post hook fires   →   all linked Orders deleted   ✅
```

> 💡 **Why this matters:** Without this middleware, deleting a Customer would leave orphaned `Order` documents in the database — data that belongs to nobody and wastes storage.

### Models & Operations

```js
const Order    = mongoose.model("Order",    OrderSchema);
const Customer = mongoose.model("Customer", customerSchema);
```

**Insert Orders:**
```js
await Order.insertMany([
    { item: "samosa", price: 50  },
    { item: "bargar", price: 130 },
    { item: "sprite", price: 50  }
]);
```

**Add Customer with Orders:**
```js
let cus1   = new Customer({ name: "Saif Ullah Khalid" });
let order1 = await Order.findOne({ item: "bargar" });
let order2 = await Order.findOne({ item: "samosa" });

cus1.orders.push(order1);
cus1.orders.push(order2);
await cus1.save();
```

**Fetch with Populate:**
```js
const cus1 = await Customer.find({}).populate("orders");
console.log(cus1[0], cus1[1]);
```

**Delete Customer (cascade deletes Orders automatically):**
```js
const deleteCustomer = async () => {
    let del = await Customer.findByIdAndDelete("693026d17aa6799eb14434e1");
    console.log(del);
    // post middleware auto-fires → linked orders deleted
};
deleteCustomer();
```

---

## 📊 Embedded vs Referenced — Side by Side

| | Embedded Documents | Referenced Documents |
|---|---|---|
| **Storage** | All in one document | Separate collections |
| **Query** | Single read | Requires `.populate()` |
| **Use case** | Private, bounded child data | Shared, reusable data |
| **Example** | User → Addresses | User → Posts, Customer → Orders |
| **Deletion** | Auto-deleted with parent | Needs manual / middleware cleanup |
| **`_id` on subdocs** | Optional (`_id: false`) | Always has own `_id` |

---

## 🔑 Key Concepts Summary

```
Schema.Types.ObjectId    →  stores a reference to another document's _id
ref: "ModelName"         →  tells populate() which collection to look up
.populate("field")       →  replaces ObjectId with the full document at query time
$in: [array]             →  MongoDB operator: matches any value in the array
.deleteMany({ $in })     →  bulk delete all documents whose _id is in the array
schema.post("hook", fn)  →  Mongoose middleware that runs AFTER the operation
_id: false               →  disables auto-generated _id on embedded subdocuments
```

---

## 🚀 Getting Started

### Prerequisites

```bash
mongod       # MongoDB must be running locally on port 27017
node -v      # v14+
```

### Installation

```bash
cd "Database Relationships"
npm install
```

### Run Each File

```bash
# Embedded documents — User with addresses
node user.js

# Referenced documents — Posts with User reference + populate
node post.js

# Referenced + middleware — Customer cascade delete
node customer.js
```

> 💡 To test different operations inside `customer.js`, comment/uncomment the relevant function blocks — each one (`addOrder`, `addCustomer`, `findCustomer`, `deleteCustomer`) demonstrates a different step.

---

## ✅ Concepts Covered

```
✅ Embedded documents         →  nested arrays inside a parent schema
✅ _id: false                 →  clean subdocuments without auto _id
✅ Referenced documents        →  Schema.Types.ObjectId + ref
✅ .populate()                 →  replace ObjectId with full document
✅ $in operator                →  match multiple IDs in one query
✅ deleteMany with $in         →  bulk delete by array of ObjectIds
✅ schema.post() middleware    →  hook that runs after a DB operation
✅ Cascade delete pattern      →  clean up orphaned documents automatically
✅ insertMany()                →  bulk insert related documents
✅ findOne() to get reference  →  fetch then assign for referencing
✅ .push() on ref array        →  add references to a parent document
✅ Two databases in one module →  relationDemo + dbRelation
```

---

## 🗺️ Where This Fits in the Journey

```
✅ Phase 1 — ExpressJs              → Basics: routing, EJS, dynamic pages
✅ Phase 2 — ExpressJsClassTwo      → GET/POST, req.query/body, JS OOP
✅ Phase 3 — Rest In Express        → Full CRUD REST API
✅ Phase 4 — Mongoose               → MongoDB schemas, models & validation
📍 Phase 5 — Database Relationships → Embedded, Referenced & Middleware  ← You are here
⬜ Phase 6 — Restfull Api 01        → Student API + File Uploads
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

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,14,24,30&height=100&section=footer" width="100%"/>

*Model your data well. Everything else follows. 🔗*

</div>