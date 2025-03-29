import { reducer } from '../profileSlice';
import { TOrder } from '@utils-types';
import { TProfileState } from '../types/types';
import { getUserOrders } from 'src/services/thunks/profile';
import {
  getFulfilledRequestId,
  getPendingRequestId,
  getRejectedRequestId
} from './helpers/helpers';
import { GET_PROFILE_ORDERS } from '@thunks/profile';
import mockOrdersData from './__mocks__/orders.json';

const mockOrders = mockOrdersData.data;

describe('Работа редьюсера profile', () => {
  const initialState: TProfileState = {
    orders: [],
    isFetchingOrders: false
  };

  describe('Тесты экшенов, генерируемых при выполнении асинхронных запросов', () => {
    describe('Получение заказов пользоватея', () => {
      it('Начало запроса', () => {
        const requestId = getPendingRequestId(GET_PROFILE_ORDERS);
        const newState = reducer(
          initialState,
          getUserOrders.pending(requestId)
        );

        const { isFetchingOrders } = newState;
        expect(isFetchingOrders).toBe(true);
      });

      it('Успешное выполнение запроса', () => {
        const requestId = getFulfilledRequestId(GET_PROFILE_ORDERS);
        const mockOrdersResponse: TOrder[] = mockOrders;
        const newState = reducer(
          initialState,
          getUserOrders.fulfilled(mockOrdersResponse, requestId)
        );

        const { orders, isFetchingOrders } = newState;

        expect(isFetchingOrders).toBe(false);
        expect(orders).toEqual(mockOrdersResponse);
      });

      it('Возникновение ошибки', () => {
        const requestId = getRejectedRequestId(GET_PROFILE_ORDERS);
        const mockError = new Error('Error when getting profile orders');
        const newState = reducer(
          initialState,
          getUserOrders.rejected(mockError, requestId)
        );

        const { isFetchingOrders } = newState;
        expect(isFetchingOrders).toBe(false);
      });
    });
  });
});
