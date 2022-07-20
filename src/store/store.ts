import { configureStore, combineReducers } from '@reduxjs/toolkit'
import productSlice from '../reducers/ProductSlice'
import productTypeSlice from '../reducers/ProductTypeSlice'
import cartSlice from '../reducers/CartSlice'

const rootReducer = combineReducers({
  productSlice,
  productTypeSlice,
  cartSlice,
})

export const setupStore = () => {
  return configureStore({
    reducer : rootReducer
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore =ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']