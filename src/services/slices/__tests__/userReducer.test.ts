import { TUserState } from '../types/types';
import {
  initialState as state,
  reducer,
  setLoginUserError,
  setRegisterUserError,
  setUpdateUserError
} from '../userSlice';
import {
  getFulfilledRequestId,
  getPendingRequestId,
  getRejectedRequestId
} from './helpers/helpers';
import {
  GET_USER,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
  USER_UPDATE
} from '@thunks/user';
import { TUserResponse } from '@api';

import mockUser from './__mocks__/user.json';
import { TUser } from '@utils-types';

describe('Работа редьюсера user', () => {
  describe('Тесты синхронных экшенов', () => {
    const initialState: TUserState = {
      ...state,
      isAuthChecked: true,
      isAuthenticated: true,
      user: mockUser.user
    };

    it('Изменение ошибки при логине', () => {
      const errorText = 'Login error';
      const newState = reducer(initialState, setLoginUserError(errorText));
      const { loginUserError } = newState;

      expect(loginUserError).toBe(errorText);
    });

    it('Изменение ошибки при регистрации', () => {
      const errorText = 'Register error';
      const newState = reducer(initialState, setRegisterUserError(errorText));
      const { registerUserError } = newState;

      expect(registerUserError).toBe(errorText);
    });

    it('Изменение ошибки при обновлении данных пользователя', () => {
      const errorText = 'User update error';
      const newState = reducer(initialState, setUpdateUserError(errorText));
      const { updateUserError } = newState;

      expect(updateUserError).toBe(errorText);
    });
  });

  describe('Тесты экшенов, генерируемых при выполнении асинхронных запросов', () => {
    const initialState: TUserState = { ...state };

    describe('Обновление данных пользователя', () => {
      it('Начало запроса', () => {
        const requestId = getPendingRequestId(USER_UPDATE);
        const newState = reducer(
          initialState,
          updateUser.pending(requestId, {})
        );

        const { updateUserRequest, updateUserError } = newState;
        expect(updateUserRequest).toBe(true);
        expect(updateUserError).toBe(null);
      });

      it('Успешное выполнение запроса', () => {
        const requestId = getFulfilledRequestId(USER_UPDATE);
        const mockUserResponse: TUser = mockUser.updateResponse;
        const newState = reducer(
          initialState,
          updateUser.fulfilled(mockUserResponse, requestId, {})
        );

        const { user, updateUserError, updateUserRequest } = newState;

        expect(updateUserRequest).toBe(false);
        expect(updateUserError).toBe(null);
        expect(user).toEqual(mockUserResponse);
      });

      it('Возникновение ошибки', () => {
        const requestId = getRejectedRequestId(USER_UPDATE);
        const mockError = new Error('Error when updating user');
        const newState = reducer(
          initialState,
          updateUser.rejected(mockError, requestId, {})
        );

        const { user, updateUserError, updateUserRequest } = newState;
        expect(updateUserRequest).toBe(false);
        expect(updateUserError).toBe(mockError.message);
        expect(user).toBe(null);
      });
    });

    describe('Регистрация пользователя', () => {
      it('Начало запроса', () => {
        const requestId = getPendingRequestId(USER_REGISTER);
        const newState = reducer(
          initialState,
          registerUser.pending(requestId, mockUser.registerData)
        );

        const { user, registerUserRequest, registerUserError } = newState;
        expect(registerUserRequest).toBe(true);
        expect(registerUserError).toBe(null);
        expect(user).toBe(null);
      });

      it('Успешное выполнение запроса', () => {
        const requestId = getFulfilledRequestId(USER_REGISTER);
        const registerUserResponse: TUser = mockUser.registerResponse;
        const newState = reducer(
          initialState,
          registerUser.fulfilled(
            registerUserResponse,
            requestId,
            mockUser.registerData
          )
        );

        const { user, registerUserError, registerUserRequest } = newState;

        expect(registerUserRequest).toBe(false);
        expect(registerUserError).toBe(null);
        expect(user).toEqual(registerUserResponse);
      });

      it('Возникновение ошибки', () => {
        const requestId = getRejectedRequestId(USER_REGISTER);
        const mockError = new Error('Error when register user');
        const newState = reducer(
          initialState,
          registerUser.rejected(mockError, requestId, mockUser.registerData)
        );

        const { user, registerUserError, registerUserRequest } = newState;
        expect(registerUserRequest).toBe(false);
        expect(registerUserError).toBe(mockError.message);
        expect(user).toBe(null);
      });
    });

    describe('Логин пользователя', () => {
      it('Начало запроса', () => {
        const requestId = getPendingRequestId(USER_LOGIN);
        const newState = reducer(
          initialState,
          loginUser.pending(requestId, mockUser.loginData)
        );

        const { user, loginUserRequest, loginUserError } = newState;
        expect(loginUserRequest).toBe(true);
        expect(loginUserError).toBe(null);
        expect(user).toBe(null);
      });

      it('Успешное выполнение запроса', () => {
        const requestId = getFulfilledRequestId(USER_LOGIN);
        const loginUserResponse: TUser = mockUser.loginResponse;
        const newState = reducer(
          initialState,
          loginUser.fulfilled(loginUserResponse, requestId, mockUser.loginData)
        );

        const { user, loginUserError, loginUserRequest } = newState;

        expect(loginUserRequest).toBe(false);
        expect(loginUserError).toBe(null);
        expect(user).toEqual(loginUserResponse);
      });

      it('Возникновение ошибки', () => {
        const requestId = getRejectedRequestId(USER_LOGIN);
        const mockError = new Error('Error when login user');
        const newState = reducer(
          initialState,
          loginUser.rejected(mockError, requestId, mockUser.loginData)
        );

        const { user, loginUserError, loginUserRequest } = newState;
        expect(loginUserRequest).toBe(false);
        expect(loginUserError).toBe(mockError.message);
        expect(user).toBe(null);
      });
    });

    describe('Получение пользователя', () => {
      it('Начало запроса', () => {
        const requestId = getPendingRequestId(GET_USER);
        const newState = reducer(initialState, getUser.pending(requestId));

        const { user, isAuthenticated, isAuthChecked } = newState;

        expect(isAuthenticated).toBe(false);
        expect(isAuthChecked).toBe(false);
        expect(user).toBe(null);
      });

      it('Успешное выполнение запроса', () => {
        const requestId = getFulfilledRequestId(GET_USER);
        const getUserResponse: TUser = mockUser.user;
        const newState = reducer(
          initialState,
          getUser.fulfilled(getUserResponse, requestId)
        );

        const { user, isAuthenticated, isAuthChecked } = newState;

        expect(isAuthenticated).toBe(true);
        expect(isAuthChecked).toBe(true);
        expect(user).toEqual(getUserResponse);
      });

      it('Возникновение ошибки', () => {
        const requestId = getRejectedRequestId(GET_USER);
        const mockError = new Error('Error when get user');
        const newState = reducer(
          initialState,
          getUser.rejected(mockError, requestId)
        );

        const { user, isAuthenticated, isAuthChecked } = newState;

        expect(isAuthenticated).toBe(false);
        expect(isAuthChecked).toBe(true);
        expect(user).toEqual(null);
      });
    });

    describe('Логаут пользователя', () => {
      const initialState: TUserState = {
        ...state,
        isAuthChecked: true,
        isAuthenticated: true,
        user: mockUser.user
      };

      it('Начало запроса', () => {
        const requestId = getPendingRequestId(USER_LOGOUT);
        const newState = reducer(initialState, logoutUser.pending(requestId));

        const { user, logoutUserRequest, logoutUserError } = newState;
        expect(logoutUserRequest).toBe(true);
        expect(logoutUserError).toBe(null);
        expect(user).toEqual(initialState.user);
      });

      it('Успешное выполнение запроса', () => {
        const requestId = getFulfilledRequestId(USER_LOGOUT);
        const newState = reducer(
          initialState,
          logoutUser.fulfilled(undefined, requestId)
        );

        const { user, logoutUserError, logoutUserRequest } = newState;

        expect(logoutUserRequest).toBe(false);
        expect(logoutUserError).toBe(null);
        expect(user).toBe(null);
      });

      it('Возникновение ошибки', () => {
        const requestId = getRejectedRequestId(USER_LOGOUT);
        const mockError = new Error('Error when logout user');
        const newState = reducer(
          initialState,
          logoutUser.rejected(mockError, requestId)
        );

        const { user, logoutUserError, logoutUserRequest } = newState;
        expect(logoutUserRequest).toBe(false);
        expect(logoutUserError).toBe(mockError.message);
        expect(user).toEqual(initialState.user);
      });
    });
  });
});
