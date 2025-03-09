import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

type TInitialState = {
  orders: TOrder[];
  isOrdersFetching: boolean;
};

const initialState: TInitialState = {
  orders: [],
  isOrdersFetching: false
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  selectors: {
    getUserOrdersSelector: (state) => state.orders,
    getIsOrdersFetching: (state) => state.isOrdersFetching
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.isOrdersFetching = true;
      })
      .addCase(
        getUserOrders.fulfilled,
        (state, { payload }: PayloadAction<TOrder[]>) => {
          state.isOrdersFetching = false;
          state.orders = payload;
        }
      )
      .addCase(getUserOrders.rejected, (state) => {
        state.isOrdersFetching = false;
      });
  }
});

export const getUserOrders = createAsyncThunk(
  'profile/getUserOrders',
  async () => await getOrdersApi()
);

export const reducer = profileSlice.reducer;
export const { getUserOrdersSelector, getIsOrdersFetching } =
  profileSlice.selectors;
