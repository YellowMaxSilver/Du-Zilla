import { getCurrentSession } from "./accountQuery";


getCurrentSession((uid:string|null)=>{
    const accountUid = uid
    console.log(accountUid)
})
