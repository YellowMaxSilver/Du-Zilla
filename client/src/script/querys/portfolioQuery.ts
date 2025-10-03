import type { PortfolioInput, PortfolioDocument, PortfolioDocumentUpdate } from "../../../../database/portfolioInterface";

// export interface PortfolioDocument{
//     _id: ObjectId;
//     name: string;
//     description?:string;
//     creator:string;
//     createdAt:Date;
//     lastUpdated:Date;
// }

// export interface PortfolioInput{
//     name: string;
//     description?:string;
//     creator:string;
// }




export async function createNewPortfolio(portfolioData: PortfolioInput): Promise<PortfolioDocument>{
    try{
        const res = await fetch("/api/portfolio",{
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(portfolioData),
        });

        if(!res.ok){
            const errorData = await res.json()
            throw new Error(`error: ${res.status}: ${errorData.message || 'Error to create'}`);
        }

        const newPortfolio: PortfolioDocument = await res.json();

        return newPortfolio;
    }catch(error){
        console.error("Error to create portfolio: ",error);
        throw error;
    }
}

export async function getPortfolioById(portfolioId: string): Promise<PortfolioDocument>{
    try{
        const res = await fetch(`/api/portfolio/getportfoliobyid/${portfolioId}`,{
            method: "GET",
            headers:{
                "Content-Type":"application/json"
            }
        });

        if(res.status == 200){
            const portfolio:PortfolioDocument = await res.json()
            return portfolio
        }else{
            const error = await res.json();
            throw new Error(`Error: ${res.status} ${error.message}`);
        }
    }catch(error){
        throw error;
    }
}

export async function getAllPortfoliosByUserUid(portfolioId:string): Promise<PortfolioDocument>{
    try{
        const res = await fetch(`/api/portfolio/getallportfoliosbyuseruid/${portfolioId}`,{
            method: "GET",
            headers:{
                "Content-Type":"application/json"
            }
        });

        if(res.status == 200){
            const portfolio:PortfolioDocument = await res.json()
            return portfolio
        }else{
            const error = await res.json();
            throw new Error(`Error: ${res.status} ${error.message}`);
        }
    }catch(error){
        throw error;
    }
}

export async function getPortfoliosByNameAndTag(portfolioId:string): Promise<PortfolioDocument>{
    try{
        const res = await fetch(`/api/portfolio/getportfoliosbynameandtag/${portfolioId}`,{
            method: "GET",
            headers:{
                "Content-Type":"application/json"
            }
        });

        if(res.status == 200){
            const portfolio:PortfolioDocument = await res.json()
            return portfolio
        }else{
            const error = await res.json();
            throw new Error(`Error: ${res.status} ${error.message}`);
        }
    }catch(error){
        throw error;
    }
}

export async function updatePortfolio(portfolioId:string,newPortfolio:PortfolioDocumentUpdate): Promise<PortfolioDocument>{
    try{
        const res = await fetch(`/api/portfolio/updatePortfolio/${portfolioId}`,{
            method: "PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newPortfolio)
        });

        if(res.status == 200){
            const portfolio:PortfolioDocument = await res.json()
            return portfolio
        }else{
            const error = await res.json();
            throw new Error(`Error: ${res.status} ${error.message}`);
        }
    }catch(error){
        throw error;
    }
}


export async function getAllPortfolios(): Promise<PortfolioDocument[]>{
    try{
        const res = await fetch("/api/portfolio/getallportfoliosbycategory",{
            method: "GET",
            headers: {"Content-Type":"application/json"},
        })

        if(res.status == 200){
            return await res.json();
        }else{
            throw new Error(`error: ${res.status} ${(await res.json()).message}`);
        }
    }catch(err){
        throw err;
    }
}