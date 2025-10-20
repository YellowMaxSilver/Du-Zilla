import {getAccountAttributeByUid, getCurrentSession } from "./querys/accountQuery";
import { notification, signNotification } from "./notification";
import type { AccountDocument } from "../../../database/interface/accountInterface";

var name:string|null|undefined = null;
var nameId:string|null|undefined = null;
var accountUid:string|null|undefined = null;

var Account:AccountDocument|null = null

const topNav = document.querySelector("#topNav") as HTMLElement;

const loadingPopUp = document.querySelector("#loadingPopUp") as HTMLElement;
const logedBox = document.querySelector("#logedBox") as HTMLElement;
const notLogedBox = document.querySelector("#notLogedBox") as HTMLElement;
const loadingBox = document.querySelector("#loadingBox") as HTMLElement;

const logedBoxAccountName = logedBox.querySelector("#accountName") as HTMLElement;

const accountDropDownButton = document.querySelector("#accountDropDownButton") as HTMLElement;
const accountDropDown = document.querySelector("#accountDropDown") as HTMLElement;


// setInterval(()=>{
//     if(window.scrollY >= 100){
//         topNav.classList.add("transparentTopNav");
//     }else{
//         topNav.classList.remove("transparentTopNav");
//     }
// },200);

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

export function loading(){
    loadingPopUp.style.display = "flex";
}

export function stopLoading(){
    loadingPopUp.style.display = "none";
}

function accontSet(){
    logedBox.style.display = "flex";
    notLogedBox.style.display = "none";
    loadingBox.style.display = "none";
    logedBoxAccountName.textContent = name != null ? name : "";

    accountDropDownButton.addEventListener("click", () => {
        if(accountDropDown.style.display == "block"){
            accountDropDown.style.display = "none";
            accountDropDownButton.classList.remove("arrowUpIcon");
        }else{
            accountDropDown.style.display = "block";
            accountDropDownButton.classList.add("arrowUpIcon");
        }
    });

    document.addEventListener("click", (event) => {
        if (
            !accountDropDown.contains(event.target as Node) &&
            !accountDropDownButton.contains(event.target as Node)
        ) {
            accountDropDown.style.display = "none";
            accountDropDownButton.classList.remove("arrowUpIcon");
        }
    });

}

function noAccountSet(){
    notLogedBox.style.display = "flex";
    logedBox.style.display = "none";
    loadingBox.style.display = "none";
}

export async function getAccount(): Promise<AccountDocument|null>{
    return new Promise<AccountDocument | null>((resolve) => {
        getCurrentSession((uid: string | null) => {
            if (uid == null) {
                resolve(null);
                return;
            }
            getAccountAttributeByUid(uid, (fullAccount) => {
                resolve(fullAccount);
            });
        });
    });
}

