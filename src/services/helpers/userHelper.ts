import { TError, TUser } from '@utils-types';
import { TUserState } from '@slices/types/types';

export enum UserAction {
  login = 'loginUser',
  register = 'registerUser',
  logout = 'logoutUser',
  update = 'updateUser'
}

export const handlePending = (state: TUserState, actionType: UserAction) => {
  state[`${actionType}Request`] = true;
  state[`${actionType}Error`] = null;
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

export const handleSuccessLogin = (state: TUserState, payload: TUser) => {
  state.user = payload;
  state.isAuthenticated = true;
  state.isAuthChecked = true;
};
