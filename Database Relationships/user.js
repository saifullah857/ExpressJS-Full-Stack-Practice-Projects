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
    addresses: [{
        _id:false,
        location: String,
        city: String,
    }]
})

const User = mongoose.model("User", UserSchema);

let addUserData = async () => {
    let user1 = new User({
        username: "Saif Ullah Khalid",
        addresses:
            [{

                location: "Kot Wassan Singh",
                city: "Phool Nagar"
            }]
    })
    user1.addresses.push({ location: "Aspire College Phool Nagar", city: "Phool Nagar" })
    let result = await user1.save() 
    console.log(result)
}

addUserData()