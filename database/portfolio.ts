import admin from "./firebase_admin";
import { db } from "./firebase_admin";
import Express from "express";
import { Router, Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { PortfolioDocument, PortfolioInput } from "./portfolioInterface";

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

    return router;
}


//update portfolio

//create portfolio

//search portfolios