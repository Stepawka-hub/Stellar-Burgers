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
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import { setAuthChecked } from '@slices/userSlice';

export const GET_USER = 'user/getUser';
export const CHECK_USER_AUTH = 'user/checkUserAuth';
export const USER_REGISTER = 'user/register';
export const USER_LOGIN = 'user/login';
export const USER_UPDATE = 'user/update';
export const USER_LOGOUT = 'user/logout';

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
  async (data: TRegisterData) => {
    const { user, refreshToken, accessToken } = await registerUserApi(data);
    localStorage.setItem('refreshToken', refreshToken);
    setCookie('accessToken', accessToken);
    return user;
  }
);

export const loginUser = createAsyncThunk(
  USER_LOGIN,
  async (data: TLoginData) => {
    const { user, refreshToken, accessToken } = await loginUserApi(data);
    localStorage.setItem('refreshToken', refreshToken);
    setCookie('accessToken', accessToken);
    return user;
  }
);

export const updateUser = createAsyncThunk(
  USER_UPDATE,
  async (userData: Partial<TRegisterData>) => {
    const { user } = await updateUserApi(userData);
    return user;
  }
);

export const logoutUser = createAsyncThunk(
  USER_LOGOUT,
  async () =>
    await logoutApi().then(() => {
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
    })
);
