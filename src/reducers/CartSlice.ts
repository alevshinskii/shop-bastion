import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks/redux";
import { ICart } from "../models/ICart";
import { ICartItem } from "../models/ICartItem";

interface CartState {
    cart: ICart;
    isLoading: boolean;
    error: string;
}

const initialState: CartState = {
    cart: {
        id: Date.now(),
        items: [],
    },
    isLoading: false,
    error: "",
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        increaseItemQuantity(state, action: PayloadAction<number>) {
            const item = state.cart.items.find(
                (i) => i.product.id === action.payload
            );
            if (item) {
                item.quantity += 1;
            } else {
                console.log("Item with id" + action.payload + "is not exist.");
            }
        },
        decreaseItemQuantity(state, action: PayloadAction<number>) {
            const item = state.cart.items.find(
                (i) => i.product.id === action.payload
            );
            if (item) {
                item.quantity -= 1;
                if (item.quantity <= 0) {
                    state.cart.items=state.cart.items.filter(
                        (i) => i.product.id !== item.product.id
                    );
                }
            } else {
                console.log("Item with id" + action.payload + "is not exist.");
            }
        },
        addItem(state, action: PayloadAction<ICartItem>) {
            state.cart.items.push(action.payload);
        },
        removeItem(state, action: PayloadAction<number>) {
            state.cart.items=state.cart.items.filter((i) => i.product.id !== action.payload);
        },
        clearCart(state,action:PayloadAction<void>){
            state.cart.items=[];
        }
    },
});

const { actions, reducer } = cartSlice;

export const {
    increaseItemQuantity,
    decreaseItemQuantity,
    addItem,
    removeItem,
    clearCart,
} = actions;

export default reducer;
