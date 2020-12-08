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

    if(activeProfile != ""){
        res.redirect("/feed")
    }

    res.render("signIn");
})

app.get("/signUp", (re, res) => {
    res.render("signUp");
})

var i = 0;
app.get("/feed", (re, res) => {

    if(activeProfile != ""){

    if(hardCodedUsers[i].username === "tobias3445@gmail.com"){
        i++;
    }
    if(i < hardCodedUsers.length){
    res.render("mainFeed", {message: "", name: hardCodedUsers[i].name, age: hardCodedUsers[i].birthday, city: hardCodedUsers[i].city})
    i++;
    }
    if(i === hardCodedUsers.length){
        res.render("mainFeed", {message: "You have now seen all users", name: hardCodedUsers[0].name, age: hardCodedUsers[0].birthday, city: hardCodedUsers[0].city})
        i = 0;
    }
}
else{res.redirect("/")}
})

var activeProfile= ""; 

app.post("/", (req, res) => {


    let usernameInput = req.body.username;
    let passwordInput = req.body.password;
    console.log("API triggered");
 
    for(let i = 0; i<hardCodedUsers.length; i++){
        if(usernameInput === hardCodedUsers[i].username && passwordInput === hardCodedUsers[i].password){
            console.log("logged in")
            activeProfile = usernameInput;
            console.log(activeProfile)
            res.redirect("/feed")
        }
    }
})

app.get("/LogOut", (req, res) => {
    activeProfile="";
    res.redirect("/")
})

app.post("/signUp", (req, res) => {
    let usernameInput = req.body.username;
    let passwordInput = req.body.password;
    let nameInput = req.body.name;
    let birthdayInput = req.body.birthday;
    let cityInput = req.body.city;
    console.log("API triggered")

    hardCodedUsers.push(new User(hardCodedUsers.length, usernameInput, passwordInput, nameInput, birthdayInput, cityInput));
    console.log(hardCodedUsers);
    res.redirect("/")
})

app.get("/profile", (req, res) => {

    if(activeProfile === ""){
        res.redirect("/")
    }

    else{
        for(let i = 0; i<hardCodedUsers.length; i++){
            if(hardCodedUsers[i].username === activeProfile){
                var profileUser = hardCodedUsers[i];
            }
        }
        res.render("profile", {username: profileUser.username, password: profileUser.password, name: profileUser.name, birthday: profileUser.birthday, city: profileUser.city})
    }
})

module.exports.hardCodedUsers = hardCodedUsers;

