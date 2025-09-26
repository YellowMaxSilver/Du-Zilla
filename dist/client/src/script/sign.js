"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const notification_1 = require("./notification");
const auth_1 = require("firebase/auth");
const firebase_settings_ts_1 = require("../../../database/firebase_settings.ts");
//setTimeout(()=>{notification(null,"Welcome")},500);
const visibilityButton = document.getElementById("visibilityButton");
const email = document.getElementById("emailInput");
const password = document.getElementById("passwordInput");
var passwordVisibilityStatus = false;
console.log("getting started");
//(document.getElementById('loginButton') as HTMLElement ).addEventListener('click',signIn);
visibilityButton.addEventListener('click', changePasswordVisibility);
setTimeout(() => {
    document.getElementById("signUpButton").addEventListener("click", signUp);
}, 1000);
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
function signUp() {
    return __awaiter(this, void 0, void 0, function* () {
        const name = document.getElementById("nameInput");
        const nameId = document.getElementById("nameIdInput");
        console.log("activate");
        if (!validEmail(email.value) && !validNameId(nameId.value) && !validPassword(password.value)) {
            console.log("invalid fields");
            return;
        }
        try {
            const credential = yield (0, auth_1.createUserWithEmailAndPassword)(firebase_settings_ts_1.auth, email.value, password.value);
            const token = yield credential.user.getIdToken();
            const res = yield fetch("./api/account/signUp", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    name: name.value,
                    nameId: nameId.value,
                    email: email.value,
                    "cpf_cnpj": null,
                })
            });
            console.log("answer: ", yield res.json());
        }
        catch (e) {
            console.log(e);
        }
    });
}
function validEmail(email) {
    if (email.length > 3) {
        return true;
    }
    else {
        return false;
    }
}
function validNameId(name) {
    if (name.length > 3) {
        return true;
    }
    else {
        return false;
    }
}
function validPassword(password) {
    if (password.length > 3) {
        return true;
    }
    else {
        return false;
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
