import { ObjectId } from "mongodb";

export interface MessageDocument{
    _id:ObjectId,
    from:string,
    to:string,
    message:string,
    type:string,
    date:Date,
    viewed:boolean,
}

export interface MessageInput{
    from:string,
    to:string,
    message:string,
    type:string,
}

export interface MessageUpdate{
    message:string,
}