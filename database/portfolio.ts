import admin from "./firebase_admin";
import { db } from "./firebase_admin";
import Express from "express";
import { Router, Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { PortfolioDocument, PortfolioInput, PortfolioDocumentUpdate } from "./portfolioInterface";

export const portfolioRouter = (portfolioCollection: Collection<PortfolioDocument>) => {
    const router = Router();

    router.post('/', async (req: Request<{}, {},PortfolioInput>, res: Response )=>{
        try{
            const portfolioData: PortfolioInput = req.body;
            const dataToInsert: PortfolioDocument = {
                _id: new ObjectId,
                ...portfolioData,
                createdAt: new Date(),
                lastUpdated: new Date(),
            };

            const result = await portfolioCollection.insertOne(dataToInsert as PortfolioDocument);
            if(result.acknowledged){
                const newPortfolio: PortfolioDocument = {
                    _id: result.insertedId,
                    ...portfolioData,
                    createdAt: new Date(),
                    lastUpdated: new Date(),
                };
                res.status(201).json(newPortfolio);
            }else{
                throw new Error("Error to insert document.");
            }
        }catch (error){
            res.status(500).json({message:"Error to create portfolio"})
        }
    })

    router.get('/getportfoliobyid/:id',async (req,res)=>{
        const portfolioId = req.params.id;
        const portfolioIdObject = new ObjectId(portfolioId);
        try{
            const portfolio: PortfolioDocument | null = await portfolioCollection.findOne({_id:portfolioIdObject});

            if(portfolio == null){
                res.status(404).json({message:`portfolio not found`})
            }

            res.status(200).json(portfolio);
        }catch(error){
            console.error(error)
            res.status(500).json({message:error})
        }
    })

    router.patch('/updateportfolio/:id',async (req,res)=>{
        const id = req.params.id;
        if(!ObjectId.isValid(id)){
            res.status(400).json({message:"invalid id"});
        }

        const portfolioIdObject = new ObjectId(id);

        const updateData: PortfolioDocumentUpdate = req.body;
        try{
         const result = await portfolioCollection.findOneAndUpdate(
            {_id:portfolioIdObject},
            {$set: updateData},
            {returnDocument: 'after'}
         );
         
         if(result == null){
            res.status(404).json({message:"portfolio not found"});
         }
         
         res.status(200).json(result);
        }catch(error){
            console.error("Error to update portfolio: ",error);
            res.status(500).json({message:`Error to update portfolio: ${error}`})
        }
    });

    router.delete('/deleteportfolio/:id',async (req,res)=>{
        const portfolioId = new ObjectId(req.params.id);

        if(!ObjectId.isValid(portfolioId)){
            res.status(400).json({message:"invalid portfolio id"});
        }
        try{

            const result = portfolioCollection.findOneAndDelete({_id:portfolioId})
            if(result == null){
                res.status(404).json({message:"portfolio not found"})
            }
            
            res.status(200).json({message:"portfolio delete successifuly"})
        }catch(error){
            res.status(500).json({message:`Server error: ${error}`})
        }
    })

    return router;
}


//update portfolio

//create portfolio

//search portfolios