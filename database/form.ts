import { Router } from "express";
import { Collection, ObjectId } from "mongodb";
import { FormDocument, FormInput, FormUpdate } from "./interface/formInterface";
import { messaging } from "firebase-admin";

export default function formRouter(formCollection: Collection<FormDocument>,formDataCollection: Collection<FormDocument>):Router{
    const router = Router();

    router.post('/',async (req,res)=>{
        const form:FormInput = req.body;

        try{
            if(form == null){
                res.status(400).json({message:"form is null"});
            }

            const formData:FormDocument = {
                _id: new ObjectId,
                ...form,
                createdAt: new Date
            }
            const result = await formCollection.insertOne(formData as FormDocument);
            if(result.acknowledged){
                const newForm:FormDocument = {
                    _id: result.insertedId,
                    ...form,
                    createdAt: new Date,
                };
                res.status(201).json(newForm);
            }
        }catch(error){
            res.status(500).json({message:`Server error: ${error}`});
        }
    });

    router.patch('/updateform/:id',async (req,res)=>{
        const id = new ObjectId(req.params.id);
        const form:FormUpdate = req.body;

        try{
            if(!ObjectId.isValid(id)){
                res.status(400).json({message:"invalid id"});
            }

            const result = await formCollection.findOneAndUpdate(
                {_id:id},
                {$set:form},
                {returnDocument:"after"}
            );

            if(result == null){
                res.status(404).json({message:"forms not found"})
            }

            res.status(200).json(result);
        }catch(error){
            res.status(500).json({message:`Server error: ${error}`});
        }
    })

    router.get('/getformbyportfolioid/:id',async (req,res)=>{
        const id = req.params.id;

        try{
            if(!ObjectId.isValid(id)){
                res.status(400).json({message:"invalid id"});
            }

            const result = await formCollection.find({portfolio_id:id}).toArray();

            if(result == null){
                res.status(404).json({message:"forms not found"})
            }

            res.status(200).json(result);
        }catch(error){
            res.status(500).json({message:`Server error: ${error}`});
        }
    })

    router.get('/getformbyid/:id',async (req,res)=>{
        const id = req.params.id;
        const idObject = new ObjectId(id)
        try{
            if(!ObjectId.isValid(id)){
                res.status(400).json({message:"invalid id"});
            }

            const result = await formCollection.findOne({_id:idObject});

            if(result == null){
                res.status(404).json({message:"forms not found"})
            }

            res.status(200).json(result);
        }catch(error){
            res.status(500).json({message:`Server error: ${error}`});
        }
    });

    return router;
}