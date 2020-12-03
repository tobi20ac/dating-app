const express = require("express");
const app = express();

var hardCodedUsers = require("../Model/localStorageUsers")

app.listen(3000);

app.set("view engine", "ejs");


app.get("/", (re, res) => {
    res.render("signIn");
})

app.get("/signUp", (re, res) => {
    res.render("signUp");
})
