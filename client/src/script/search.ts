import { notification } from "./notification";
import { searchPortfolio } from "./querys/portfolioQuery";
import { getAccountAttributeByUid } from "./querys/accountQuery";
import { portfolioThunbNail, loadingPortfolioThunbNailBox } from "./widgets";
var search:string;

const pageTitle = document.querySelector("#pageTitle") as HTMLElement;

const portfoliosThunbNailsSection = document.querySelector("#portfoliosThunbNailsSection") as HTMLElement;

function getQuery(){
    const queryString:string = window.location.search;

    const params = new URLSearchParams(queryString);

    const query:string | null = params.get("q");

    //console.log(params+"<- "+query+" ->"+queryString)
    
    if(!query){
        notification("error","not found");
        return;
    }
    search = query;
    setAttributes();
    searchPortfolio(query).then(portfolios=>{
        console.log(portfolios);
        for(let i = 0;i< portfolios.length;i++){
               portfoliosThunbNailsSection.insertAdjacentElement("afterbegin",loadingPortfolioThunbNailBox(`loading${i}`))
               let thisPortfolio = portfolios[i];
               getAccountAttributeByUid(thisPortfolio.creator,(fullAccount)=>{
                (document.querySelector(`#loading${i}`) as HTMLElement).style.display = "none";
                portfoliosThunbNailsSection.insertAdjacentElement("afterbegin",portfolioThunbNail(String(thisPortfolio._id),thisPortfolio.name,fullAccount.name)) 
               })
        }
    }).catch(error=>{
        console.error(error);
        notification("error",`server error ${error}`)
    });
}

function setAttributes(){
    const searchInput = document.getElementById("searchInput") as HTMLInputElement;
    const resultText = document.getElementById("resultText") as HTMLElement;

    //setting
    pageTitle.textContent = `Du-Zilla: "${search}"`;
    resultText.innerText = `Results Of "${search}":`;
    searchInput.value = search;
}

getQuery()