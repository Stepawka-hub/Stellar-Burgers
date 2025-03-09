import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi, TOrderResponse } from '@api';
import { TOrder, TOrdersData } from '@utils-types';

type TInitialState = {
  feed: TOrdersData;
  previewOrder: TOrder | null;
  isFetchingFeeds: boolean;
};

const initialState: TInitialState = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  previewOrder: null,
  isFetchingFeeds: true
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setPreviewOrder: (state, { payload }: PayloadAction<TOrder | null>) => {
      state.previewOrder = payload;
    }
  },
  selectors: {
    getFeedSelector: (state) => state.feed,
    getOrdersSelector: (state) => state.feed.orders,
    getPreviewOrder: (state) => state.previewOrder,
    getIsFetchingFeeds: (state) => state.isFetchingFeeds
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isFetchingFeeds = true;
      })
      .addCase(
        getFeeds.fulfilled,
        (state, { payload }: PayloadAction<TOrdersData>) => {
          state.feed = payload;
          state.isFetchingFeeds = false;
        }
      )
      .addCase(getFeeds.rejected, (state) => {
        state.isFetchingFeeds = false;
      })
      .addCase(
        getOrderByNumber.fulfilled,
        (state, { payload }: PayloadAction<TOrderResponse>) => {
          state.previewOrder = payload.orders[0];
        }
      );
  }
});

export const getOrderByNumber = createAsyncThunk(
  'feed/getOrderByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

export const getFeeds = createAsyncThunk(
  'feed/getFeedsInfo',
  async () => await getFeedsApi()
);

export const reducer = feedSlice.reducer;
export const { setPreviewOrder } = feedSlice.actions;
export const {
  getFeedSelector,
  getOrdersSelector,
  getPreviewOrder,
  getIsFetchingFeeds
} = feedSlice.selectors;
