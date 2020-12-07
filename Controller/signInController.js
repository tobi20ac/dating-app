/* const loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", function(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log("sign in no?")
        }
    }

    xhttp.open("POST", "http://localhost:3000/signIn", true);
    xhttp.send();
    
}) */
/* 
var h1 = document.getElementsByTagName("h1");

document.addEventListener("DOMContentLoaded", function(){
var hardCodedUsers = require("../Model/localStorageUsers");

localStorage.setItem("users", hardCodedUsers);
})

const loginButton = document.getElementById("login-button");

const usernameInput = document.getElementById("username");

const passwordInput = document.getElementById("password;")

var activeUser =  localStorage.setItem("activeUser", "");

loginButton.addEventListener("click", () => {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    var activeUser;


    xhr.addEventListener("readystatechange", function(){
        if(xhr.readyState === 4){
            activeUser = body.username;
            localStorage.setItem("activeUser", activeUser)
            console.log(activeUser);
        }
    })
    xhr.open("POST", "http://localhost:3000/signIn", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({body}, activeUser));
}) */