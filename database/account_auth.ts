import Express from "express";
import admin from "./firebase_admin";
import { db } from "./firebase_admin";


    const router = Express.Router();

    router.post("/signup",async (req,res)=>{
           try{
                const {name,nameId,email,cpf_cnpj} = req.body;

                // const name = req.body.name;
                // const nameId = req.body.nameId;
                // const email = req.body.email;
                // const cpf_cnpj = req.body.cpf_cnpj;

                const user = await admin.auth().getUserByEmail(email);
                const uid = user.uid;
    
                const docRef = await db.collection('Accounts')
    
                if(cpf_cnpj == null){
                    docRef.add({
                        ["name-id"]:nameId,
                        ["name"]:name,
                        ["email"]:email,
                        ["uid"]:uid,
                        ["cpf-cnpj"]:cpf_cnpj,
                        ["verified"]:false,
                        ["created-date"]:null,
                        ["description"]:null,
                        ["contry"]:null,
                        ["state"]:null,
                        ["city"]:null,
                        ["address"]:null
                    })
                    res.status(201).json({message:"account created with success: verified"})
                }else{
                    docRef.add({
                        ["name-id"]:nameId,
                        ["name"]:name,
                        ["email"]:email,
                        ["uid"]:uid,
                        ["cpf-cnpj"]:null,
                        ["verified"]:true,
                        ["created-date"]:null,
                        ["description"]:null,
                        ["contry"]:null,
                        ["state"]:null,
                        ["city"]:null,
                        ["address"]:null
                    })
                    res.status(201).json({message:"account created with success: not verified"})
                }
    
           }catch(error){
                res.status(500).json({message:`error in network to create user ${error}`});
           } 
    })
    

    router.get("/getaccountattributes/:userUid",async (req,res)=>{
        const userUid = req.params.userUid;
        try{
            const userRef = db.collection("Accounts");
            const querySnapshot = await userRef.where("uid","==",userUid).get();
            if(!querySnapshot.empty){
                let results:any = [];
                querySnapshot.forEach(doc=>{
                    results.push({id:doc.id, ...doc.data()});
                })

                res.status(200).json({
                    name:results[0].name,
                    nameId:results[0].nameId,
                    email :results[0].email,
                    uid:results[0].uid,
                    cpf_cnpj:results[0]["cpf-cnpj"],
                    verified:results[0].verified,
                    createDate:results[0]["create-date"],
                    description:results[0].description,
                    contry:results[0].contry,
                    state:results[0].state,
                    city:results[0].city,
                    address:results[0].address
                })
            }else{
               res.status(204).json({message:`not found user`}) 
            }
        }catch(e){
            res.status(500).json({message:`erro in network: ${e}`})
        }
    })

    router.patch("/api/account/setsoftattributes",(req,res)=>{

    })

    router.get("/finduserbyname",()=>{

    })

    router.get("/getcurrentsession",(req,res)=>{

    })

    function setCookiesSession(uid:string){

    }

    export default router;