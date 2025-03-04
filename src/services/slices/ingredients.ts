import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TInitialState = {
  buns: TIngredient[];
  souces: TIngredient[];
  mains: TIngredient[];
  isIngredientsLoading: boolean;
};

const initialState: TInitialState = {
  buns: [],
  souces: [],
  mains: [],
  isIngredientsLoading: false
};

const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getBunsSelector: (state) => state.buns,
    getSaucesSelector: (state) => state.souces,
    getMainsSelector: (state) => state.mains,
    getIsIngredientLoading: (state) => state.isIngredientsLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.isIngredientsLoading = false;
      })
      .addCase(
        getIngredients.fulfilled,
        (state, { payload }: PayloadAction<TIngredient[]>) => {
          payload.forEach((item) => {
            switch (item.type) {
              case 'bun':
                state.buns.push(item);
                break;
              case 'sauce':
                state.souces.push(item);
                break;
              case 'main':
                state.mains.push(item);
                break;
            }
          });
          state.isIngredientsLoading = false;
        }
      );
  }
});

export const getIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => await getIngredientsApi()
);

export const reducer = ingredientSlice.reducer;
export const {
  getBunsSelector,
  getSaucesSelector,
  getMainsSelector,
  getIsIngredientLoading
} = ingredientSlice.selectors;
