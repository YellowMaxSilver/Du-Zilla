import { getPortfolioById } from "./portfolioQuery";

type Process = (success:boolean, status:number) => void;

type UserAttribute = (
    name:string|null|undefined,
    nameId:string|null|undefined,
    email:string|null|undefined,
    description:string|null|undefined,
    uid:string|null|undefined,
    createDate:string|null|undefined,
    cpf_cnpj:string|null|undefined,
    verified:boolean|null|undefined,
    contry:string|null|undefined,
    state:string|null|undefined,
    city:string|null|undefined,
    address:string|null|undefined
    ) => void;

export async function getAccountAttributeByUid(accountUid:string,user:UserAttribute){
    console.log("started")
    try{
        const res = await fetch(`/api/account/getaccountattributes/${accountUid}`,{
            method: "GET",
            credentials: 'include',
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(res.status == 200){
            await res.json().then(data=>{
                user(
                    data.name,
                    data.nameId,
                    data.email,
                    data.description,
                    data.uid,
                    data.createDate,
                    data.cpf_cnpj,
                    data.verified,
                    data.contry,
                    data.state,
                    data.city,
                    data.address
                )
            })
        }else{
            
        }
    }catch(e){
        console.error("erro to find user ",e)
    }
}

type User = (userUid:string|null) => void;

export async function getCurrentSession(call:User){
    try{
        const res = await fetch("/api/account/getcurrentsession",{
            method: "GET",
            credentials: 'include',
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(res.status == 200){
            res.json().then(data=>{
                console.log("aaa:",data.message);
                call(data.message);
            })
        }else{
            console.log("no account cookie", await res.json());
            call(null)
        }
    }catch(e){
        console.log("error to get account: ",e)
        call(null)
    }
}

export function verifyIfUserIsOwnerOfPortfolio(portfolioId:string, callback:(isOwner:boolean)=>void){
    let currentSession:string|null = null;
    let portfolioCreatorId:string|null = null;

    getCurrentSession((session)=>{
        console.log("session "+session);
        currentSession = session;

        getPortfolioById(portfolioId).then(portfolio=>{
            portfolioCreatorId = portfolio.creator;
            console.log("creator: "+portfolioCreatorId+" "+portfolio.creator);
        
            if(currentSession == null){
                console.error("null current session");
                callback(false);
            }
            if(portfolioCreatorId == null){
                console.error("null portfolio id")
                callback(false);
            }

            if(currentSession == portfolioCreatorId){
                callback(true);
            }else{
                console.error("user is not the owner of the portfolio");
                callback(false);
            }   
        }).catch(error=>{
            console.error(error);
            callback(false);
        });
    })
}