import { getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { GET_PROFILE_ORDERS } from './typePrefixes';

export const getUserOrders = createAsyncThunk(
  GET_PROFILE_ORDERS,
  async () => await getOrdersApi()
);
