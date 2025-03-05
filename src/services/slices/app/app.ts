import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredients } from '../ingredients/ingredients';

type TInitialState = {
  initialized: boolean;
};

const initialState: TInitialState = {
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
      .addCase(getIngredients.pending, (state) => {
        state.initialized = false;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.initialized = false;
      })
      .addCase(getIngredients.fulfilled, (state) => {
        state.initialized = true;
      });
  }
});

export const initializeApp = createAsyncThunk(
  'app/initialize',
  async (_, { dispatch }) => {
    const promise = dispatch(getIngredients());
    return await Promise.all([promise]);
  }
);

export const reducer = appSlice.reducer;
export const { getInitialized } = appSlice.selectors;
