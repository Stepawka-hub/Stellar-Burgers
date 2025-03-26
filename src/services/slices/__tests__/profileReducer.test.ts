import { configureStore } from '@reduxjs/toolkit';
import { getUserOrders, reducer } from '../profileSlice';
import { TInitialState } from '../profileSlice';
import { TOrder } from '@utils-types';

describe('Работа редьюсера profile', () => {
  const initialState: TInitialState = {
    orders: [],
    isFetchingOrders: false
  };

  describe('Тесты асинхронных экшенов', () => {
    const testRequestId = 'test-profile-orders-request-id';

    it('Получение ленты заказов - Начало запроса', () => {
      const store = configureStore({
        reducer,
        preloadedState: initialState
      });

      store.dispatch(getUserOrders.pending(testRequestId));

      const { isFetchingOrders } = store.getState();
      expect(isFetchingOrders).toBe(true);
    });

    it('Получение ленты заказов - Успешное выполнение запроса', () => {
      const store = configureStore({
        reducer,
        preloadedState: initialState
      });

      const mockOrdersResponse: TOrder[] = [
        {
          ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941'],
          _id: '67e063956fce7d001db5bd6c',
          status: 'done',
          name: 'Краторный био-марсианский бургер',
          createdAt: '2025-03-23T19:40:05.812Z',
          updatedAt: '2025-03-23T19:40:06.493Z',
          number: 71974
        },
        {
          ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941'],
          _id: '67e063956fce7d001db5bd6c',
          status: 'done',
          name: 'Краторный био-марсианский бургер',
          createdAt: '2025-03-23T19:40:05.812Z',
          updatedAt: '2025-03-23T19:40:06.493Z',
          number: 71974
        }
      ];

      store.dispatch(
        getUserOrders.fulfilled(mockOrdersResponse, testRequestId)
      );

      const { orders, isFetchingOrders } = store.getState();

      expect(isFetchingOrders).toBe(false);
      expect(orders).toEqual(mockOrdersResponse);
    });

    it('Получение ленты заказов - Возникновение ошибки', () => {
      const store = configureStore({
        reducer,
        preloadedState: initialState
      });
      const mockError = new Error('Error when getting profile orders');

      store.dispatch(getUserOrders.rejected(mockError, testRequestId));

      const { isFetchingOrders } = store.getState();
      expect(isFetchingOrders).toBe(false);
    });
  });
});
