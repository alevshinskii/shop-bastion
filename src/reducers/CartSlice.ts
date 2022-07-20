import { createSlice } from "@reduxjs/toolkit";
import { ICart } from "../models/ICart";
import { IProduct } from "../models/IProduct";

interface CartState {
    cart: ICart;
    isLoading: boolean;
    error: string;
}

const initialState: CartState = {
    cart: { id: Date.now(), items: [] },
    isLoading: false,
    error: "",
};

export const productSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
});

export default productSlice.reducer;
