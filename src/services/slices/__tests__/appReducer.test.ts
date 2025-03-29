import { configureStore } from '@reduxjs/toolkit';
import { TAppState } from '@slices/types/types';
import { reducer } from '@slices/appSlice';
import { initializeApp } from '@thunks/app';

describe('Работа редьюсера app', () => {
  const initialState: TAppState = {
    initialized: false
  };

  describe('Тесты асинхронных экшенов', () => {
    const testRequestId = 'test-app-request-id';

    it('Инициализация проекта - Начало запроса', () => {
      const store = configureStore({
        reducer,
        preloadedState: initialState
      });

      store.dispatch(initializeApp.pending(testRequestId));

      const { initialized } = store.getState();
      expect(initialized).toBe(false);
    });

    it('Получение ленты заказов - Успешное выполнение запроса', () => {
      const store = configureStore({
        reducer,
        preloadedState: initialState
      });

      store.dispatch(initializeApp.fulfilled(undefined, testRequestId));

      const { initialized } = store.getState();
      expect(initialized).toBe(true);
    });

    it('Получение ленты заказов - Возникновение ошибки', () => {
      const store = configureStore({
        reducer,
        preloadedState: initialState
      });
      const mockError = new Error('Error when getting feeds');

      store.dispatch(initializeApp.rejected(mockError, testRequestId));

      const { initialized } = store.getState();
      expect(initialized).toBe(false);
    });
  });
});
