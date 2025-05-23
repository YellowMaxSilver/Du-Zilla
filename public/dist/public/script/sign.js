"use strict";
//setTimeout(()=>{notification(null,"Welcome")},500);
const visibilityButton = document.getElementById("visibilityButton");
const email = document.getElementById("emailInput");
const password = document.getElementById("passwordInput");
var passwordVisibilityStatus = false;
console.log("getting started");
document.getElementById('loginButton').addEventListener('click', signIn);
visibilityButton.addEventListener('click', changePasswordVisibility);
getPage();
function signIn() {
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
function getPage() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const pageType = params.get("a");
    console.log(window.location.search);
    switch (pageType) {
        case ("login"):
            console.log("ok");
            break;
        case ("signUp"):
            console.log("sign up ok");
            break;
        default:
            console.log("nothing but ok");
            break;
    }
}
