const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
    .then(() => console.log("connection was established"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/dbRelation");
}

// Correct spellings
const OrderSchema = new Schema({
    item: String,
    price: Number
});

// Correct "orders" field + correct ref name
const customerSchema = new Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order"
        }
    ]
});

// customerSchema.pre("findOneAndDelete", async () => {
//     console.log(`pre middleware`)
// });
customerSchema.post("findOneAndDelete", async (customer) => {
if(customer.orders.length){
  let res=  await Order.deleteMany({_id: {$in:customer.orders}  })
  console.log(res)
}
})

// Correct model name
const Order = mongoose.model("Order", OrderSchema);
const Customer = mongoose.model("Customer", customerSchema);


const deleteCustomer = async () => {
    let del = await Customer.findByIdAndDelete( '693026d17aa6799eb14434e1')
    console.log(del)
}
deleteCustomer();

// FIND CUSTOMER
// const findCustomer = async () => {
//     const cus1 = await Customer.find({}).populate("orders");
//     console.log(cus1[0],cus1[1]);
// };
// findCustomer();


// ADD CUSTOMER
// const addCustomer = async () => {
//   let cus1 = new Customer({ name: "Saif Ullah Khalid" });

//   let order1 = await Order.findOne({ item: "bargar" });
//   let order2 = await Order.findOne({ item: "samosa" });

//   cus1.orders.push(order1);
//   cus1.orders.push(order2);

//   let result = await cus1.save();
//   console.log(result);
// };
// addCustomer();

// INSERT ORDERS
// const addOrder = async () => {
//   let result = await Order.insertMany([
//     { item: "samosa", price: 50 },
//     { item: "bargar", price: 130 },
//     { item: "sprite", price: 50 }
//   ]);
//   console.log(result);
// };
// addOrder();

// const addCustomer = async () => {
//     let newCustomer = new Customer({
//         name: "Rana Sami"
//     })
//     let order = new Order({
//         item: "Pizza",
//         price: 450
//     })
//     newCustomer.orders.push(order)

//     await order.save()
//     await newCustomer.save()
//     console.log("custmer order added")
// }

// addCustomer();


//practice function to add customer with their orders

// const newCustomer=async()=>{
//  let customer=new Customer({
//     name:"Umair Sajid",
//  })
//  let order1=new Order({
//  item:"Chiken Burger",
//  price:150
//  })
//  let order2 = new Order({
//     item:"sprite",
//     price:60
//  })
//  customer.orders.push(order1)
//  customer.orders.push(order2)

//  await order1.save()
//  await order2.save()
// let cusData= await customer.save()
// console.log(cusData)
// }

// newCustomer();
