import { projectBox, loadingProjectBox } from "./widgets";
import { getAllPortfoliosProjectsByUid } from "./querys/portfolioQuery";
import { notification } from "./notification";
import { getCurrentSession, getAccountAttributeByUid } from "./querys/accountQuery";
import type { AccountDocument } from "../../../database/interface/accountInterface";

var Account:AccountDocument|null = null;
getCurrentSession((uid:string|null)=>{
    if(uid != null){
        getAccountAttributeByUid(uid,(fullAccount)=>{       
            Account = fullAccount;
            getPortfoliosProjects();
        })  
    }
})


const projectsSection = document.querySelector("#projectsSection") as HTMLElement;


function getPortfoliosProjects(){
    if(Account == null){
        return;
    }
    getAllPortfoliosProjectsByUid(Account.uid).then(portfolios=>{
        console.log(portfolios);

        for(let i = 0;i< portfolios.length;i++){
            loadingProjectBox(`loading${i}`);
        }

        for(let i = 0;i< portfolios.length;i++){
            let thisPortfolio = portfolios[i];
            if(Account == null){
                return;
            }
            projectsSection.append(projectBox(
                String(thisPortfolio._id),
                thisPortfolio.name,
                thisPortfolio.type,
                thisPortfolio.visibility,
                thisPortfolio.createdAt,
                thisPortfolio.lastUpdated,
                Account.name
            ));
        }
    }).catch(error=>{
        console.error(error);
        notification("error","Error to get portfolios projects")
    })
}