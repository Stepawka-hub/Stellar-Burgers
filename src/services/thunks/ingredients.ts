import { getIngredientsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const GET_ALL_INGREDIENTS = 'ingredients/getAll';

export const getIngredients = createAsyncThunk(
  GET_ALL_INGREDIENTS,
  async () => await getIngredientsApi()
);
