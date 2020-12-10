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

var errorMsg = "Invalid login information"


app.get("/", (re, res) => {

    if(activeProfile != ""){
        res.redirect("/feed")
    }

    res.render("signIn");
})

app.get("/signUp", (re, res) => {
    if(activeProfile === ""){
    res.render("signUp",{ed: ""});
    }
    else(res.redirect("/"))
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
         res.render("mainFeed", {message: "You have now seen all users", name: possibleMatches[0].name, age: possibleMatches[0].birthday, city: possibleMatches[0].city})
    
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


function checkInput(userN, passW, namE, birthD, citY){
    var signInErrors = [];
        if(userN === "" || userN.length<5){
            signInErrors.push("Error in username (username must be at least 5 characters")
        }

        if(passW === "" || passW.length<5){
            signInErrors.push("Error in passwrod (password must be at least 5 characters")
        }

        if(namE === "" || namE.length<2){
            signInErrors.push("Error in name (name must be at least 2 characters")
        }

        let today = new Date();
        let birth = new Date(birthD)
        if(birthD === "" || (today.getFullYear() - birth.getFullYear()) < 18 || (today.getFullYear() - birth.getFullYear() > 100)){
            signInErrors.push("Invalid date")
        }

        if(citY === "" || citY.length < 2){
            signInErrors.push("City must be at least 2 characters")
        }
        return signInErrors;
    }


app.post("/signUp", (req, res) => {


    if(activeProfile === ""){

    let usernameInput = req.body.username;
    let passwordInput = req.body.password;
    let nameInput = req.body.name;
    let birthdayInput = req.body.birthday;
    let cityInput = req.body.city;
    console.log("API triggered")


    var result = checkInput(usernameInput, passwordInput, nameInput, birthdayInput, cityInput);
    if(result === []){
    hardCodedUsers.push(new User(hardCodedUsers.length, usernameInput, passwordInput, nameInput, birthdayInput, cityInput));
    console.log(hardCodedUsers);
    res.redirect("/")
    }

    if(result != []){
        res.render("signUp",{ed: result.join(", ")})
        }
    
}
    if(activeProfile != ""){
        res.redirect("/")
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
if(i === possibleMatches.length  ){
    res.redirect("/feed")
}

})

app.get("/dislike", (req, res) => {
    i++;
    res.redirect("/")
})


app.get("/matches", (req, res) => {

    let profileUser;
    for(let i = 0; i<hardCodedUsers.length; i++){
        if(hardCodedUsers[i].username === activeProfile){
            profileUser = hardCodedUsers[i];
        }
    }
    console.log(profileUser)

    //Viser kun det første match en person har
    for(let i=0; i<possibleMatches.length; i++){
        if(possibleMatches[i].username == profileUser.likedUsers[0]){
            res.render("matches", {name: possibleMatches[i].getName(), age: possibleMatches[i].getBirthday(), city: possibleMatches[i].getCity()})
        }
    }


})

module.exports.hardCodedUsers = hardCodedUsers;
module.exports = checkInput;

