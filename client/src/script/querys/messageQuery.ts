import type { ObjectId } from 'mongodb';
import type { MessageDocument, MessageInput } from '../../../../database/interface/messageInterface'

export async function sendMessage(userMessage:MessageInput):Promise<MessageDocument>{
    try{
        const res = await fetch("/api/message/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(userMessage)
        })

        if(res.status == 201){
            return (await res.json());
        }else{
            throw new Error(`error: ${res.status} ${(await res.json()).message}`);
        }
    }catch(error){
        throw error;
    }
}

export async function getAllMessages(to:string,from:string): Promise<MessageDocument[]>{
    if(!to){
        throw new Error(`invalid 'to" field`);
    }
    if(!from){
        throw new Error(`invalid 'from" field`);
    }
    try{
        const res = await fetch(`/api/message/getallmessages/${to}/${from}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })

        if(res.status == 200){
            return (await res.json());
        }else{
            throw new Error(`error: ${res.status} ${(await res.json()).message}`);
        }
    }catch(error){
        throw error;
    }
}

export async function getMessageById(id:ObjectId): Promise<MessageDocument> {
    if(!id){
        throw new Error(`invalid 'id" field`);
    }
    try{
        const res = await fetch(`/api/message/getmessagebyid/${id}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })

        if(res.status == 200){
            return (await res.json());
        }else{
            throw new Error(`error: ${res.status} ${(await res.json()).message}`);
        }
    }catch(error){
        throw error;
    }
}

export async function updateMessage(id:ObjectId,newMessage:MessageInput): Promise<MessageDocument>{
    if(!id){
        throw new Error(`invalid 'id" field`);
    }
    if(!newMessage){
        throw new Error(`invalid message`);
    }
    try{
        const res = await fetch(`/api/message/${id}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newMessage)
        })

        if(res.status == 200){
            return (await res.json());
        }else{
            throw new Error(`error: ${res.status} ${(await res.json()).message}`);
        }
    }catch(error){
        throw error;
    }

}

export async function deleteMessage(id:string){
    if(!id){
        throw new Error(`invalid 'id" field`);
    }
    try{
        const res = await fetch(`/api/message/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
        })

        if(res.status == 200){
            return (await res.json());
        }else{
            throw new Error(`error: ${res.status} ${(await res.json()).message}`);
        }
    }catch(error){
        throw error;
    }
}