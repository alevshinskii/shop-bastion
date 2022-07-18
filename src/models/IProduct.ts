import { IProductType } from "./IProductType";

export interface IProduct{
    id : number,
    name : string,
    type : IProductType,
    price: number,
    gost: string
}