import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const orderBurger = createAsyncThunk(
  'constructor/orderBurger',
  async (ingredients: string[]) => orderBurgerApi(ingredients)
);
