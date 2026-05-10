const mongoose = require('mongoose');

main().then((res)=>{
    console.log("Connection successfuly");
}).catch((err)=>{
    console.log(err);
});         
                  
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

}

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    age:Number,
});

 const User=mongoose.model("User",userSchema);


//  User.deleteOne({name:"Muskan"}).then((res)=>console.log(res)).catch((err)=>console.log(err));

 User.findOneAndDelete({name:"Aleesha"}).then((res)=>console.log(res)).catch((err)=>console.log(err));


//  User.findOneAndUpdate({name:"Hira Mam"},{name:"Hira Akbar"},{new:true}).then((res)=>console.log(res)).catch((err)=>console.log(err))

//  User.findById("690c2d2dac386fa46987a266").then((res)=>console.log(res)).catch((err)=>console.log(err));



//  const user2 = new  User({
//     name:"Mam Hira",
//     email:"hira@gmail.com",
//     age:25
//  })
//  user2.save().then((res)=>console.log(res)).catch((err)=>console.log(err));

// User.insertMany([
//     {name:"Aleesha",email:"aleesha@gmail.com",age:23},
//     {name:"Muskan",email:"muskan@gmail.com",age:22},
//     {name:"QuratulAin",email:"qura@gmail.com",age:22},
// ]).then((res)=>console.log(res));