import { Router } from "express";
import { Collection, ObjectId } from "mongodb";
import { MessageDocument, MessageInput, MessageUpdate } from "./interface/messageInterface";
import { FormInput } from "./interface/formInterface";

export default function messageRouter(messagesCollection: Collection<MessageDocument>):Router{
    const router = Router();

    router.post("/",async (req,res)=>{
        const message:MessageInput = req.body;

        if(!message){
            res.status(400).json({message:"empty message body"})
        }

        try{
            const dataToInsert:MessageDocument = {
                _id: new ObjectId(),
                date: new Date(),
                viewed: false,
                ...message
            }
            const result = await messagesCollection.insertOne(dataToInsert);

            if(result.acknowledged){
                const newMessage:MessageDocument = {
                    _id: result.insertedId,
                    ...message,
                    date: new Date,
                    viewed: false
                };

                res.status(201).json(newMessage);
            }
        }catch(error){
            res.status(500).json({message:`Server error: ${error}`});
        }
    })

    router.get("/getallmessages/:from/:to",async (req,res)=>{
        const from = req.params.from;
        const to = req.params.to;

        if(!from){
            res.status(400).json({message:`from field empty`});
        }

        if(!to){
            res.status(400).json({message:`to field empty`});
        }

        try{
            const result = await messagesCollection.find({
                $or: [{ from: to, to: from },
                    { from: from, to: to },
                ]
            }).toArray();

            if(!result){
                res.status(200).json(null);
            }

            res.status(200).json(result);
        }catch(error){
            res.status(500).json({message:`Server error: ${error}`});
        }
    })

    router.get("/getmessagebyid/:id",async (req,res)=>{
        const id = new ObjectId(req.params.id);

        if(!ObjectId.isValid(id)){
            res.status(400).json({message:`invalid id`});
        }

        try{
            const result = await messagesCollection.findOne({_id:id});

            if(!result){
                res.status(200).json(null);
            }

            res.status(200).json(result);
        }catch(error){
            res.status(500).json({message:`Server error: ${error}`});
        }
    })

    router.patch("/:id",async (req,res)=>{
        const id = req.params.id;
        const messageUpdate:MessageUpdate = req.body;
    })

    router.delete("/:id",async (req,res)=>{
        const id = req.params.id;
        const objectId = new ObjectId(id);

        if(!ObjectId.isValid(objectId)){
            res.status(400).json({message:`invalid id`});
        }

        try{
            const result = await messagesCollection.findOneAndDelete({_id:objectId});
        }catch(error){
            res.status(500).json({message:`Server error: ${error}`});
        }
    })

    return router;
}