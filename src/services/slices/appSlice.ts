import { createSlice } from '@reduxjs/toolkit';
import { initializeApp } from '@thunks/app';
import { TAppState } from './types/types';

export const initialState: TAppState = {
  initialized: false
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  selectors: {
    getInitialized: (state) => state.initialized
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeApp.pending, (state) => {
        state.initialized = false;
      })
      .addCase(initializeApp.rejected, (state) => {
        state.initialized = false;
      })
      .addCase(initializeApp.fulfilled, (state) => {
        state.initialized = true;
      });
  }
});

export const reducer = appSlice.reducer;
export const { getInitialized } = appSlice.selectors;
