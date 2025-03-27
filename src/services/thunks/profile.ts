import { getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

const thunkName = 'profile/getUserOrders';

export const getUserOrders = createAsyncThunk(
  thunkName,
  async () => await getOrdersApi()
);
