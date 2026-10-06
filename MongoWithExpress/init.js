const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main().then(() => { console.log("successful") }).catch(err => { console.log(err) });
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/minichatapp");
}

let allchats = [
    {
        from: "Sumit",
        to: "Hemant",
        msg: "hey, how are you doing !?",
        created_at: new Date(),
    },
    {
        from: "Neha",
        to: "Soita",
        msg: "hey, you did'nt come last night!?",
        created_at: new Date(),
    },
    {
        from: "Rema",
        to: "Rohan",
        msg: "We should throw party tomorrow.",
        created_at: new Date(),
    },
    {
        from: "Miss Julie",
        to: "Hemant",
        msg: "Were everyone present yesterday? ",
        created_at: new Date(),
    },
    {
        from: "Somit",
        to: "Seema",
        msg: "Let's go for movie this weekend !",
        created_at: new Date(),
    },
    {
        from: "Prashant",
        to: "Praniv",
        msg: "Why did'nt you come to college yesterday?",
        created_at: new Date(),
    },
    {
        from: "Mermaid",
        to: "Fishes",
        msg: "hey,this was'nt our lake a decade ago, what happened!?",
        created_at: new Date(),
    },
    {
        from: "Shruti",
        to: "Lale",
        msg: "Your bag was left there, so i picked it up.",
        created_at: new Date(),
    },
    {
        from: "Monkey",
        to: "Birds",
        msg: "I love this land, don't you feel the same !?",
        created_at: new Date(),
    },
    {
        from: "Swarnima",
        to: "Planet",
        msg: "This place is awesome, isn't it!?",
        created_at: new Date(),
    },
];

Chat.insertMany(allchats);

