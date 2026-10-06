const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const path = require("path");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

main().then(() => { console.log("successful") }).catch(err => { console.log(err) });
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/minichatapp");
}

// all chats
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    res.render("index.ejs", { chats });
});

// new chat
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
})
app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
    });
    newChat.save()
    .then((res)=> {
        console.log("chat is saved!");
    }).catch((err)=>{
        console.log(err);
    });
    console.log(newChat);
    res.redirect("/chats");
})

// edit route
app.get("/chats/:id/edit", async (req, res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
});
app.put("/chats/:id", async (req,res)=>{
    let {id} = req.params;
    let {msg : newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, {msg : newMsg, 
        $set: {updated_at: new Date()}},
        {runValidators : true,  returnDocument: "after"});
    console.log(updatedChat);
    res.redirect("/chats");
})

// delete route
app.delete("/chats/:id", async (req,res)=>{
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
})

// root
app.get("/", (req, res) => {
    res.send("root is working..");
});

app.listen(8080, () => {
    console.log("Server is listening to port 8080...");
});