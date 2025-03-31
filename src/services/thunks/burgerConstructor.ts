import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const ORDER_BURGER = 'constructor/orderBurger';

export const orderBurger = createAsyncThunk(
  ORDER_BURGER,
  async (ingredients: string[]) => {
    const { order } = await orderBurgerApi(ingredients);
    return order;
  }
);
