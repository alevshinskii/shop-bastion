import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../models/IProduct";
import CartSlice from "./CartSlice";

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
            price: 999,
            gost: "ГОСТ 14911-82",
            hit: true,
            promo: true,
            image:"../content/item1.png",
        },
        {
            id: 2,
            name: "Опора корпусная приварная КП",
            type: { id: 2, name: "Опора корпусная" },
            price: 104,
            gost: "ГОСТ 14911-82",
            hit: true,
            promo: true,
            image:"../content/item1.png",
        },
        {
            id: 3,
            name: "Опора корпусная хомутовая КХ",
            type: { id: 2, name: "Опора корпусная" },
            price: 849.9,
            gost: "ГОСТ 14911-82",
            hit: true,
            promo: true,
            image:"../content/item1.png",
        },
        {
            id: 4,
            name: "Опора подвижная ОПБ1",
            type: { id: 3, name: "Опора подвижная" },
            price: 849.9,
            gost: "ГОСТ 14911-82",
            hit: true,
            promo: true,
            image:"../content/item1.png",
        },
        {
            id: 5,
            name: "Опора подвижная ОПБ2",
            type: { id: 3, name: "Опора подвижная" },
            price: 849.9,
            gost: "ГОСТ 14911-82",
            hit: true,
            promo: true,
            image:"../content/item1.png",
        },
        {
            id: 6,
            name: "Опора трубчатая ТР",
            type: { id: 4, name: "Опора трубчатая" },
            price: 849.9,
            gost: "ГОСТ 14911-82",
            hit: true,
            promo: true,
            image:"../content/item1.png",
        },
        {
            id: 7,
            name: "Опора тавровая приварная ТП",
            type: { id: 1, name: "Опора тавровая" },
            price: 849.9,
            gost: "ГОСТ 14911-82",
            hit: true,
            promo: true,
            image:"../content/item1.png",
        },
        {
            id: 8,
            name: "Опора подвижная ОПП3",
            type: { id: 3, name: "Опора подвижная" },
            price: 849.9,
            gost: "ГОСТ 14911-82",
            hit: true,
            promo: true,
            image:"../content/item1.png",
        },
        {
            id: 9,
            name: "Опора подвижная ОПП2",
            type: { id: 3, name: "Опора подвижная" },
            price: 849.9,
            gost: "ГОСТ 14911-82",
            hit: true,
            promo: true,
            image:"../content/item1.png",
        },
    ],
    isLoading: false,
    error: "",
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProduct:(state, action:PayloadAction<IProduct>)=>{
            state.products.push(action.payload)
        },

    },
});
// Извлекаем объект с создателями и редуктор
const { actions, reducer } = productSlice;
// Извлекаем и экспортируем каждого создателя по названию
export const {
  addProduct
} = actions;
// Экпортируем редуктор по умолчанию или по названию
export default reducer;
