import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredients } from './ingredientsSlice';
import { checkUserAuth } from './userSlice';

type TInitialState = {
  initialized: boolean;
};

export const initialState: TInitialState = {
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

export const initializeApp = createAsyncThunk(
  'app/initialize',
  async (_, { dispatch }) => {
    const getIngredientsPromise = dispatch(getIngredients());
    const checkAuthPromise = dispatch(checkUserAuth());
    return await Promise.all([getIngredientsPromise, checkAuthPromise]);
  }
);

export const reducer = appSlice.reducer;
export const { getInitialized } = appSlice.selectors;
