const mysql = require("mysql2");
const { faker } = require('@faker-js/faker');
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const {v4:uuidv4} = require("uuid");

let port = 8080;

// to connect and render ejs files 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// to parse post request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// to use method-override
app.use(methodOverride('_method'));

//create connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@00AS051204",
  database: "tut_database",
});

// function createRandomUser() {
//   return {
//     userId: faker.string.uuid(),
//     username: faker.internet.username(),
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//   };
// }


// show all count of users
app.get("/", (req, res) => {
  let q = "SELECT count(*) FROM user";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["count(*)"];
      res.render("home.ejs", { count });
    })
  }
  catch (err) {
    res.send("error occurred!");
  }
})

// show all users
app.get("/user", (req, res) => {
  let q = "SELECT * FROM user";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let users = result;
      res.render("users.ejs", { users });
    })
  }
  catch (err) {
    res.send("error occurred!");
  }
})

// Edit the user
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}' `;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("edit.ejs", { id, user });
    })
  }
  catch (err) {
    res.send("error occurred!");
  }
})

// update the user
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  // Password and username comes from the client
  let { username: newUser, password: formPassword } = req.body;

  let q = `SELECT * FROM user WHERE id='${id}'`;

  connection.query(q, (err, result) => {
    if (err) {
      return res.send("error occurred!");
    }

    let user = result[0];

    // Compare entered password with database password
    if (formPassword != user.password) {
      return res.send("You have entered Wrong Password!");
    }

    // Password is correct, update username
    let q2 = `UPDATE user SET username='${newUser}' WHERE id='${id}'`;

    connection.query(q2, (err, result) => {
      if (err) {
        return res.send("edition was not successful");
      }
      console.log(result);
      res.redirect("/user");
    });
  });
});

// to add the user
app.get("/user/new", (req, res) => {
  res.render("add.ejs");
})

app.post("/user", (req, res) => {
  let {username, email, password} = req.body;
  let id = uuidv4();
  let data = [id, username, email, password];
  let q = "INSERT INTO user (id, username, email, password) VALUES (?,?,?,?)";
  try {
    connection.query(q, data, (err, result) => {
      if (err) throw err;
      res.redirect("/user");
    })
  }
  catch (err) {
    res.send("error occurred!");
  }
})

//delete user
app.delete("/user/:id", (req, res)=>{
  let { id } = req.params;
  let q = `DELETE FROM user WHERE id='${id}' `;
  console.log(id);
    connection.query(q, (err, result) => {
      if (err) console.log(err);
      res.redirect("/user");
    })
})

app.listen(port, () => {
  console.log("Server is listening to port 8080...");
})
