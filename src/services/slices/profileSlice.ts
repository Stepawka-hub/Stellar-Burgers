import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { TProfileState } from './types/types';
import { getUserOrders } from '@thunks/profile';

export const initialState: TProfileState = {
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

export const reducer = profileSlice.reducer;
export const { getUserOrdersSelector, getIsFetchingOrders } =
  profileSlice.selectors;
