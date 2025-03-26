import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TInitialState = {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  previewIngredientId: string | null;
};

export const initialState: TInitialState = {
  ingredients: [],
  isIngredientsLoading: false,
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
export const { setPreviewIngredientId } = ingredientSlice.actions;
export const {
  getIngredientsSelector,
  getIsIngredientLoading,
  getPreviewIngredientId
} = ingredientSlice.selectors;
