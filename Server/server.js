//Setting up Node.js server
const express = require("express");
const app = express();

//Requiring bodyparser and CORS
const bodyParser = require("body-parser")
const cors = require("cors");

//Using CORS and bodyparser on the server.
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

//Program is listening on port 3000, localhost:3000.
app.listen(3000);

//Importning the hardcodedusers and the User module to create new Users and add them to the "database"
const hardCodedUsers = require("../Model/localStorageUsers");
const User = require("../Model/user");

//Setting view engine to EJS
app.set("view engine", "ejs");

//Endpoint for the root
app.get("/", (re, res) => {

    //If there is a active profile, then the person should be redirected to his feed.
    if (activeProfile != "") {
        res.redirect("/feed")
    }
    //If there isn't a active profile then the person should be redirected to the sign in page.
    res.render("signIn");
})

//Endpoint for when users want to access the signUp page
app.get("/signUp", (re, res) => {
    //If the user isn't logged in he should be directed to the sign up page.
    if (activeProfile === "") {
        res.render("signUp", { errors: "" });
    }
    //if the user is logged in already he should be redirected to his feed.
    else (res.redirect("/"))
})

//variable to keep count of which profiles have been viewed on the feed.
var feedIndex = 0;

//Endpoint for users trying to access the feed page.
app.get("/feed", (re, res) => {

    //If there is a active profile then show a possible match
    if (activeProfile != "") {

        if (feedIndex < possibleMatches.length) {
            res.render("mainFeed", { message: "", name: possibleMatches[feedIndex].name, age: possibleMatches[feedIndex].birthday, city: possibleMatches[feedIndex].city })
        }

        //Finding the active user
        var profUser;
        for (let i = 0; i < hardCodedUsers.length; i++) {
            if (hardCodedUsers[i].username === activeProfile) {
                profUser = hardCodedUsers[i];
            }
        }
        //Looking to see if the active user either has liked everyone or has seen everyone
        if (profUser.likedUsers.length >= possibleMatches.length || feedIndex === possibleMatches.length) {
            res.render("mainFeed", { message: "You have now seen all users", name: possibleMatches[0].name, age: possibleMatches[0].birthday, city: possibleMatches[0].city })

        }
    }
    //If the user isn't logged in, then redirect to the root.
    else { res.redirect("/") }
})

//active profile variable
var activeProfile = "";

//Possible matches array
var possibleMatches = hardCodedUsers.slice();

//Endpoint if a user wants to login.
app.post("/", (req, res) => {

    //The request body is made into variable for username and password
    let usernameInput = req.body.username;
    let passwordInput = req.body.password;

    //Test log
    console.log("Login triggered");
    console.log(usernameInput + passwordInput)

    //Looking to see if the inputs matches any of the users in the users array

    for (let i = 0; i < hardCodedUsers.length; i++) {
        if (usernameInput === hardCodedUsers[i].username && passwordInput === hardCodedUsers[i].password) {
            console.log("logged in")
            activeProfile = usernameInput;
            console.log(activeProfile)
        }
    }

    //If the user succesfully log in, then take all the users and remove him to make a array with users he can match
    if (activeProfile != "") {
        for (let i = 0; i < hardCodedUsers.length; i++) {
            if (hardCodedUsers[i].username === activeProfile) {
                possibleMatches.splice(i, 1)
            }
        }
        //Redirect to his feed. 
        console.log("?")
        res.redirect("/feed")
    }

})

//Endpoint if the user wants to logout. Sets the active profile variable to "" and redirect to the root.
app.get("/LogOut", (req, res) => {
    activeProfile = "";
    res.redirect("/")
})

//Function that checks the input a user gives when signing up. Return a array of messages
function checkInput(userN, passW, namE, birthD, citY) {
    var signInErrors = [];
    if (userN === "" || userN.length < 5) {
        signInErrors.push("Error in username (username must be at least 5 characters")
    }

    if (passW === "" || passW.length < 5) {
        signInErrors.push("Error in passwrod (password must be at least 5 characters")
    }

    if (namE === "" || namE.length < 2) {
        signInErrors.push("Error in name (name must be at least 2 characters")
    }

    let today = new Date();
    let birth = new Date(birthD)
    if (birthD === "" || (today.getFullYear() - birth.getFullYear()) < 18 || (today.getFullYear() - birth.getFullYear() > 100)) {
        signInErrors.push("Invalid date")
    }

    if (citY === "" || citY.length < 2) {
        signInErrors.push("City must be at least 2 characters")
    }
    return signInErrors;
}

