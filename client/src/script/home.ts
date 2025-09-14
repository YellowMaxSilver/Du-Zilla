import {getAccountAttributeByUid, getCurrentSession } from "./accountQuery";
import { notification } from "./notification";

var accountUid:string|null = null;

var name:string|null|undefined = null;
var nameId:string|null = null;

getCurrentSession((uid:string|null)=>{
    accountUid = uid
    console.log(accountUid)
    if(accountUid != null){
    getAccountAttributeByUid(accountUid,(
        nameP,
        nameId,
        email,
        description,
        uid)=>{
            
        name = nameP;
        console.log(nameP+" "+nameId+" "+email+" "+description+" "+uid)    
        accontSet();
        })  
    }else{
        noAccountSet()
    }
})


function accontSet(){
    notification("dz",`Welcome back ${name}`)
}

function noAccountSet(){
    notification("dz",`Welcome to Du-zilla`)
}