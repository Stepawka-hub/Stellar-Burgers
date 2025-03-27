import { TAuthResponse } from '@api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TError, TUser } from '@utils-types';
import {
  handleFulfilled,
  handlePending,
  handleRejected,
  handleSuccessLogin,
  UserAction
} from '../helpers/userHelper';
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from '@thunks/user';
import { TUserState } from './types/types';

export const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,

  loginUserRequest: false,
  registerUserRequest: false,
  logoutUserRequest: false,
  updateUserRequest: false,

  loginUserError: null,
  registerUserError: null,
  logoutUserError: null,
  updateUserError: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setLoginUserError: (state, { payload }: PayloadAction<TError>) => {
      state.loginUserError = payload;
    },
    setRegisterUserError: (state, { payload }: PayloadAction<TError>) => {
      state.registerUserError = payload;
    },
    setUpdateUserError: (state, { payload }: PayloadAction<TError>) => {
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
