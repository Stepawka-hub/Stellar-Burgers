import { TAppState } from '@slices/types/types';
import { reducer } from '@slices/appSlice';
import { initializeApp } from '@thunks/app';
import {
  getFulfilledRequestId,
  getPendingRequestId,
  getRejectedRequestId
} from './helpers/helpers';
import { INITIALIZE_APP } from '@thunks/app';

describe('Работа редьюсера app', () => {
  const initialState: TAppState = {
    initialized: false
  };

  describe('Тесты экшенов, генерируемых при выполнении асинхронных запросов', () => {
    describe('Инициализация проекта', () => {
      it('Начало запроса', () => {
        const requestId = getPendingRequestId(INITIALIZE_APP);
        const newState = reducer(
          initialState,
          initializeApp.pending(requestId)
        );

        const { initialized } = newState;
        expect(initialized).toBe(false);
      });

      it('Успешное выполнение запроса', () => {
        const requestId = getFulfilledRequestId(INITIALIZE_APP);
        const newState = reducer(
          initialState,
          initializeApp.fulfilled(undefined, requestId)
        );

        const { initialized } = newState;
        expect(initialized).toBe(true);
      });

      it('Возникновение ошибки', () => {
        const requestId = getRejectedRequestId(INITIALIZE_APP);
        const mockError = new Error('Error when initialize app');
        const newState = reducer(
          initialState,
          initializeApp.rejected(mockError, requestId)
        );

        const { initialized } = newState;
        expect(initialized).toBe(false);
      });
    });
  });
});
