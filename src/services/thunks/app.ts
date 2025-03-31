import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredients } from './ingredients';
import { checkUserAuth } from './user';

export const INITIALIZE_APP = 'app/initialize';

export const initializeApp = createAsyncThunk(
  INITIALIZE_APP,
  async (_, { dispatch }) => {
    const getIngredientsPromise = dispatch(getIngredients());
    const checkAuthPromise = dispatch(checkUserAuth());
    await Promise.all([getIngredientsPromise, checkAuthPromise]);
  }
);
