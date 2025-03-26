import { orderBurgerApi, TNewOrderResponse } from '@api';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

export type TInitialState = {
  constructorItems: any;
  orderRequest: boolean;
  orderError: string | null;
  orderModalData: TOrder | null;
};

export const initialState: TInitialState = {
  constructorItems: {
    bun: {
      id: null,
      price: 0
    },
    ingredients: []
  },
  orderRequest: false,
  orderError: null,
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
          state.constructorItems.ingredients = [
            ...state.constructorItems.ingredients,
            payload
          ];
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
    },
    moveIngredient: (
      state,
      { payload }: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      // Достаём индексы, откуда и куда переместить ингредиент
      const { fromIndex, toIndex } = payload;

      // Убираем ингредиент с текущей позиции и возвращаем его
      const ingredientToMove = state.constructorItems.ingredients.splice(
        fromIndex,
        1
      )[0];

      // Размещаем наш ингредиент на новую позицию
      state.constructorItems.ingredients.splice(toIndex, 0, ingredientToMove);
    },
    setModalOrderData: (state, { payload }: PayloadAction<TOrder | null>) => {
      state.orderModalData = payload;
    }
  },
  selectors: {
    getConstructorItems: (state) => state.constructorItems,
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData
  },
  extraReducers(builder) {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
        state.orderError = null;
        state.constructorItems = {
          bun: {
            id: null,
            price: 0
          },
          ingredients: []
        };
      })
      .addCase(
        orderBurger.fulfilled,
        (state, { payload }: PayloadAction<TNewOrderResponse>) => {
          state.orderModalData = payload.order;
          state.orderError = null;
          state.orderRequest = false;
        }
      )
      .addCase(orderBurger.rejected, (state, { error }) => {
        state.orderError = error.message || null;
        state.orderRequest = false;
      });
  }
});

export const orderBurger = createAsyncThunk(
  'constructor/orderBurger',
  async (ingredients: string[]) => orderBurgerApi(ingredients)
);

export const reducer = burgerConstructorSlice.reducer;
export const { getConstructorItems, getOrderRequest, getOrderModalData } =
  burgerConstructorSlice.selectors;
export const {
  addIngredient,
  removeIngredient,
  setOrderRequest,
  moveIngredient,
  setModalOrderData
} = burgerConstructorSlice.actions;
