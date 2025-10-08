import { ObjectId } from "mongodb";

export interface FormDocument{
    _id:ObjectId,
    name:string,
    description?:string,
    creator:string,
    portfolio_id:string,
    createdAt:Date
}

export interface FormInput{
    name:string,
    description?:string,
    creator:string,
    portfolio_id:string
}

export interface FormUpdate{
    name?:string,
    description?:string,
}

export interface FormDataDocument{
    _id:ObjectId,
    userUid:string,
    formId:string,
    contact:string,
    description?:string,
    date:Date
}

export interface FormDataInput{
    userUid:string,
    formId:string,
    contact:string,
    description?:string,
}