//Endpoint if the user sends a request to sign up
app.post("/signUp", (req, res) => {

    //If the user isnt already logged in then check his input and create a user if it is valid. Else show what the errors are and he can try again
    if (activeProfile === "") {

        let usernameInput = req.body.username;
        let passwordInput = req.body.password;
        let nameInput = req.body.name;
        let birthdayInput = req.body.birthday;
        let cityInput = req.body.city;
        console.log(usernameInput + passwordInput + nameInput + cityInput + birthdayInput)


        var result = checkInput(usernameInput, passwordInput, nameInput, birthdayInput, cityInput);
        console.log(result)
        if (result.length == 0) {
            console.log("1")
            hardCodedUsers.push(new User(hardCodedUsers.length, usernameInput, passwordInput, nameInput, birthdayInput, cityInput));
            console.log(hardCodedUsers);
            res.redirect("/")
        }

        if (result != []) {
            console.log("2")
            res.render("signUp", { errors: result.join(", ") })
        }

    }
    //If there already is an active user then redirect to the root. 
    if (activeProfile != "") {
        res.redirect("/")
    }
})

//Endpoint for a user accessing the profile page
app.get("/profile", (req, res) => {

    //If there isn't a active user, then redirect to the root.
    if (activeProfile === "") {
        res.redirect("/")
    }

    //If there is a active user then show the persons information. 
    else {
        for (let i = 0; i < hardCodedUsers.length; i++) {
            if (hardCodedUsers[i].username === activeProfile) {
                var profileUser = hardCodedUsers[i];
            }
        }
        res.render("profile", { username: profileUser.username, password: profileUser.password, name: profileUser.name, birthday: profileUser.birthday, city: profileUser.city })
    }
})

//Endpoint if the user tries to like another
app.get("/like", (req, res) => {

    //Finding the current user and the liked user
    if (feedIndex < possibleMatches.length) {
        var likedUser = possibleMatches[feedIndex].username;
        for (let i = 0; i < hardCodedUsers.length; i++) {
            if (hardCodedUsers[i].username === activeProfile) {
                var profileUser = hardCodedUsers[i];
            }
        }

        //Checking if the user already has liked the person
        var isAlreadyLiked = false;
        if (profileUser.likedUsers.length > 0) {
            for (let i = 0; i < profileUser.likedUsers.length; i++) {
                if (profileUser.likedUsers[i].username === likedUser) {
                    isAlreadyLiked = true;
                }
            }
        }
        //If the user hasnt liked the person before then add them to the likedlist
        if (!isAlreadyLiked) {
            profileUser.likeUser(likedUser);
            console.log(profileUser.username + " " + profileUser.likedUsers)

        }

        //Count the feed up
        feedIndex++;

        //Update the feed
        res.redirect("/feed")
    }
    //if the user has seen every user then redirect
    if (i === possibleMatches.length) {
        res.redirect("/feed")
    }

})

//If the user presses the dislike button then update the feed.
app.get("/dislike", (req, res) => {
    feedIndex++;
    res.redirect("/")
})

//The "mathces" page. Only shows the first person that a user has liked. Not very optimal.
app.get("/matches", (req, res) => {

    let profileUser;
    for (let i = 0; i < hardCodedUsers.length; i++) {
        if (hardCodedUsers[i].username === activeProfile) {
            profileUser = hardCodedUsers[i];
        }
    }
    console.log(profileUser)

    //Only shows the first person the user has liked
    for (let i = 0; i < possibleMatches.length; i++) {
        if (possibleMatches[i].username == profileUser.likedUsers[0]) {
            res.render("matches", { name: possibleMatches[i].getName(), age: possibleMatches[i].getBirthday(), city: possibleMatches[i].getCity() })
        }
    }


})

//exports checkInput
module.exports = checkInput;

