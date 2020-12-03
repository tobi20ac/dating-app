const express = require("express");
const app = express();

var hardCodedUsers = require("../Model/localStorageUsers")

app.listen(3000);

app.use(express.static(__dirname + "/public"));

app.get("/", (re, res) => {
    res.sendFile("../View/signUp.html");
})

