import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

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
  reducers: {
    addIngredient: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.constructorItems.bun = payload;
        } else {
          state.constructorItems.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, { payload }: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (i: TConstructorIngredient) => i.id !== payload
        );
    },
    setOrderRequest: (state, { payload }: PayloadAction<boolean>) => {
      state.orderRequest = payload;
    }
  },
  selectors: {
    getConstructorItems: (state) => state.constructorItems,
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData
  }
});

export const reducer = burgerConstructorSlice.reducer;
export const { getConstructorItems, getOrderRequest, getOrderModalData } =
  burgerConstructorSlice.selectors;
export const { addIngredient, removeIngredient, setOrderRequest } =
  burgerConstructorSlice.actions;
