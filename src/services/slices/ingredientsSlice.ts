import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { TIngredientsState } from './types/types';
import { getIngredients } from '@thunks/ingredients';

export const initialState: TIngredientsState = {
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

export const reducer = ingredientSlice.reducer;
export const { setPreviewIngredientId } = ingredientSlice.actions;
export const {
  getIngredientsSelector,
  getIsIngredientLoading,
  getPreviewIngredientId
} = ingredientSlice.selectors;
