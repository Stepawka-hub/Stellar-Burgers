import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredients } from './ingredientsSlice';
import { getFeeds } from './feedSlice';
import { checkUserAuth } from './userSlice';

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
    const getIngredientsPromise = dispatch(getIngredients());
    const getFeedsPromise = dispatch(getFeeds());
    const checkAuthPromise = dispatch(checkUserAuth());
    return await Promise.all([
      getIngredientsPromise,
      getFeedsPromise,
      checkAuthPromise
    ]);
  }
);

export const reducer = appSlice.reducer;
export const { getInitialized } = appSlice.selectors;
