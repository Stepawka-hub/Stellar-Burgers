import { getIngredientsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { GET_ALL_INGREDIENTS } from './typePrefixes';

export const getIngredients = createAsyncThunk(
  GET_ALL_INGREDIENTS,
  async () => await getIngredientsApi()
);
