import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as appReducer } from './slices/app/app';
import { reducer as ingredientReducer } from './slices/ingredients/ingredients';
import { reducer as burgerConstructorReducer } from './slices/burget-constructor/burger-constructor';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  app: appReducer,
  ingredients: ingredientReducer,
  burgerConstructor: burgerConstructorReducer
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
