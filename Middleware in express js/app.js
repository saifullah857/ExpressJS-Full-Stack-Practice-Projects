const express = require("express");
const app = express();
const ExpressError = require("./ExpressErrors");

// ✅ Middleware to check token
let checkToken = (req, res, next) => {
  let { token } = req.query;
  if (token === "giveaccess") {
    return next();
  }
  // Throw custom error if token is missing or invalid
  throw new ExpressError(401, "Access Denied");
};

// ✅ Routes
app.get("/", (req, res) => {
  res.send("Hi, I am the root route");
});

app.get("/err", (req, res) => {
  abcd = abcd; // Intentional error for testing
});

app.get("/api", checkToken, (req, res) => {
  res.send("Important data");
});

app.get("/admin",  (req, res) => {
  throw new ExpressError(403,"Access to admin is Forbiden")
});

// ✅ Error-handling middleware (should come last)
app.use((err, req, res, next) => {
  console.log("=========== ERROR ===========");
  // let { status = 500, message = "Something went wrong" } = err;
  let {status = 500,message='Some error ocured'}=err
  res.status(status).send(message);
});

// ✅ Server listener
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
