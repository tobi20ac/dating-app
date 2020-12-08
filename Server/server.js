const express = require("express");
const app = express();

const bodyParser = require("body-parser")

const cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));


app.listen(3000);

const hardCodedUsers = require("../Model/localStorageUsers");
const User = require("../Model/user");
const { indexOf } = require("../Model/localStorageUsers");

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


/*     if(hardCodedUsers[i].username === "tobias3445@gmail.com"){
        i++;
    } */
    if(i < possibleMatches.length){
    res.render("mainFeed", {message: "", name: possibleMatches[i].name, age: possibleMatches[i].birthday, city: possibleMatches[i].city})
    }
    var profUser
    for(let i = 0; i<hardCodedUsers.length; i++){
        if(hardCodedUsers[i].username === activeProfile){
             profUser = hardCodedUsers[i];
        }
    }
    if(profUser.likedUsers.length >= possibleMatches.length && i === possibleMatches.length){
        res.render("mainFeed", {message: "You have now liked all users", name: possibleMatches[0].name, age: possibleMatches[0].birthday, city: possibleMatches[0].city})
    }

}
else{res.redirect("/")}
})

var activeProfile= ""; 

var possibleMatches = hardCodedUsers.slice();

app.post("/", (req, res) => {

    console.log(hardCodedUsers)
    let usernameInput = req.body.username;
    let passwordInput = req.body.password;
    console.log("API triggered");
 
    for(let i = 0; i<hardCodedUsers.length; i++){
        if(usernameInput === hardCodedUsers[i].username && passwordInput === hardCodedUsers[i].password){
            console.log("logged in")
            activeProfile = usernameInput;
            console.log(activeProfile)
        }
    }
    if(activeProfile != ""){
            for(let i=0; i<hardCodedUsers.length; i++){
                if(hardCodedUsers[i].username === activeProfile){
                    /* possibleMatches = hardCodedUsers; */
                    possibleMatches.splice(i,1)
                    console.log(possibleMatches)
                }
            }
            console.log(hardCodedUsers)
            res.redirect("/feed")
        }
    
})

app.get("/LogOut", (req, res) => {
    activeProfile="";
    res.redirect("/")
})

app.post("/signUp", (req, res) => {

    if(activeProfile != ""){

    let usernameInput = req.body.username;
    let passwordInput = req.body.password;
    let nameInput = req.body.name;
    let birthdayInput = req.body.birthday;
    let cityInput = req.body.city;
    console.log("API triggered")

    hardCodedUsers.push(new User(hardCodedUsers.length, usernameInput, passwordInput, nameInput, birthdayInput, cityInput));
    console.log(hardCodedUsers);
    res.redirect("/")
    }
    else{
        res.redirect("/feed")
    }
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

app.get("/like", (req,res) => {
    if(i<possibleMatches.length){
    var likedUser = possibleMatches[i].username;
    for(let i = 0; i<hardCodedUsers.length; i++){
        if(hardCodedUsers[i].username === activeProfile){
            var profileUser = hardCodedUsers[i];
        }
    }

    var isAlreadyLiked = false;
    if(profileUser.likedUsers.length > 0){
        for(let i =0; i<profileUser.likedUsers.length;i++){
            if(profileUser.likedUsers[i].username === likedUser){
                isAlreadyLiked = true;
            }
        }
    }
    if(!isAlreadyLiked){
        profileUser.likeUser(likedUser);
        console.log(profileUser.username + " " + profileUser.likedUsers)

    }


    i++;
    

    res.redirect("/feed")
}
})

module.exports.hardCodedUsers = hardCodedUsers;

