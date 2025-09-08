import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import router from './database/account_auth';

import Express from "express";
import admin from "./database/firebase_admin";
import { db } from "./database/firebase_admin";



const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname,"./public")))
app.use(express.json())



// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'./public/index.html'));
// });

async function createServer(){
    const vite = await createViteServer({
        server: {middlewareMode: true},
        root: path.resolve(__dirname,'./client'),
        appType: 'custom'
    })

    app.get('',async (req,res)=>{
        const url = req.originalUrl;
        try{
            const templatePath = path.resolve(__dirname,'./client/pages/index.html');
            let template = fs.readFileSync(templatePath, 'utf-8');
            template = await vite.transformIndexHtml(url, template);

            res.status(200).set({'Content-Type':'text/html'}).end(template);
        }
        catch(e){
            res.send('not found');
        }
    })

    app.get('/:page',async (req,res)=>{
        const urlPage = req.params.page;
        const url = req.originalUrl;
        if(urlPage != null){
            try{
            const templatePath = path.resolve(__dirname,`./client/pages/${urlPage}.html`);
            let template = fs.readFileSync(templatePath, 'utf-8');
            template = await vite.transformIndexHtml(url, template);

            res.status(200).set({'Content-Type':'text/html'}).end(template);
            }
            catch(e){
                res.send('not found');
                console.error("error: ",e);
            }
        }else{
            res.send(`Welcome to the port ${port}`)
        }
    });


    app.use("/api/account",router)

    app.use(vite.middlewares);

    app.listen(port,()=>{
    console.log(`server running in the port ${port}`)
    });
}

createServer();
