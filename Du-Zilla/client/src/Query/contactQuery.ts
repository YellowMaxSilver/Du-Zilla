import type {ContactDocument, ContactInput, ContactUpdate} from "../../../../Clound/database/interface/contactInterface"

const DuZillaClound = "http://localhost:5000";

export async function createContact(contact:ContactInput): Promise<ContactDocument>{
    try{
        const res = await fetch(`${DuZillaClound}/api/contact/`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(contact)
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

export async function getContactById(id:string):Promise<ContactDocument>{
    if(!id){
        throw new Error(`invalid 'id" field`);
    }
    try{
        const res = await fetch(`${DuZillaClound}/api/contact/getcontactbyid/${id}`,{
            method:"GET",
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

export async function getContactsByOwnerUid(uid:string):Promise<ContactDocument>{
    if(!uid){
        throw new Error(`invalid 'uid" field`);
    }
    try{
        const res = await fetch(`${DuZillaClound}/api/contact/getcontactbyid/${uid}`,{
            method:"GET",
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

export async function blockContact(id:string,contact:ContactUpdate):Promise<ContactDocument>{
    if(!contact){
        throw new Error(`invalid 'contact' field`);
    }
    if(!id){
        throw new Error(`invalid 'id' field`);
    }
    try{
        const res = await fetch(`${DuZillaClound}/api/contact/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(contact)
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

export async function deleteContact(id:string):Promise<boolean>{
    if(!id){
        throw new Error(`invalid 'id' field`);
    }
    try{
        const res = await fetch(`${DuZillaClound}/api/contact/getcontactbyid/${id}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
        })

        if(res.status == 200){
            return true;
        }else{
            throw new Error(`error: ${res.status} ${(await res.json()).message}`);
        }
    }catch(error){
        throw error;
    }
}