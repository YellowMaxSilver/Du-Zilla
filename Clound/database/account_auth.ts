import Express from "express";
import admin from "./firebase_admin";
import { db } from "./firebase_admin";
import { AccountDocument } from "./interface/accountInterface";

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
                        ["verified"]:true,
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
    
    router.get("/getcurrentsession",async (req,res)=>{
        try{
            const currentSession = req.cookies["session"];
            const descodedClains = await admin.auth().verifySessionCookie(currentSession, true);

            res.status(200).json({message:descodedClains.uid})
        }catch(e){
            res.status(401).json({message:`error: ${e}`})
        }
    })

    router.post("/setcurrentsession",async (req,res)=>{
        const token = req.body["token"];
        const expiresIn = 60*60*24*1000;
        try{
            const sessionCookie = await admin.auth().createSessionCookie(token,{expiresIn});

            res.cookie('session',sessionCookie,{
                maxAge:expiresIn,
                httpOnly:true,
                secure:false,
                sameSite:"lax",
                path:"/"
            });
            
            res.status(200).json({message:`current session set`})
        }catch(e){
            res.status(401).json({message:`error: ${e}`})
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

                const account:AccountDocument = {
                    name:results[0].name,
                    nameId:results[0]["name-id"],
                    email :results[0].email,
                    uid:results[0].uid,
                    cpf_cnpj:results[0]["cpf-cnpj"],
                    activated:results[0].verified,
                    createDate:results[0]["create-date"],
                    description:results[0].description,
                    contry:results[0].contry,
                    state:results[0].state,
                    city:results[0].city,
                    address:results[0].address
                }
                res.status(200).json(account)
            }else{
               res.status(204).json({message:`not found user`}) 
            }
        }catch(e){
            res.status(500).json({message:`erro in network: ${e}`})
        }
    })

    router.get("/getaccountattributesbynameid/:nameId",async (req,res)=>{
        const nameId = req.params.nameId;
        try{
            const userRef = db.collection("Accounts");
            const querySnapshot = await userRef.where("name-id","==",nameId).get();
            if(!querySnapshot.empty){
                let results:any = [];
                querySnapshot.forEach(doc=>{
                    results.push({id:doc.id, ...doc.data()});
                })

                const account:AccountDocument = {
                    name:results[0].name,
                    nameId:results[0]["name-id"],
                    email :results[0].email,
                    uid:results[0].uid,
                    cpf_cnpj:results[0]["cpf-cnpj"],
                    activated:results[0].verified,
                    createDate:results[0]["create-date"],
                    description:results[0].description,
                    contry:results[0].contry,
                    state:results[0].state,
                    city:results[0].city,
                    address:results[0].address
                }
                res.status(200).json(account)
            }else{
               res.status(204).json({message:`not found user`}) 
            }
        }catch(e){
            res.status(500).json({message:`erro in network: ${e}`})
        }
    })

    router.patch("/setsoftattributes",async (req,res)=>{
        const {name,uid,description,cpf_cnpj,contry,state,city,address} = req.body;
        try{
            const userRef = db.collection("Accounts");
            const querySnapshot = await userRef.where("uid","==",uid).get();
        }catch(e){
            console.log(e)
            res.status(500)
        }
    })

    router.get("/searchuserbynameornameid/:query",async (req,res)=>{
        const name = req.params.query;

        try{
            if(!name){
                res.status(400).json({message:"not found query"})
            }
            const userRef = db.collection("Accounts");

            const startQuery = name;
            const endQuery = name+"\uf8ff";

            const querySnapshot = await userRef
            .where("name",">=",startQuery)
            .where("name","<",endQuery)
            .get();

            if(querySnapshot.empty){
                res.status(200).json({message:"user not found"})
            }
            
            let accounts: AccountDocument[] = [];
            querySnapshot.forEach(doc => {
                const data = doc.data();
                const account: AccountDocument = {
                    name: data.name,
                    nameId: data["name-id"],
                    email: data.email,
                    uid: data.uid,
                    cpf_cnpj: data["cpf-cnpj"],
                    activated: data.verified,
                    createDate: data["create-date"],
                    description: data.description,
                    contry: data.contry,
                    state: data.state,
                    city: data.city,
                    address: data.address
                };
                accounts.push(account);
            });

            // var allAccounts:AccountDocument[]|null = null;
            // for(let i = 0;i< accounts.lenght;i++){
            //     let results = accounts[i];
            //     const account:AccountDocument = {
            //         name:results[0].name,
            //         nameId:results[0]["name-id"],
            //         email :results[0].email,
            //         uid:results[0].uid,
            //         cpf_cnpj:results[0]["cpf-cnpj"],
            //         activated:results[0].verified,
            //         createDate:results[0]["create-date"],
            //         description:results[0].description,
            //         contry:results[0].contry,
            //         state:results[0].state,
            //         city:results[0].city,
            //         address:results[0].address
            //     }
            //     if (!allAccounts) {
            //         allAccounts = [account];
            //     } else {
            //         allAccounts.push(account);
            //     }
            // }
            res.status(200).json(accounts) 
        
        }catch(error){
            res.status(500).json({message:`Server error: ${error}`});
        }
    })


    export default router;