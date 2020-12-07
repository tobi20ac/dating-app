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

var h1 = document.getElementsByTagName("h1");

document.addEventListener("DOMContentLoaded", function(){
var hardCodedUsers = require("../Model/localStorageUsers");

localStorage.setItem("users", hardCodedUsers);
})

const loginButton = document.getElementById("login-button");

const emailInput = document.getElementById("email");

const passwordInput = document.getElementById("password;")

loginButton.addEventListener("click", () => {
    var xhr = new XMLHttpRequest();
    console.log(emailInput);
    xhr.responseType = "json";
    console.log(data);

    xhr.addEventListener("readystatechange", function(){
        if(xhr.readyState === 4){
            const respo = xhr.response;
            console.log(respo);
            h1.innerHTML = respo;
        }
    })
    xhr.open("POST", "http://localhost:3000/signIn", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({body}));
})