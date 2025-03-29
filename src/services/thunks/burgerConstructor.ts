import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ORDER_BURGER } from './typePrefixes';

export const orderBurger = createAsyncThunk(
  ORDER_BURGER,
  async (ingredients: string[]) => orderBurgerApi(ingredients)
);
