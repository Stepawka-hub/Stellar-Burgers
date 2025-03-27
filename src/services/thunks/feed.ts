import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrderByNumber = createAsyncThunk(
  'feed/getOrderByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

export const getFeeds = createAsyncThunk(
  'feed/getFeedsInfo',
  async () => await getFeedsApi()
);
