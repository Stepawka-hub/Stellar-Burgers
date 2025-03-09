import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TAuthResponse,
  TLoginData,
  TRegisterData
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie } from '../../utils/cookie';
import {
  handleFulfilled,
  handlePending,
  handleRejected,
  UserAction
} from '../helpers/userHelper';

export type TInitialState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  user: TUser | null;
  loginUserRequest: boolean;
  registerUserRequest: boolean;
  logoutUserRequest: boolean;
  loginUserError: string;
  registerUserError: string;
};

const initialState: TInitialState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  loginUserRequest: false,
  registerUserRequest: false,
  logoutUserRequest: false,
  loginUserError: '',
  registerUserError: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
    setLoginUserError: (state, { payload }: PayloadAction<string>) => {
      state.loginUserError = payload;
    },
    setRegisterUserError: (state, { payload }: PayloadAction<string>) => {
      state.registerUserError = payload;
    },
    userLogout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    }
  },
  selectors: {
    getAuthChecked: (state) => state.isAuthChecked,
    getIsAuthenticated: (state) => state.isAuthenticated,
    getUserSelector: (state) => state.user,
    getLoginUserRequest: (state) => state.loginUserRequest,
    getLoginUserError: (state) => state.loginUserError,
    getRegisterUserRequest: (state) => state.registerUserRequest,
    getRegisterUserError: (state) => state.registerUserError,
    getLogoutUserRequest: (state) => state.logoutUserRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.rejected, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(
        getUser.fulfilled,
        (state, { payload }: PayloadAction<TUser>) => {
          state.user = payload;
          state.isAuthenticated = true;
          state.isAuthChecked = true;
        }
      )

      .addCase(loginUser.pending, (state) =>
        handlePending(state, UserAction.login)
      )
      .addCase(loginUser.rejected, (state, { error }) =>
        handleRejected(state, UserAction.login, error.message)
      )
      .addCase(
        loginUser.fulfilled,
        (state, { payload }: PayloadAction<TAuthResponse>) =>
          handleFulfilled(state, UserAction.login, payload)
      )

      .addCase(registerUser.pending, (state) =>
        handlePending(state, UserAction.register)
      )
      .addCase(registerUser.rejected, (state, { error }) => {
        handleRejected(state, UserAction.register, error.message);
      })
      .addCase(
        registerUser.fulfilled,
        (state, { payload }: PayloadAction<TAuthResponse>) => {
          handleFulfilled(state, UserAction.register, payload);
        }
      )

      .addCase(logoutUser.pending, (state) => {
        state.logoutUserRequest = true;
      })
      .addCase(logoutUser.rejected, (state, { error }) => {
        state.logoutUserRequest = false;
        console.error(error);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.logoutUserRequest = false;
      });
  }
});

export const getUser = createAsyncThunk<TUser, void>(
  'user/getUser',
  async () => (await getUserApi()).user
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
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
  'user/register',
  async (data: TRegisterData) => await registerUserApi(data)
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => await loginUserApi(data)
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { dispatch }) =>
    logoutApi().then(() => {
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
      dispatch(userLogout());
    })
);

export const reducer = userSlice.reducer;
export const {
  setAuthChecked,
  setLoginUserError,
  setRegisterUserError,
  userLogout
} = userSlice.actions;
export const {
  getAuthChecked,
  getUserSelector,
  getLoginUserError,
  getLoginUserRequest,
  getRegisterUserError,
  getRegisterUserRequest,
  getLogoutUserRequest,
  getIsAuthenticated
} = userSlice.selectors;
