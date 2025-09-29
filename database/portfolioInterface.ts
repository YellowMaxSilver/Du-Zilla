import { ObjectId } from "mongodb"; 

export interface PortfolioDocument{
    _id: ObjectId;
    createdAt:Date;
    lastUpdated:Date;
    //===>
    name: string;
    description?:string;
    creator:string;
    visibility:string;
    type:string;
    views:number;
    code:string;
    tag?:string[];
}

export interface PortfolioInput{
    name: string;
    description?:string;
    creator:string;
    visibility:string;
    type:string;
    views:number;
    code:string;
    tag?:string[];
}