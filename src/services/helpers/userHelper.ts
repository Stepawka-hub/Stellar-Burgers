import { TAuthResponse } from '@api';
import { setCookie } from '../../utils/cookie';
import { TError } from '@utils-types';
import { TUserState } from '@slices/types/types';

export enum UserAction {
  login = 'loginUser',
  register = 'registerUser',
  logout = 'logoutUser',
  update = 'updateUser'
}

export const handlePending = (state: TUserState, actionType: UserAction) => {
  state[`${actionType}Request`] = true;
  state[`${actionType}Error`] = '';
};

export const handleRejected = (
  state: TUserState,
  actionType: UserAction,
  errorMessage: TError = null
) => {
  state[`${actionType}Request`] = false;
  state[`${actionType}Error`] = errorMessage;
};

export const handleFulfilled = (state: TUserState, actionType: UserAction) => {
  state[`${actionType}Request`] = false;
};

export const handleSuccessLogin = (
  state: TUserState,
  payload: TAuthResponse
) => {
  state.user = payload.user;
  state.isAuthenticated = true;
  state.isAuthChecked = true;
  localStorage.setItem('refreshToken', payload.refreshToken);
  setCookie('accessToken', payload.accessToken);
};
