import { IGostFilter } from "./IGostFilter";
import { IPriceFilter } from "./IPriceFilter";
import { ITypeFilter } from "./ITypeFilter";

export interface IFilter {
    price: IPriceFilter;
    type: ITypeFilter[];
    gost: IGostFilter[];
}
