import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { GET_FEEDS_INFO, GET_ORDER_BY_NUMBER } from './typePrefixes';

export const getOrderByNumber = createAsyncThunk(
  GET_ORDER_BY_NUMBER,
  async (number: number) => await getOrderByNumberApi(number)
);

export const getFeeds = createAsyncThunk(
  GET_FEEDS_INFO,
  async () => await getFeedsApi()
);
