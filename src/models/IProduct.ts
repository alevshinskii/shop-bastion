import { IGost } from "./IGost";
import { IProductType } from "./IProductType";

export interface IProduct {
    id: number;
    name: string;
    type: IProductType;
    price: number;
    gost: IGost;
    promo: boolean;
    hit: boolean;
    image:string;
}
