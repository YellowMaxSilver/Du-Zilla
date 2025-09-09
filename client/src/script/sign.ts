import { notification } from "./notification";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../database/firebase_settings.ts";
import { getAccountAttributeByUid } from "./accountQuery.ts";

//setTimeout(()=>{notification(null,"Welcome")},500);

const visibilityButton = document.getElementById("visibilityButton") as HTMLElement;

const email = document.getElementById("emailInput") as HTMLInputElement;
const password = document.getElementById("passwordInput") as HTMLInputElement;

var passwordVisibilityStatus:boolean = false; 

console.log("getting started");

(document.getElementById('loginButton') as HTMLElement ).addEventListener('click',signIn);

visibilityButton.addEventListener('click',changePasswordVisibility);

setTimeout(()=>{
    (document.getElementById("signUpButton") as HTMLElement).addEventListener("click",signUp);
},1000)


//getPage();

async function signIn(){

   //verify availble email 
   if(!validEmail(email.value)){
    notification("error","invalid field email");
    return;
   }

   if(!validPassword(password.value)){
    notification("error","invalid field email");
    return;
   }

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
        notification("success","your in, success")
    }else{
        notification("error","error to set cookie")
        console.log("error: ", await res.json())
    }
   }catch(e){
        console.log(e)
        notification("error","error to login")
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

function getPage(){
    const queryString:string = window.location.search;

    const params = new URLSearchParams(queryString);

    const pageType:string | null = params.get("a");

    console.log(window.location.search);

    switch (pageType){
        case ("login"):
            console.log("ok");
            break;
        case ("signUp"):
            console.log("sign up ok")
            break;    
        default:
            console.log("nothing but ok");
            break;    
    }
}
        