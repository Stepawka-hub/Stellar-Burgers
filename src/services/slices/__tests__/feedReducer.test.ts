import { TFeedsResponse, TOrderResponse } from '@api';
import { TOrder } from '@utils-types';
import { reducer, setPreviewOrder } from '../feedSlice';
import { TFeedsState } from '../types/types';
import { getFeeds, getOrderByNumber } from 'src/services/thunks/feed';
import {
  getFulfilledRequestId,
  getPendingRequestId,
  getRejectedRequestId
} from './helpers/helpers';

import mockOrdersData from './__mocks__/orders.json';
import mockFeedsResponseData from './__mocks__/feeds-response.json';
import { GET_FEEDS_INFO, GET_ORDER_BY_NUMBER } from '@thunks/feed';

const mockOrders: TOrder[] = mockOrdersData.data;

describe('Работа редьюсера feed', () => {
  const initialState: TFeedsState = {
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
      const mockPreviewOrder: TOrder = mockOrders[0];
      const newState = reducer(initialState, setPreviewOrder(mockPreviewOrder));

      const { previewOrder } = newState;

      expect(previewOrder).toEqual(mockPreviewOrder);
    });
  });

  describe('Тесты экшенов, генерируемых при выполнении асинхронных запросов', () => {
    describe('Получение ленты заказов', () => {
      it('Начало запроса', () => {
        const requestId = getPendingRequestId(GET_FEEDS_INFO);
        const newState = reducer(initialState, getFeeds.pending(requestId));

        const { isFetchingFeeds } = newState;
        expect(isFetchingFeeds).toBe(true);
      });

      it('Успешное выполнение запроса', () => {
        const requestId = getFulfilledRequestId(GET_FEEDS_INFO);
        const mockOrdersResponse: TFeedsResponse = mockFeedsResponseData;
        const newState = reducer(
          initialState,
          getFeeds.fulfilled(mockOrdersResponse, requestId)
        );

        const { feed, isFetchingFeeds } = newState;
        const { orders, total, totalToday } = feed;

        expect(isFetchingFeeds).toBe(false);
        expect(orders).toEqual(mockOrdersResponse.orders);
        expect(total).toBe(mockOrdersResponse.total);
        expect(totalToday).toBe(mockOrdersResponse.totalToday);
      });

      it('Возникновение ошибки', () => {
        const requestId = getRejectedRequestId(GET_FEEDS_INFO);
        const mockError = new Error('Error when getting feeds');
        const newState = reducer(
          initialState,
          getFeeds.rejected(mockError, requestId)
        );

        const { isFetchingFeeds } = newState;
        expect(isFetchingFeeds).toBe(false);
      });
    });

    describe('Получение заказа по номеру', () => {
      it('Успешное выполнение запроса', () => {
        const requestId = getFulfilledRequestId(GET_ORDER_BY_NUMBER);
        const mockOrderResponse = mockOrders;

        const newState = reducer(
          initialState,
          getOrderByNumber.fulfilled(
            mockOrders[0],
            requestId,
            mockOrderResponse[0].number
          )
        );

        const { previewOrder } = newState;

        expect(previewOrder).toEqual(mockOrderResponse[0]);
      });
    });
  });
});
