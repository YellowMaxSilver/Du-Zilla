import express from 'express';

const app = express();
const port = 3000;

app.get('/:page',(req,res)=>{
    const urlPage = req.params.page;
    if(urlPage != null){
        res.send(`Welcome to the port ${port}. page ${urlPage}`);
    }else{
        res.send(`Welcome to the port ${port}`)
    }
});

app.get('/',(req,res)=>{
    res.send(`Welcome to the port ${port}`)
});

app.listen(port,()=>{
    console.log(`server running in the port ${port}`)
});