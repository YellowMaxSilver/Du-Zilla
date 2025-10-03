import {getAccountAttributeByUid, getCurrentSession } from "./querys/accountQuery";
import { notification } from "./notification";
import { createNewPortfolio, getAllPortfolios } from "./querys/portfolioQuery";
import type { PortfolioInput, PortfolioDocument } from "../../../database/portfolioInterface";
import { portfolioThunbNail } from "./widgets";

var name:string|null|undefined = null;
var nameId:string|null|undefined = null;
var accountUid:string|null|undefined = null;

const logedBox = document.querySelector("#logedBox") as HTMLElement;

const portfoliosThunbNailsSection = document.querySelector("#portfoliosThunbNails") as HTMLElement;
//templates
const templateBasic = document.querySelector("#templateBasic") as HTMLElement;

templateBasic.addEventListener("click",()=>{
    createTemplate();
});

getCurrentSession((uid:string|null)=>{
    accountUid = uid
    console.log(accountUid)
    if(accountUid != null){
        getAccountAttributeByUid(accountUid,(fullAccount)=>{
        name = fullAccount.name;
        nameId = fullAccount.nameId;
        accountUid = uid;

        notification("dz-icon",`How's going, ${name}?`);
        })  
        
    }
})

getAllPortfolios().then((portfolios:PortfolioDocument[])=>{
    console.log(portfolios)
    for(let i = 0;i< portfolios.length;i++){
       let thisPortfolio = portfolios[i];
       getAccountAttributeByUid(thisPortfolio.creator,(fullAccount)=>{
        portfoliosThunbNailsSection.append(portfolioThunbNail(String(thisPortfolio._id),thisPortfolio.name,fullAccount.name)) 
       })
    }
}).catch(error=>{
    console.log("error to get all portfolios ",error)
})

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
        code:"{!}{!}{text}{Title}{52px}{rgb(54, 54, 54)}{center}{100}{normal}{Arial, Helvetica, sans-serif}{/!}{!}{text}{Subtitle}{44px}{rgb(34, 32, 32)}{left}{100}{normal}{Arial, Helvetica, sans-serif}{/!}{!}{text}{Description}{30px}{rgb(0, 0, 0)}{left}{100}{normal}{Arial, Helvetica, sans-serif}{/!}{!}{form}{formName}{description}{/!}{/!}",
    }

    createNewPortfolio(portfolio).then(createdPortfolio => {
        console.log("Success to create portfolio: ", createdPortfolio);
        console.log("Portfolio Id:",createdPortfolio._id);
        window.location.href = `/studio/panel?id=${createdPortfolio._id}`;
    }).catch(error => {
        console.error("Error in portfolio creation: ",error);
    })
}

