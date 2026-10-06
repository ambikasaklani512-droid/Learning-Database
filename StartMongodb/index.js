const mongoose = require("mongoose");

// connect mongodb
// main()
//     .then(() => {
//         console.log("successful");
//     })
//     .catch((err) => {
//         console.log(err);
//     })

// async function main() {
//     await mongoose.connect("mongodb://127.0.0.1:27017/test");
// }

//schema
// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     age: Number
// });

// collection & model
// const User = mongoose.model("User", userSchema);

// insert one user
// const user1 = new User({
//     name : "Adam",
//     email : "adam@email.com",
//     age : 28,
// })

// save the user
// user1.save().then((res)=>{
//     console.log("user is saved");
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })

// User.insertMany([
//     {
//         name: "Aram",
//         email : "aram@email.com",
//         age: 45,
//     },
//     {
//         name: "Sham",
//         email : "sham@email.com",
//         age: 34,
//     },
//     {
//         name: "Bretty",
//         email : "brettyy@email.com",
//         age: 25,
//     },
// ]).then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// });

// User.findOneAndDelete({name : "Sham"})
//     .then((res) => {
//         console.log(res);
//     }).catch(err => { console.log(err) });

// User.find().then(res => { console.log(res)}).catch(err =>{ console.log(err)});


//new db - bookstore ---->

// connect
main().then(() => {
    console.log("successful");
}).catch(err => { console.log(err) });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/bookstore");
}

// schema
const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 20,
    },
    author: {
        type: String,
    },
    price: {
        type: Number,
        min: [0, "it is not a valid price"],
    },
    discount: {
        type: Number,
        default: 0,
    },
    genre: [String],
    category: {
        type: String,
        enum: ["Life changing", "Fiction"],
    }
});

// model
const Book = mongoose.model("Book", bookSchema);

// insert
// const book1 = new Book({
//     name: "Mindset",
//     author: "Carol S. Dweck",
//     price: 399,
//     genre: "psychology",
//     category: "Life changing",
// })

// book1.save().then(res => { console.log(res) }).catch(err => { console.log(err) });

Book.findByIdAndUpdate("6aa050b040a5764375a7eb55", {price : -100}, { runValidators : true})
.then(res => { console.log(res) }).catch(err => { console.log(err.errors.price.properties.message) });