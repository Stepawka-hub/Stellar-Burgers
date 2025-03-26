import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

export type TInitialState = {
  orders: TOrder[];
  isFetchingOrders: boolean;
};

export const initialState: TInitialState = {
  orders: [],
  isFetchingOrders: false
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  selectors: {
    getUserOrdersSelector: (state) => state.orders,
    getIsFetchingOrders: (state) => state.isFetchingOrders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.isFetchingOrders = true;
      })
      .addCase(
        getUserOrders.fulfilled,
        (state, { payload }: PayloadAction<TOrder[]>) => {
          state.isFetchingOrders = false;
          state.orders = payload;
        }
      )
      .addCase(getUserOrders.rejected, (state) => {
        state.isFetchingOrders = false;
      });
  }
});

export const getUserOrders = createAsyncThunk(
  'profile/getUserOrders',
  async () => await getOrdersApi()
);

export const reducer = profileSlice.reducer;
export const { getUserOrdersSelector, getIsFetchingOrders } =
  profileSlice.selectors;
