import { ICart } from "./ICart";

export interface IOrder{
    id:number,
    name:string,
    tel:string,
    email:string,
    org?:string,
    cart:ICart,
    total:number,
}