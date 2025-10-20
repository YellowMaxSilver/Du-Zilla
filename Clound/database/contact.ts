import { Router } from "express";
import { ContactDocument, ContactInput, ContactUpdate } from "./interface/contactInterface";
import { Collection, ObjectId } from "mongodb";

export default function contactRouter(contactsCollection: Collection<ContactDocument>):Router{
    const router = Router();
    
    router.post("/",async (req,res)=>{
        const contact:ContactInput = req.body;
        if(!contact){
            res.status(400).json({message:"invalid contact"})
        }
        try{
            const contactToInsert:ContactDocument = {
                _id: new ObjectId(),
                ... contact,
                date: new Date(),
                blocked: false
            }

            const result = await contactsCollection.insertOne(contactToInsert);
            if(result.acknowledged){
                const newContact:ContactDocument = {
                    _id: result.insertedId,
                    ...contact,
                    date: new Date,
                    blocked: false
                };

                res.status(201).json(newContact);
            }
        }catch(error){
            res.status(500).json({message:`Server error: ${error}`});
        }
    })

    router.get("/getcontactbyid/:id",async(req,res)=>{
        const id = new ObjectId(req.params.id);
        if(!ObjectId.isValid(id)){
            res.status(400).json({message:"invalid id"})
        }
        try{
            const result = await contactsCollection.findOne({_id:id})

            if(!result){
                res.status(404).json({message:"contact not found"});
            }

            res.status(200).json(result)
        }catch(error){
            res.status(500).json({message:`Server error: ${error}`});
        }
    })

    router.get("/getcontactbyowneruid/:uid",async(req,res)=>{
        const uid = req.params.uid;
        if(!uid){
            res.status(400).json({message:"invalid uid"})
        }
        try{
            const result = await contactsCollection.find({owner:uid}).toArray();

            if(!result){
                res.status(404).json({message:"contacts not found"});
            }
            res.status(200).json(result)
        }catch(error){
            res.status(500).json({message:`Server error: ${error}`});
        }
    });

    router.patch("/:id",async (req,res)=>{
        const id = new ObjectId(req.params.id);
        const contactUpdate:ContactUpdate = req.body;
        if(!ObjectId.isValid(id)){
            res.status(400).json({message:"invalid id"})
        }
        if(!contactUpdate){
            res.status(400).json({message:"invalid id"})
        }
        try{
            const result = await contactsCollection.findOneAndUpdate(
                {_id:id},
                {$set:contactUpdate},
                {returnDocument:"after"}
            );

            if(!result){
                res.status(404).json({message:"contacts not found"});
            }
            res.status(200).json(result)
        }catch(error){
            res.status(500).json({message:`Server error: ${error}`});
        }
    })

    router.delete("/:id",async(req,res)=>{
        const id = new ObjectId(req.params.id);
        if(!ObjectId.isValid(id)){
            res.status(400).json({message:"invalid id"})
        }
        try{
            const result = await contactsCollection.findOneAndDelete({_id:id})

            if(!result){
                res.status(404).json({message:"contacts not found"});
            }
            res.status(200).json({message:"contact deleted"})
        }catch(error){
            res.status(500).json({message:`Server error: ${error}`});
        }
    });
    return router;
}