export interface AccountDocument{
    name:string,
    nameId:string,
    email:string,
    uid:string,
    cpf_cnpj:number,
    activated:boolean,
    createDate:Date,
    description?:string,
    contry?:string,
    state?:string,
    city?:string,
    address?:string
}

export interface AccountUpdate{
    name?:string,
    nameId?:string,
    email?:string,
    cpf_cnpj?:number,
    activated?:boolean,
    description?:string,
    contry?:string,
    state?:string,
    city?:string,
    address?:string
}