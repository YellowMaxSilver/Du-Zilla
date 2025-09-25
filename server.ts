import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';

const app = express();
const port = 3000;


// Serve arquivos estáticos do build Vite
app.use(express.static(path.join(__dirname,'public', 'client', 'dist')));

// Serve imagens e CSS da pasta public
app.use('/assets/', express.static(path.join(__dirname,'client','dist', 'assets')));
app.use('/images', express.static(path.join(__dirname, 'client', 'public', 'images')));
app.use('/style', express.static(path.join(__dirname, 'client', 'public', 'style')));



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


    app.get('/studio/:page',async (req,res)=>{
        const urlPage = req.params.page;
        switch(urlPage){
            case "panel":
                openHtmlFile(req,res,"portfolioPanel");
                break;
            case "edit":
                openHtmlFile(req,res,"editPortfolio");
                break;
            case "my-projects":
                //openHtmlFile(req,res,"myProjects");
                res.send("thats my projects page");
                break;
            default:
                res.redirect("/studio/my-projects")
                break;
        }
    });

    app.get('/studio', (_req, res) => {
        res.redirect('/studio/my-projects');
    });


    app.get('/login',async (req,res)=>{
        openHtmlFile(req,res,"login");
    });

    app.get('/register',async (req,res)=>{
        openHtmlFile(req,res,"signUp");
    });

    app.get('/account/settings',async (req,res)=>{
        res.send("em andamento")
    })

    async function openHtmlFile(req:any,res:any,file:string){
        const fullPath = path.resolve(__dirname,`./client/pages/${file}.html`);
        const url = req.originalUrl;
        let template = fs.readFileSync(fullPath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);

        res.status(200).set({'Content-Type':'text/html'}).end(template);
    }

    app.use(vite.middlewares);

    app.listen(port,()=>{
    console.log(`server running in the port ${port}`)
    });
}

createServer();
