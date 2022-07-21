import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks/redux";
import { ICart } from "../models/ICart";

interface CartState {
    cart: ICart;
    isLoading: boolean;
    error: string;
}

const initialState: CartState = {
    cart: {
        id: Date.now(),
        items: [
            {
                product: {
                    id: 1,
                    name: "Опора тавровая хомутовая ТХ",
                    type: { id: 1, name: "Опора тавровая" },
                    price: 999,
                    gost: "ГОСТ 14911-82",
                    hit: true,
                    promo: true,
                    image: "../content/item1.png",
                },
                quantity: 1,
            },
            {
                product: {
                    id: 2,
                    name: "Опора корпусная приварная КП",
                    type: { id: 2, name: "Опора корпусная" },
                    price: 104,
                    gost: "ГОСТ 14911-82",
                    hit: true,
                    promo: true,
                    image: "../content/item1.png",
                },
                quantity: 2,
            },
            {
                product: {
                    id: 3,
                    name: "Опора корпусная хомутовая КХ",
                    type: { id: 2, name: "Опора корпусная" },
                    price: 849.9,
                    gost: "ГОСТ 14911-82",
                    hit: true,
                    promo: true,
                    image: "../content/item1.png",
                },
                quantity: 3,
            },
            {
                product: {
                    id: 4,
                    name: "Опора подвижная ОПБ1",
                    type: { id: 3, name: "Опора подвижная" },
                    price: 849.9,
                    gost: "ГОСТ 14911-82",
                    hit: true,
                    promo: true,
                    image: "../content/item1.png",
                },
                quantity: 4,
            },
        ],
    },
    isLoading: false,
    error: "",
};

export const productSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
});

export default productSlice.reducer;
