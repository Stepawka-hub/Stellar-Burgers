import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as appReducer } from '@slices/appSlice';
import { reducer as ingredientReducer } from '@slices/ingredientsSlice';
import { reducer as burgerConstructorReducer } from '@slices/burgerConstructorSlice';
import { reducer as feedReducer } from '@slices/feedSlice';
import { reducer as userReducer } from '@slices/userSlice';
import { reducer as profileReducer } from '@slices/profileSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  app: appReducer,
  ingredients: ingredientReducer,
  burgerConstructor: burgerConstructorReducer,
  feed: feedReducer,
  user: userReducer,
  profile: profileReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
