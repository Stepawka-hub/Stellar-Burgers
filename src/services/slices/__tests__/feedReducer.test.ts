import { configureStore } from '@reduxjs/toolkit';
import { getFeeds, reducer, setPreviewOrder } from '../feedSlice';
import { TFeedsResponse, TOrderResponse } from '@api';
import { TOrder } from '@utils-types';

describe('Работа редьюсера feed', () => {
  const initialState = {
    feed: {
      orders: [],
      total: 0,
      totalToday: 0
    },
    previewOrder: null,
    isFetchingFeeds: true
  };

  describe('Тесты синхронных экшенов', () => {
    it('Смена превью заказа', () => {
      const mockPreviewOrder: TOrder = {
        ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941'],
        _id: '67e063956fce7d001db5bd6c',
        status: 'done',
        name: 'Краторный био-марсианский бургер',
        createdAt: '2025-03-23T19:40:05.812Z',
        updatedAt: '2025-03-23T19:40:06.493Z',
        number: 71974
      };
      const newState = reducer(initialState, setPreviewOrder(mockPreviewOrder));

      const { previewOrder } = newState;

      expect(previewOrder).toEqual(mockPreviewOrder);
    });
  });

  describe('Тесты асинхронных экшенов', () => {
    const testRequestId = 'test-feed-request-id';

    it('Получение ленты заказов - Начало запроса', () => {
      const store = configureStore({
        reducer,
        preloadedState: initialState
      });

      store.dispatch(getFeeds.pending(testRequestId));

      const { isFetchingFeeds } = store.getState();
      expect(isFetchingFeeds).toBe(true);
    });

    it('Получение ленты заказов - Успешное выполнение запроса', () => {
      const store = configureStore({
        reducer,
        preloadedState: initialState
      });

      const mockOrdersResponse: TFeedsResponse = {
        success: true,
        orders: [
          {
            ingredients: [
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa0941'
            ],
            _id: '67e063956fce7d001db5bd6c',
            status: 'done',
            name: 'Краторный био-марсианский бургер',
            createdAt: '2025-03-23T19:40:05.812Z',
            updatedAt: '2025-03-23T19:40:06.493Z',
            number: 71974
          },
          {
            ingredients: [
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa0941'
            ],
            _id: '67e063956fce7d001db5bd6c',
            status: 'done',
            name: 'Краторный био-марсианский бургер',
            createdAt: '2025-03-23T19:40:05.812Z',
            updatedAt: '2025-03-23T19:40:06.493Z',
            number: 71974
          }
        ],
        total: 2,
        totalToday: 2
      };

      store.dispatch(getFeeds.fulfilled(mockOrdersResponse, testRequestId));

      const { feed, isFetchingFeeds } = store.getState();
      const { orders, total, totalToday } = feed;

      expect(isFetchingFeeds).toBe(false);
      expect(orders).toEqual(mockOrdersResponse.orders);
      expect(total).toBe(mockOrdersResponse.total);
      expect(totalToday).toBe(mockOrdersResponse.totalToday);
    });

    it('Получение ленты заказов - Возникновение ошибки', () => {
      const store = configureStore({
        reducer,
        preloadedState: initialState
      });
      const mockError = new Error('Error when getting feeds');

      store.dispatch(getFeeds.rejected(mockError, testRequestId));

      const { isFetchingFeeds } = store.getState();
      expect(isFetchingFeeds).toBe(false);
    });
  });
});
