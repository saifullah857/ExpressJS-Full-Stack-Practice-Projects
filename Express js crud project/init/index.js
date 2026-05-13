const mongoose=require("mongoose")
const initData=require("./data")
const studentListing = require("../models/student.js");

main()
    .then(() => console.log(`connected to DB`))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/studentDb');
}
const initDB=async()=>{
    await studentListing.deleteMany({})
    await studentListing.insertMany(initData.data)
  console.log(`data is intialized`)
}

initDB();