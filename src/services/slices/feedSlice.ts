import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrder, TOrdersData } from '@utils-types';

type TInitialState = {
  feed: TOrdersData;
  isFetchingFeeds: boolean;
};

const initialState: TInitialState = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isFetchingFeeds: true
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedSelector: (state) => state.feed,
    getOrdersSelector: (state) => state.feed.orders,
    getIsFetchingFeedsSelector: (state) => state.isFetchingFeeds
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
      });
  }
});

export const getFeeds = createAsyncThunk('feed/getAll', async () =>
  getFeedsApi()
);

export const reducer = feedSlice.reducer;
export const {
  getFeedSelector,
  getOrdersSelector,
  getIsFetchingFeedsSelector
} = feedSlice.selectors;
