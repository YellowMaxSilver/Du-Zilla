import { notification, loadingNotification, closeNotification } from "./notification";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../database/firebase_settings.ts";
import { getAccountAttributeByUid } from "./querys/accountQuery.ts";

//setTimeout(()=>{notification(null,"Welcome")},500);

const visibilityButton = document.getElementById("visibilityButton") as HTMLElement;
const loginLoading = document.querySelector("#loginLoading") as HTMLElement;
const loginText = document.querySelector("#loginText") as HTMLElement;

const email = document.getElementById("emailInput") as HTMLInputElement;
const password = document.getElementById("passwordInput") as HTMLInputElement;

const loginButton = document.getElementById('loginButton') as HTMLElement;
const signUpButton = document.getElementById("signUpButton") as HTMLElement;

var passwordVisibilityStatus:boolean = false; 



if(loginButton){loginButton.addEventListener('click',signIn);}
if(signUpButton){signUpButton.addEventListener("click",signUp);}

visibilityButton.addEventListener('click',changePasswordVisibility);


//getPage();

async function signIn(){

   //verify availble email 
   if(!validEmail(email.value)){
    email.classList.add("signInputInvalid");
    notification("error","Email inválido");
    return;
   }

   if(!validPassword(password.value)){
    password.classList.add("signInputInvalid");
    notification("error","Senha inválida");
    return;
   }

   loginLoading.style.display = "flex";
   loginText.style.display = "none";
   const loadingNotificationId = loadingNotification("Entrando na conta");
   loginButton.addEventListener('click',()=>{
    notification("alert","Por favor espere enquanto sua conta é logada.");
   })
   try{
    const credential = await signInWithEmailAndPassword(auth, email.value, password.value);
    const token = await credential.user.getIdToken();
    const res = await fetch("/api/account/setcurrentsession",{
        method: "POST",
            credentials: 'include',
            headers:{
                "Authorization":`Bearer ${token}`,
                "Content-Type":"application/json"
            },
        body:JSON.stringify({
            token:token
        })
    })

    if(res.status == 200){
        closeNotification(loadingNotificationId);
        notification("success","Conta logada com sucesso");
        setTimeout(()=>{window.location.href = "/"},1000);
    }else{
        notification("error","error")
        console.log("error: ", "Server error. Try again later.")
        loginLoading.style.display = "none";
        loginText.style.display = "flex";
        closeNotification(loadingNotificationId);
    }
   }catch(error){
        notification("error","Email ou Senha inválidos")
        loginLoading.style.display = "none";
        loginText.style.display = "flex";
        closeNotification(loadingNotificationId);
   }
}

async function signUp(){
    const name = document.getElementById("nameInput") as HTMLInputElement;
    const nameId = document.getElementById("nameIdInput") as HTMLInputElement;
    getAccountAttributeByUid("6TZptgdc7hYHNKncKuHGxxJ5Uuf2", ()=>{});
    console.log("activate")

    if(!validName(name.value)){
        notification("error","invalid field name");
        return;
    }

    if(!validNameId(nameId.value)){
        notification("error","invalid field nameId");
        return;
    }

    if(!validEmail(email.value)){
        notification("error","invalid field email");
        //console.log("invalid fields")
        return;
    }

    if(!validPassword(password.value)){
        notification("error","invalid field password");
        return;
    }





    try{
        console.log(name.value+" "+nameId.value+" "+email.value+" "+password.value);
        const credential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const token = await credential.user.getIdToken();
        const res = await fetch("/api/account/signup",{
            method: "POST",
            credentials: 'include',
            headers:{
                "Authorization":`Bearer ${token}`,
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name:name.value,
                nameId:nameId.value,
                email:email.value,
                cpf_cnpj:null,
            })
        })
        if(res.status == 201){
            notification("success","Account created with success");
        }else{
            notification("error","Error to create accont")
        }
    }catch(e){
        notification("error","Error in network")
    }
}

function validEmail(email:string):boolean{
    if(email.length >= 6 && email.match('@') && email.match('.')){
        return true;
    }else{
        return false;
    }
}

function validNameId(name:string):boolean{
    if(name.length > 3){
        return true;
    }else{
        return false;
    }
}

function validName(name:string):boolean{
    if(name.length > 3){
        return true;
    }else{
        return false;
    }
}

function validPassword(password:string):boolean{
    if(password.length >= 6){
        return true;
    }else{
        return false;
    }
}

function changePasswordVisibility(){
    if(passwordVisibilityStatus){
        //turn to invisible
        visibilityButton.classList.remove("visibilityButtonVisible");
        visibilityButton.classList.add("visibilityButton");
        passwordVisibilityStatus = false;
        password.type = "password";
    }else{
        //visibilityButton.style = "background-image: url(\"../images/visibility.png\")";
        visibilityButton.classList.add("visibilityButtonVisible");
        visibilityButton.classList.remove("visibilityButton");
        passwordVisibilityStatus = true;
        password.type = "text";
        //turn to visible
    }
}

    