import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export type TInitialState = {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  getIngredientsError: string | null;
  previewIngredientId: string | null;
};

export const initialState: TInitialState = {
  ingredients: [],
  isIngredientsLoading: false,
  getIngredientsError: null,
  previewIngredientId: null
};

const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setPreviewIngredientId: (
      state,
      { payload }: PayloadAction<string | null>
    ) => {
      state.previewIngredientId = payload;
    }
  },
  selectors: {
    getIngredientsSelector: (state) => state.ingredients,
    getIsIngredientLoading: (state) => state.isIngredientsLoading,
    getPreviewIngredientId: (state) => state.previewIngredientId
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
        state.getIngredientsError = null;
      })
      .addCase(
        getIngredients.fulfilled,
        (state, { payload }: PayloadAction<TIngredient[]>) => {
          state.ingredients = payload;
          state.isIngredientsLoading = false;
          state.getIngredientsError = null;
        }
      )
      .addCase(getIngredients.rejected, (state, { error }) => {
        state.isIngredientsLoading = false;
        state.getIngredientsError = error.message || null;
      });
  }
});

export const getIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => await getIngredientsApi()
);

export const reducer = ingredientSlice.reducer;
export const { setPreviewIngredientId } = ingredientSlice.actions;
export const {
  getIngredientsSelector,
  getIsIngredientLoading,
  getPreviewIngredientId
} = ingredientSlice.selectors;
