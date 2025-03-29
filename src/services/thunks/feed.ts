import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const GET_ORDER_BY_NUMBER = 'feed/getOrderByNumber';
export const GET_FEEDS_INFO = 'feed/getFeedsInfo';

export const getOrderByNumber = createAsyncThunk(
  GET_ORDER_BY_NUMBER,
  async (number: number) => {
    const { orders } = await getOrderByNumberApi(number);
    return orders[0];
  }
);

export const getFeeds = createAsyncThunk(
  GET_FEEDS_INFO,
  async () => await getFeedsApi()
);
