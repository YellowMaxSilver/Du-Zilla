import express from 'express';
import path from 'path';
import fs from 'fs';
import router from './database/account_auth';
import cors from "cors";
import Express from "express";
import admin from "./database/firebase_admin";
import { db } from "./database/firebase_admin";
import cookieParse from "cookie-parser";

import { connectDB } from "./database/mongodbConnection"
import { PortfolioDocument } from './database/interface/portfolioInterface';
import { portfolioRouter } from './database/portfolio';
import formRouter from './database/form'
import { error } from 'console';
import { FormDataDocument, FormDocument } from './database/interface/formInterface';
import { ContactDocument } from './database/interface/contactInterface';
import messageRouter from './database/message';
import { MessageDocument } from './database/interface/messageInterface';
import contactRouter from './database/contact';
import { credential } from 'firebase-admin';

const app = express();
const port = process.env.PORT || 5000;
const COLLECTION_NAME = "portfolios"

const allowLinks = [
    "http://localhost:3000",
]

const corsOptions = {
    origin: function(origin:any, callback:any){
        if(allowLinks.indexOf(origin) !== -1 || !origin){
            callback(null,true);
        }else{
            callback(new Error("Not allowed by cors"))
        }
    },
    credentials: true,
}
// Serve arquivos estáticos do build Vite
app.use(express.static(path.join(__dirname,'public', 'client', 'dist')));

// Serve imagens e CSS da pasta public

app.use(express.json());
app.use(cookieParse());
app.use(cors(corsOptions));


connectDB().then(db =>{
    const portfolioCollection = db.collection<PortfolioDocument>(COLLECTION_NAME);
    const formCollection = db.collection<FormDocument>("forms");
    const formDataCollection = db.collection<FormDataDocument>("forms-data");
    const contactsCollection = db.collection<ContactDocument>("contacts");
    const messagesCollection = db.collection<MessageDocument>("messages");

    app.use('/api/portfolio',portfolioRouter(portfolioCollection));
    app.use('/api/form',formRouter(formCollection,formDataCollection));
    app.use('/api/message',messageRouter(messagesCollection));
    app.use('/api/contact',contactRouter(contactsCollection));
}).catch(error => {
    console.error("DB fatal error: "+error)
})

app.use("/api/account",router)

app.listen(port,()=>{
console.log(`server running in the port ${port}`)
});

