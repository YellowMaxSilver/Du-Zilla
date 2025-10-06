import {getAccountAttributeByUid, getCurrentSession } from "./querys/accountQuery";
import { notification } from "./notification";
import type { AccountDocument } from "../../../database/interface/accountInterface";

var name:string|null|undefined = null;
var nameId:string|null|undefined = null;
var accountUid:string|null|undefined = null;

var Account:AccountDocument|null = null

const logedBox = document.querySelector("#logedBox") as HTMLElement;
const notLogedBox = document.querySelector("#notLogedBox") as HTMLElement;
const loadingBox = document.querySelector("#loadingBox") as HTMLElement;

const logedBoxAccountName = logedBox.querySelector("#accountName") as HTMLElement;

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
        Account = fullAccount;
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

