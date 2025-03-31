import { getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const GET_PROFILE_ORDERS = 'profile/getProfileOrders';

export const getUserOrders = createAsyncThunk(
  GET_PROFILE_ORDERS,
  async () => await getOrdersApi()
);
