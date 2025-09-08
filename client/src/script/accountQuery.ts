
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
                console.log(data);
                console.log(data.name);
                console.log(data.email)
            })
        }else{
            
        }
    }catch(e){
        console.error("erro to find user ",e)
    }
}