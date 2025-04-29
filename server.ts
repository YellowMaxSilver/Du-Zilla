import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname,"./public")))

app.get('/:page',(req,res)=>{
    const urlPage = req.params.page;
    if(urlPage != null){
        res.sendFile(path.join(__dirname,`./public/${urlPage}.html`),(err)=>{
            if(err){
                res.status(404).send(`page not found`);
            }
        });
    }else{
        res.send(`Welcome to the port ${port}`)
    }
});

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public/index.html'));
});

app.listen(port,()=>{
    console.log(`server running in the port ${port}`)
});