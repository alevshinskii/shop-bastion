import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../models/IProduct";


interface ProductState{
    products: IProduct[],
    isLoading: boolean,
    error:string
}

const initialState : ProductState = {
    products:[],
    isLoading:false,
    error:''
}

export const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{

    }
})

export default productSlice.reducer;