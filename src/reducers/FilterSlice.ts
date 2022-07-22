import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilter } from "../models/IFilter";
import { IGostFilter } from "../models/IGostFilter";
import { IPriceFilter } from "../models/IPriceFilter";
import { ITypeFilter } from "../models/ITypeFilter";

interface FilterState {
    filter: IFilter;
    isLoading: boolean;
    error: string;
}

const initialState: FilterState = {
    filter: {
        price: { min: 104, max: 999 },
        type: [
            { type: { id: 1, name: "Опора тавровая" }, use: false },
            { type: { id: 2, name: "Опора корпусная" }, use: false },
            { type: { id: 3, name: "Опора подвижная" }, use: false },
            { type: { id: 4, name: "Опора трубчатая" }, use: false },
        ],
        gost: [
            { gost: { id: 1, name: "ГОСТ 14911-82" }, use: false },
            { gost: { id: 2, name: "ОСТ 36-146-88" }, use: false },
            { gost: { id: 3, name: "НТС 65-06" }, use: false },
        ],
    },
    isLoading: false,
    error: "",
};

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        addTypeFilter(state, action: PayloadAction<ITypeFilter>) {
            state.filter.type.push(action.payload);
        },
        addGostFilter(state, action: PayloadAction<IGostFilter>) {
            state.filter.gost.push(action.payload);
        },
        updatePriceFilter(state, action: PayloadAction<IPriceFilter>) {
            state.filter.price = action.payload;
        },
        setMinPrice(state, action: PayloadAction<number>) {
            state.filter.price.min = action.payload;
        },
        setMaxPrice(state, action: PayloadAction<number>) {
            state.filter.price.max = action.payload;
        },
        toggleTypeFilter(state,action:PayloadAction<number>){
            const selectedType=state.filter.type.find(t=>t.type.id==action.payload);
            if(selectedType){
                selectedType.use=!selectedType.use;
            }
            else{
                console.log("Error! Can't find type filter with id: "+ action.payload)
            }
        },
        toggleGostFilter(state,action:PayloadAction<number>){
            const selectedGost=state.filter.gost.find(g=>g.gost.id==action.payload);
            if(selectedGost){
                selectedGost.use=!selectedGost.use;
            }
            else{
                console.log("Error! Can't find gost filter with id: "+ action.payload)
            }
        },
        resetFilters(state,action:PayloadAction<IFilter>){
            state.filter=action.payload
        },
    },
});

const { actions, reducer } = filterSlice;

export const {
    addTypeFilter,
    addGostFilter,
    updatePriceFilter,
    setMinPrice,
    setMaxPrice,
    toggleTypeFilter,
    toggleGostFilter,
    resetFilters,
} = actions;

export default reducer;
