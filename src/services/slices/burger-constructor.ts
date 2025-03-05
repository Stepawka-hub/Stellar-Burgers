import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TInitialState = {
  constructorItems: any;
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: TInitialState = {
  constructorItems: {
    bun: {
      id: null,
      price: 0
    },
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {},
  selectors: {
    getConstructorItems: (state) => state.constructorItems,
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData
  }
});

export const reducer = burgerConstructorSlice.reducer;
export const { getConstructorItems, getOrderRequest, getOrderModalData } =
  burgerConstructorSlice.selectors;
