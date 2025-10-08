import type { AccountDocument } from "../../../../database/interface/accountInterface";
import type { FormDocument, FormInput, FormUpdate, FormDataDocument, FormDataInput } from "../../../../database/interface/formInterface";

export async function getformsbyportfolioid(portfolioId:string): Promise<FormDocument> {
    try{
        const res = await fetch('/api/form/getformbyportfolioid',{
            method: "GET",
            headers:{
                "Content-Type":"application/json"
            }
        });

        if(res.status == 200){
            return await res.json();
        }else{
            throw new Error(`error: ${res.status} ${(await res.json()).message}`);
        }
    }catch(error){
        throw error;
    }
}

export async function createForm(form:FormInput): Promise<FormDocument>{
    try{
        const res = await fetch('/api/form/',{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(form)
        });

        if(res.status == 201){
            return await res.json();
        }else{
            throw new Error(`error: ${res.status} ${(await res.json()).message}`);
        }
    }catch(error){
        throw error;
    }
}

export async function updateForm(id:string,form:FormUpdate): Promise<FormDocument>{
    try{
        const res = await fetch(`/api/form/updateForm/${id}`,{
            method: "PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(form)
        });

        if(res.status == 200){
            return await res.json();
        }else{
            throw new Error(`error: ${res.status} ${(await res.json()).message}`);
        }
    }catch(error){
        throw error;
    }
}

export async function getFormById(id:string): Promise<FormDocument>{
   try{
        const res = await fetch(`/api/form/getformbyid/${id}`,{
            method: "GET",
            headers:{
                "Content-Type":"application/json"
            }
        });

        if(res.status == 200){
            return await res.json();
        }else{
            throw new Error(`error: ${res.status} ${(await res.json()).message}`);
        }
    }catch(error){
        throw error;
    }     
}

export async function verifyFormExistence(id:string): Promise<boolean>{
   try{
        const res = await fetch(`/api/form/getformbyid/${id}`,{
            method: "GET",
            headers:{
                "Content-Type":"application/json"
            }
        });

        if(res.status == 200){
            return true;
        }else{
            return false;
        }
    }catch(error){
        throw error;
    }     
}

export async function sendDataToForm(data:FormDataInput): Promise<FormDataDocument>{
    try{
        const res = await fetch(`/api/form/senddatatoform/`,{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        });

        if(res.status == 201){
            return await res.json();
        }else{
            throw new Error(`error: ${res.status} ${(await res.json()).message}`);
        }
    }catch(error){
        throw error;
    }  
}
