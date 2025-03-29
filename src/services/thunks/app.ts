import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredients } from './ingredients';
import { checkUserAuth } from './user';

export const initializeApp = createAsyncThunk(
  'app/initialize',
  async (_, { dispatch }) => {
    const getIngredientsPromise = dispatch(getIngredients());
    const checkAuthPromise = dispatch(checkUserAuth());
    await Promise.all([getIngredientsPromise, checkAuthPromise]);
  }
);
