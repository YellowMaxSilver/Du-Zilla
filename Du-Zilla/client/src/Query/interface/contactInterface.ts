import { ObjectId } from "mongodb";


export interface ContactDocument{
    _id:ObjectId,
    owner:string,
    user:string,
    date:Date,
    blocked:boolean
}

export interface ContactInput{
    owner:string,
    user:string,
}

export interface ContactUpdate{
    blocked:boolean
}