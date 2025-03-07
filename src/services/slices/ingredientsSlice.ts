import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TInitialState = {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  currentIngredient: TIngredient | null;
};

const initialState: TInitialState = {
  ingredients: [],
  isIngredientsLoading: false,
  currentIngredient: null
};

const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setCurrentIngredient: (state, { payload }: PayloadAction<string>) => {
      const ingredient = state.ingredients.find((i) => i._id === payload);
      if (ingredient) {
        state.currentIngredient = ingredient;
      }
    }
  },
  selectors: {
    getIngredientsSelector: (state) => state.ingredients,
    getIsIngredientLoading: (state) => state.isIngredientsLoading,
    getCurrentIngredient: (state) => state.currentIngredient
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(
        getIngredients.fulfilled,
        (state, { payload }: PayloadAction<TIngredient[]>) => {
          state.ingredients = payload;
          state.isIngredientsLoading = false;
        }
      )
      .addCase(getIngredients.rejected, (state) => {
        state.isIngredientsLoading = false;
      });
  }
});

export const getIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => await getIngredientsApi()
);

export const reducer = ingredientSlice.reducer;
export const { setCurrentIngredient } = ingredientSlice.actions;
export const {
  getIngredientsSelector,
  getIsIngredientLoading,
  getCurrentIngredient
} = ingredientSlice.selectors;
