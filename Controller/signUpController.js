
const signUpBtn = document.getElementById("signUp-button");

signUpBtn.addEventListener("click", () => {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    xhr.addEventListener("readystatechange", function(){
        if(xhr.readyState === 4){
            const respo = xhr.response;
            console.log(respo);
        }
    })
    xhr.open("POST", "http://localhost:3000/signUp", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({body}));
})