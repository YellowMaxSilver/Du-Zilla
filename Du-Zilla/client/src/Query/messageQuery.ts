import type { MessageDocument, MessageInput } from '../../../../Clound/database/interface/messageInterface'

const DuZillaClound = "http://localhost:5000";

export async function sendMessage(userMessage:MessageInput):Promise<MessageDocument>{
    try{
        const res = await fetch(`${DuZillaClound}/api/message/`,{
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
        const res = await fetch(`${DuZillaClound}/api/message/getallmessages/${to}/${from}`,{
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

export async function getMessageById(id:string): Promise<MessageDocument> {
    if(!id){
        throw new Error(`invalid 'id" field`);
    }
    try{
        const res = await fetch(`${DuZillaClound}/api/message/getmessagebyid/${id}`,{
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

export async function updateMessage(id:string,newMessage:MessageInput): Promise<MessageDocument>{
    if(!id){
        throw new Error(`invalid 'id" field`);
    }
    if(!newMessage){
        throw new Error(`invalid message`);
    }
    try{
        const res = await fetch(`${DuZillaClound}/api/message/${id}`,{
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
        const res = await fetch(`${DuZillaClound}/api/message/${id}`,{
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