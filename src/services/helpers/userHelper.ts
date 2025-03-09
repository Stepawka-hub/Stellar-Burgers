import { TAuthResponse } from '@api';
import { TInitialState } from '../slices/userSlice';
import { setCookie } from '../../utils/cookie';

export enum UserAction {
  login = 'loginUser',
  register = 'registerUser',
  logout = 'logoutUser',
  update = 'updateUser'
}

export const handlePending = (state: TInitialState, actionType: UserAction) => {
  state[`${actionType}Request`] = true;
  state[`${actionType}Error`] = '';
};

export const handleRejected = (
  state: TInitialState,
  actionType: UserAction,
  errorMessage: string = ''
) => {
  state[`${actionType}Request`] = false;
  state[`${actionType}Error`] = errorMessage;
};

export const handleFulfilled = (
  state: TInitialState,
  actionType: UserAction
) => {
  state[`${actionType}Request`] = false;
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
