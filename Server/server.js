const express = require("express");
const app = express();

const bodyParser = require("body-parser")

const cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));


app.listen(3000);

const hardCodedUsers = require("../Model/localStorageUsers");
const User = require("../Model/user");

app.set("view engine", "ejs");


app.get("/", (re, res) => {
    res.render("signIn");
})

app.get("/signUp", (re, res) => {
    res.render("signUp");
})

app.get("/feed", (re, res) => {
    res.render("mainFeed")
})

app.post("/signIn", (req, res) => {

    let usernameInput = req.body.username;
    let passwordInput = req.body.password;
    console.log(usernameInput + passwordInput)
    console.log("API triggered");
 
    for(let i = 0; i<hardCodedUsers.length; i++){
        if(usernameInput === hardCodedUsers[i].username && passwordInput === hardCodedUsers[i].password){
            res.redirect("/feed")
        }
    }
})

app.post("/signUp", (req, res) => {
    let usernameInput = req.body.username;
    let passwordInput = req.body.password;
    let nameInput = req.body.name;
    let birthdayInput = req.body.birthday;
    let cityInput = req.body.city;
    console.log("API triggered")

    hardCodedUsers.push(new User(usernameInput, passwordInput, nameInput, birthdayInput, cityInput));
    console.log(hardCodedUsers);
    res.redirect("/")
})

