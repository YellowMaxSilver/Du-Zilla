import type { PortfolioInput, PortfolioDocument } from "../../../../database/portfolioInterface";

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