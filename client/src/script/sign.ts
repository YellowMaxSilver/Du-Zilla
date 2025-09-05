import { notification } from "./notification";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../database/firebase_settings.ts";

//setTimeout(()=>{notification(null,"Welcome")},500);

const visibilityButton = document.getElementById("visibilityButton") as HTMLElement;

const email = document.getElementById("emailInput") as HTMLInputElement;
const password = document.getElementById("passwordInput") as HTMLInputElement;

var passwordVisibilityStatus:boolean = false; 

console.log("getting started");

//(document.getElementById('loginButton') as HTMLElement ).addEventListener('click',signIn);

visibilityButton.addEventListener('click',changePasswordVisibility);

setTimeout(()=>{
    (document.getElementById("signUpButton") as HTMLElement).addEventListener("click",signUp);
},1000)


//getPage();

function signIn(){

   //verify availble email 
   let hasA:boolean = false;
   let hasCom:boolean = false;  
   let goodPassword:boolean = false; 

   for(let i = 0;i < email.value.length;i++){
        let carater = email.value.charAt(i);
        if(carater == '@'){
            hasA = true;
        }
        if(carater == '.' && email.value.charAt(i+1) != ''){
            hasCom = true;
        }
   }
   if(password.value != ''){
    goodPassword = true;
   }

   if(hasA && hasCom && goodPassword){
    notification("","loged with successiful.");
   }else{
    notification("","Error.");
    console.log('unavailbe')
   }
}

async function signUp(){
    const name = document.getElementById("nameInput") as HTMLInputElement;
    const nameId = document.getElementById("nameIdInput") as HTMLInputElement;

    console.log("activate")
    if(!validEmail(email.value) && !validNameId(nameId.value) && !validPassword(password.value)){
        console.log("invalid fields")
        return;
    }


    try{
        const credential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const token = await credential.user.getIdToken();
        const res = await fetch("/api/account/signUp",{
            method: "POST",
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-type":"application/json"
            },
            body: JSON.stringify({
                ["name"]:name.value,
                "nameId":nameId.value,
                "email":email.value,
                "cpf_cnpj":null,
            })
        })
        console.log("answer: ",await res.json());
    }catch(e){
        console.log(e)
    }
}

function validEmail(email:string):boolean{
    if(email.length > 3){
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

function validPassword(password:string):boolean{
    if(password.length > 3){
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
        