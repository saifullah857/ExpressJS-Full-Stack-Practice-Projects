const mongoose = require('mongoose');
const Chat=require("./models/chats.js");


main()
  .then(() => console.log("Connection is established successfully"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewatsapp');
}

let allChats=[
  {
    from: "ahsan",
    to: "umer",
    msg: "Hey Umer, are you free for a quick call?",
    created_at: new Date()
  },
  {
    from: "laiba",
    to: "hamza",
    msg: "Please send me the notes from today’s lecture.",
    created_at: new Date()
  },
  {
    from: "ali",
    to: "hassan",
    msg: "Don’t forget about the group meeting at 6 PM.",
    created_at: new Date()
  },
  {
    from: "zoya",
    to: "amna",
    msg: "Happy Birthday Amna! Hope you have a great day!",
    created_at: new Date()
  },
  {
    from: "bilal",
    to: "fatima",
    msg: "Can you review my assignment before submission?",
    created_at: new Date()
  }
]
Chat.insertMany(allChats);
