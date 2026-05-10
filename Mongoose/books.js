const mongoose = require('mongoose');

// Database connection
main()
  .then(() => console.log("Connection successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}

// Define Schema
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique:true,
    maxLength:30,
  },
  author:{
    type:String
  } ,
  price:{
    type: Number,
    min:1,
  },
  discount:{
    type:Number,
    default:false,
  },
  category:{
    type:String,
    enum:["fiction ","Non Fiction"]
  },
  genre:[String]
});

// Create Model
const Book = mongoose.model("Book", bookSchema);

// Create a new book document (use model, not schema)
let book1 = new Book({
  title: "Earth and envirment ",
  author: "Grock",
  price: 300,
  discount:0,
  category:"Non Fiction",
  genre:["non fiction ","enviremenol sense","good book"]
});

// Save to MongoDB
book1
  .save()
  .then((res) => console.log(`Book Saved:, ${res}`))
  .catch((err) => console.log(err));
