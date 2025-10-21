import { getPortfolioById } from "./portfolioQuery";
import type { AccountDocument } from "../../../../Clound/database/interface/accountInterface";

type Process = (success:boolean, status:number) => void;

type Account = (account:AccountDocument) => void;

const DuZillaClound = "http://localhost:5000";
export async function getAccountAttributeByUid(accountUid:string,user:Account){
    try{
        const res = await fetch(`${DuZillaClound}/api/account/getaccountattributes/${accountUid}`,{
            method: "GET",
            credentials: 'include',
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(res.status == 200){
            await res.json().then(data=>{
                user(data)
            })
        }else{
            
        }
    }catch(e){
        console.error("erro to find user ",e)
    }
}

export async function getAccountByUid(uid:string):Promise<AccountDocument>{
    try{
        const res = await fetch(`${DuZillaClound}/api/account/getaccountattributes/${uid}`,{
            method: "GET",
            credentials: 'include',
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(res.status == 200){
            return await res.json()
        }else{
            throw new Error(`Error: ${res.status} ${(await res.json()).message}`);            
        }
    }catch(e){
        throw e;
    }
}

export async function getAccountByNameId(nameId:string):Promise<AccountDocument>{
    try{
        const res = await fetch(`${DuZillaClound}/api/account/getaccountattributesbynameid/${nameId}`,{
            method: "GET",
            credentials: 'include',
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(res.status == 200){
            return await res.json()
        }else{
            throw new Error(`Error: ${res.status} ${(await res.json()).message}`);            
        }
    }catch(e){
        throw e;
    }
}

type User = (userUid:string|null) => void;

export async function getCurrentSession(call:User){
    try{
        const res = await fetch(`${DuZillaClound}/api/account/getcurrentsession`,{
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

export async function searchUserByNameOrNameId(query:string):Promise<AccountDocument[]|null>{
    try{
        const res = await fetch(`${DuZillaClound}/api/account/searchuserbynameornameid/${query}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        });

        if(res.status == 200){
            return await res.json();
        }else{
            throw new Error(`error: ${res.status} ${(await res.json()).message}`);
        }
    }catch(error){
        throw error;
    }
}