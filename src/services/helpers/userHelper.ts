import { TAuthResponse } from '@api';
import { TInitialState } from '../slices/userSlice';
import { setCookie } from '../../utils/cookie';

export enum UserAction {
  login = 'loginUser',
  register = 'registerUser'
}

export const handlePending = (state: TInitialState, actionType: UserAction) => {
  state[`${actionType}Request`] = true;
  state[`${actionType}Error`] = '';
};

export const handleRejected = (
  state: TInitialState,
  actionType: UserAction,
  errorMessage: string
) => {
  state[`${actionType}Request`] = false;
  state.isAuthChecked = true;
  state[`${actionType}Error`] = errorMessage;
};

export const handleFulfilled = (
  state: TInitialState,
  actionType: UserAction,
  payload: TAuthResponse
) => {
  state[`${actionType}Request`] = false;
  handleSuccessLogin(state, payload);
};

export const handleSuccessLogin = (
  state: TInitialState,
  payload: TAuthResponse
) => {
  state.user = payload.user;
  state.isAuthenticated = true;
  state.isAuthChecked = true;
  localStorage.setItem('refreshToken', payload.refreshToken);
  setCookie('accessToken', payload.accessToken);
};
