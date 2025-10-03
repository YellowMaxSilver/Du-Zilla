import {getAccountAttributeByUid, getCurrentSession } from "./querys/accountQuery";
import { notification } from "./notification";

var name:string|null|undefined = null;
var nameId:string|null|undefined = null;
var accountUid:string|null|undefined = null;

const logedBox = document.querySelector("#logedBox") as HTMLElement;
const notLogedBox = document.querySelector("#notLogedBox") as HTMLElement;
const loadingBox = document.querySelector("#loadingBox") as HTMLElement;

const logedBoxAccountName = logedBox.querySelector("#accountName") as HTMLElement;

setTimeout(()=>{loadingBox.style.display = "flex";},200);

getCurrentSession((uid:string|null)=>{
    accountUid = uid
    console.log(accountUid)
    if(accountUid != null){
        getAccountAttributeByUid(accountUid,(fullAccount)=>{
            
        name = fullAccount.name;
        nameId = fullAccount.nameId;
        accountUid = fullAccount.uid;
        console.log("user: "+name+" "+nameId+" "+fullAccount.email+" "+fullAccount.description+" "+uid)    
        accontSet();
        })  
    }else{
        noAccountSet()
    }
})


function accontSet(){
    logedBox.style.display = "flex";
    notLogedBox.style.display = "none";
    loadingBox.style.display = "none";
    logedBoxAccountName.textContent = name != null ? name : "";
}

function noAccountSet(){
    notLogedBox.style.display = "flex";
    logedBox.style.display = "none";
    loadingBox.style.display = "none";
}
