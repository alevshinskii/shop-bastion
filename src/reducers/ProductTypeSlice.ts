import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductType } from "../models/IProductType";

interface ProductTypeState {
    types: IProductType[];
    isLoading: boolean;
    error: string;
}

const initialState: ProductTypeState = {
    types: [
        { id: 1, name: "Опора тавровая" },
        { id: 2, name: "Опора корпусная" },
        { id: 3, name: "Опора подвижная" },
        { id: 4, name: "Опора трубчатая" },
    ],
    isLoading: false,
    error: "",
};

export const productTypeSlice = createSlice({
    name: "type",
    initialState,
    reducers: {
        addType(state, action: PayloadAction<IProductType>){
            state.types.push(action.payload)
        }
    },
});

// Извлекаем объект с создателями и редуктор
const { actions, reducer } = productTypeSlice;
// Извлекаем и экспортируем каждого создателя по названию
export const {
    addType
} = actions;
// Экпортируем редуктор по умолчанию или по названию
export default reducer;
