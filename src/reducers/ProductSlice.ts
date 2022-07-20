import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../models/IProduct";

interface ProductState {
    products: IProduct[];
    isLoading: boolean;
    error: string;
}

const initialState: ProductState = {
    products: [
        {
            id: 1,
            name: "Опора тавровая хомутовая ТХ",
            type: { id: 1, name: "Опора тавровая" },
            price: 849.9,
            gost: "ГОСТ 14911-82",
            hit: true,
            promo: true,
        },
        {
            id: 2,
            name: "Опора корпусная приварная КП",
            type: { id: 2, name: "Опора корпусная" },
            price: 849.9,
            gost: "ГОСТ 14911-82",
            hit: true,
            promo: true,
        },
        {
            id: 3,
            name: "Опора корпусная хомутовая КХ",
            type: { id: 2, name: "Опора корпусная" },
            price: 849.9,
            gost: "ГОСТ 14911-82",
            hit: true,
            promo: true,
        },
        {
            id: 4,
            name: "Опора подвижная ОПБ1",
            type: { id: 3, name: "Опора подвижная" },
            price: 849.9,
            gost: "ГОСТ 14911-82",
            hit: true,
            promo: true,
        },
        {
            id: 5,
            name: "Опора подвижная ОПБ2",
            type: { id: 3, name: "Опора подвижная" },
            price: 849.9,
            gost: "ГОСТ 14911-82",
            hit: true,
            promo: true,
        },
        {
            id: 6,
            name: "Опора трубчатая ТР",
            type: { id: 4, name: "Опора трубчатая" },
            price: 849.9,
            gost: "ГОСТ 14911-82",
            hit: true,
            promo: true,
        },
        {
            id: 7,
            name: "Опора тавровая приварная ТП",
            type: { id: 1, name: "Опора тавровая" },
            price: 849.9,
            gost: "ГОСТ 14911-82",
            hit: true,
            promo: true,
        },
        {
            id: 8,
            name: "Опора подвижная ОПП3",
            type: { id: 3, name: "Опора подвижная" },
            price: 849.9,
            gost: "ГОСТ 14911-82",
            hit: true,
            promo: true,
        },
        {
            id: 9,
            name: "Опора подвижная ОПП2",
            type: { id: 3, name: "Опора подвижная" },
            price: 849.9,
            gost: "ГОСТ 14911-82",
            hit: true,
            promo: true,
        },
    ],
    isLoading: false,
    error: "",
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
});

export default productSlice.reducer;
