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

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        increaseItemQuantity(state, action: PayloadAction<number>) {
            const item = state.cart.items.find(
                (i) => i.product.id == action.payload
            );
            if (item) {
                item.quantity += 1;
            } else {
                console.log("Item with id" + action.payload + "is not exist.");
            }
        },
        decreaseItemQuantity(state, action: PayloadAction<number>) {
            const item = state.cart.items.find(
                (i) => i.product.id == action.payload
            );
            if (item) {
                item.quantity -= 1;
                if (item.quantity <= 0) {
                    state.cart.items.filter(
                        (i) => i.product.id != item.product.id
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
            state.cart.items.filter((i) => i.product.id != action.payload);
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
