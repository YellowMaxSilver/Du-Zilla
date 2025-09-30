import {getAccountAttributeByUid, getCurrentSession } from "./querys/accountQuery";
import { notification } from "./notification";
import { createNewPortfolio } from "./querys/portfolioQuery";
import type { PortfolioInput, PortfolioDocument } from "../../../database/portfolioInterface";


var name:string|null|undefined = null;
var nameId:string|null|undefined = null;
var accountUid:string|null|undefined = null;

const logedBox = document.querySelector("#logedBox") as HTMLElement;
const notLogedBox = document.querySelector("#notLogedBox") as HTMLElement;

const logedBoxAccountName = logedBox.querySelector("#accountName") as HTMLElement;

//templates
const templateBasic = document.querySelector("#templateBasic") as HTMLElement;

templateBasic.addEventListener("click",()=>{
    createTemplate();
});

getCurrentSession((uid:string|null)=>{
    accountUid = uid
    console.log(accountUid)
    if(accountUid != null){
        getAccountAttributeByUid(accountUid,(
        nameP,
        nameIdP,
        email,
        description,
        uid)=>{
            
        name = nameP;
        nameId = nameIdP;
        accountUid = uid;
        console.log(nameP+" "+nameId+" "+email+" "+description+" "+uid)    
        accontSet();
        })  
    }else{
        noAccountSet()
    }
})


function accontSet(){
    notification("dz",`Welcome back ${name}`)
    logedBox.style.display = "flex";
    notLogedBox.style.display = "none";
    logedBoxAccountName.textContent = name != null ? name : "";
}

function noAccountSet(){
    notification("dz",`Welcome to Du-zilla`)
    notLogedBox.style.display = "flex";
    logedBox.style.display = "none";
}


async function createTemplate(){
    console.log("active "+nameId)
    if(accountUid == null || accountUid == undefined){
        return;
    }
    console.log("active2")
    const portfolio:PortfolioInput = {
        name: "My Portfolio",
        creator: accountUid,
        visibility: "just-me",
        type:"personal",
        views:0,
        code:"{!}{/!}",
    }

    createNewPortfolio(portfolio).then(createdPortfolio => {
        console.log("Success to create portfolio: ", createdPortfolio);
        console.log("Portfolio Id:",createdPortfolio._id);
        window.location.href = `/studio/panel?id=${createdPortfolio._id}`;
    }).catch(error => {
        console.error("Error in portfolio creation: ",error);
    })
}

