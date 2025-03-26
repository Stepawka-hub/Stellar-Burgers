import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TAuthResponse,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie } from '../../utils/cookie';
import {
  handleFulfilled,
  handlePending,
  handleRejected,
  handleSuccessLogin,
  UserAction
} from '../helpers/userHelper';

export type TInitialState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  user: TUser | null;

  loginUserRequest: boolean;
  registerUserRequest: boolean;
  logoutUserRequest: boolean;
  updateUserRequest: boolean;

  loginUserError: string;
  registerUserError: string;
  logoutUserError: string;
  updateUserError: string;
};

export const initialState: TInitialState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,

  loginUserRequest: false,
  registerUserRequest: false,
  logoutUserRequest: false,
  updateUserRequest: false,

  loginUserError: '',
  registerUserError: '',
  logoutUserError: '',
  updateUserError: ''
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
    },
    setUpdateUserError: (state, { payload }: PayloadAction<string>) => {
      state.updateUserError = payload;
    }
  },
  selectors: {
    getAuthChecked: (state) => state.isAuthChecked,
    getIsAuthenticated: (state) => state.isAuthenticated,
    getUserSelector: (state) => state.user,

    getLoginUserRequest: (state) => state.loginUserRequest,
    getRegisterUserRequest: (state) => state.registerUserRequest,
    getLogoutUserRequest: (state) => state.logoutUserRequest,
    getUpdateUserRequest: (state) => state.updateUserRequest,

    getLoginUserError: (state) => state.loginUserError,
    getRegisterUserError: (state) => state.registerUserError,
    getLogoutUserError: (state) => state.logoutUserError,
    getUpdateUserError: (state) => state.updateUserError
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.rejected, (state, { error }) => {
        state.isAuthChecked = true;
        console.error(error);
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
      .addCase(
        loginUser.fulfilled,
        (state, { payload }: PayloadAction<TAuthResponse>) => {
          handleFulfilled(state, UserAction.login);
          handleSuccessLogin(state, payload);
        }
      )
      .addCase(loginUser.rejected, (state, { error }) => {
        handleRejected(state, UserAction.login, error.message);
        state.isAuthChecked = true;
      })

      .addCase(registerUser.pending, (state) =>
        handlePending(state, UserAction.register)
      )
      .addCase(
        registerUser.fulfilled,
        (state, { payload }: PayloadAction<TAuthResponse>) => {
          handleFulfilled(state, UserAction.register);
          handleSuccessLogin(state, payload);
        }
      )
      .addCase(registerUser.rejected, (state, { error }) => {
        handleRejected(state, UserAction.register, error.message);
        state.isAuthChecked = true;
      })

      .addCase(logoutUser.pending, (state) => {
        handlePending(state, UserAction.logout);
      })
      .addCase(logoutUser.rejected, (state, { error }) => {
        handleRejected(state, UserAction.logout, error.message);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        handleFulfilled(state, UserAction.logout);
      })

      .addCase(updateUser.pending, (state) => {
        handlePending(state, UserAction.update);
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        handleFulfilled(state, UserAction.update);
        state.user = payload.user;
      })
      .addCase(updateUser.rejected, (state, { error }) => {
        handleRejected(state, UserAction.update, error.message);
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

export const updateUser = createAsyncThunk(
  'profile/updateUser',
  async (user: Partial<TRegisterData>) => await updateUserApi(user)
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
  userLogout,
  setUpdateUserError
} = userSlice.actions;
export const {
  getUserSelector,
  getAuthChecked,
  getIsAuthenticated,
  getLoginUserRequest,
  getRegisterUserRequest,
  getLogoutUserRequest,
  getUpdateUserRequest,
  getLoginUserError,
  getUpdateUserError,
  getRegisterUserError
} = userSlice.selectors;
