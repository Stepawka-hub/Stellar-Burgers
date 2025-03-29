import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie } from '../../utils/cookie';
import { setAuthChecked, userLogout } from '@slices/userSlice';
import {
  CHECK_USER_AUTH,
  GET_USER,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
  USER_UPDATE
} from './typePrefixes';

export const getUser = createAsyncThunk<TUser, void>(
  GET_USER,
  async () => (await getUserApi()).user
);

export const checkUserAuth = createAsyncThunk(
  CHECK_USER_AUTH,
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        dispatch(setAuthChecked());
      });
    } else {
      dispatch(setAuthChecked());
    }
  }
);

export const registerUser = createAsyncThunk(
  USER_REGISTER,
  async (data: TRegisterData) => await registerUserApi(data)
);

export const loginUser = createAsyncThunk(
  USER_LOGIN,
  async (data: TLoginData) => await loginUserApi(data)
);

export const updateUser = createAsyncThunk(
  USER_UPDATE,
  async (user: Partial<TRegisterData>) => await updateUserApi(user)
);

export const logoutUser = createAsyncThunk(
  USER_LOGOUT,
  async (_, { dispatch }) =>
    logoutApi().then(() => {
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
      dispatch(userLogout());
    })
);
