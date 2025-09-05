import Express from "express";
import admin from "./firebase_admin";
import { db } from "./firebase_admin";


export default function accountAuthentication(){
    const app = Express();

    app.post("/api/account/signIn",async (req,res)=>{
       try{
            const{nameId,name,email,cpf_cnpj} = req.body;

            const user = await admin.auth().getUserByEmail(email);

            const docRef = await db.collection('Account')

            if(cpf_cnpj == null){
                docRef.add({
                    ["name-id"]:nameId,
                    ["name"]:name,
                    ["email"]:email,
                    ["cpf-cnpj"]:cpf_cnpj,
                    ["verified"]:true
                })
                res.status(201).json({message:"account created with success: verified"})
            }else{
                docRef.add({
                    ["name-id"]:nameId,
                    ["name"]:name,
                    ["email"]:email,
                    ["cpf-cnpj"]:null,
                    ["verified"]:false
                })
                res.status(201).json({message:"account created with success: not verified"})
            }

       }catch(error){
            res.status(500).json({message:`error in network to create user`});
       } 
    })

    app.get("/api/account/getAccountAttributes",()=>{

    })

    app.patch("/api/account/setSoftAttributes",(req,res)=>{

    })
}