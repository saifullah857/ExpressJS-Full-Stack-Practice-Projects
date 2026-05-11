const express = require("express")
const app = express()
const mongoose = require("mongoose")
const { Schema } = mongoose;

main()
    .then(() => console.log("connection was established"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');

}

const UserSchema = new Schema({
    username: String,
    email: String

})
const postSchema = new Schema({
    content: String,
    likes: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const User = mongoose.model("User", UserSchema);
const Post = mongoose.model("Post", postSchema);

// const addData = async () => {

//     let user=await User.findOne({username:"saifullahKhalid"})
//     let post2 = new Post({
//         content: "bye bye :)",
//         likes: 24,
//     })
//     post2.user = user;
   
//     let data = await post2.save()
//     console.log(data)
// }
// addData();

const getData=async()=>{
    let data= await Post.find({}).populate("user")
    console.log(data)
}
getData()