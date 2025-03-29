import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { getFeeds, getOrderByNumber } from '@thunks/feed';
import { TFeedsState } from './types/types';

export const initialState: TFeedsState = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  previewOrder: null,
  isFetchingFeeds: false
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
        (state, { payload }: PayloadAction<TOrder>) => {
          state.previewOrder = payload;
        }
      );
  }
});

export const reducer = feedSlice.reducer;
export const { setPreviewOrder } = feedSlice.actions;
export const {
  getFeedSelector,
  getOrdersSelector,
  getPreviewOrder,
  getIsFetchingFeeds
} = feedSlice.selectors;
