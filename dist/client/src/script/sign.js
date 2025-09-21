"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notification_1 = require("./notification");
//setTimeout(()=>{notification(null,"Welcome")},500);
const visibilityButton = document.getElementById("visibilityButton");
const email = document.getElementById("emailInput");
const password = document.getElementById("passwordInput");
var passwordVisibilityStatus = false;
console.log("getting started");
document.getElementById('loginButton').addEventListener('click', signIn);
visibilityButton.addEventListener('click', changePasswordVisibility);
//getPage();
function signIn() {
    //verify availble email 
    let hasA = false;
    let hasCom = false;
    let goodPassword = false;
    for (let i = 0; i < email.value.length; i++) {
        let carater = email.value.charAt(i);
        if (carater == '@') {
            hasA = true;
        }
        if (carater == '.' && email.value.charAt(i + 1) != '') {
            hasCom = true;
        }
    }
    if (password.value != '') {
        goodPassword = true;
    }
    if (hasA && hasCom && goodPassword) {
        (0, notification_1.notification)("", "loged with successiful.");
    }
    else {
        (0, notification_1.notification)("", "Error.");
        console.log('unavailbe');
    }
}
function changePasswordVisibility() {
    if (passwordVisibilityStatus) {
        //turn to invisible
        visibilityButton.classList.remove("visibilityButtonVisible");
        visibilityButton.classList.add("visibilityButton");
        passwordVisibilityStatus = false;
        password.type = "password";
    }
    else {
        //visibilityButton.style = "background-image: url(\"../images/visibility.png\")";
        visibilityButton.classList.add("visibilityButtonVisible");
        visibilityButton.classList.remove("visibilityButton");
        passwordVisibilityStatus = true;
        password.type = "text";
        //turn to visible
    }
}
