import { nanoid } from '@reduxjs/toolkit';
import {
  addIngredient,
  moveIngredient,
  reducer,
  removeIngredient
} from '../burgerConstructorSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { TNewOrderResponse } from '@api';
import { TBurgerConstructorState } from '../types/types';
import { orderBurger } from 'src/services/thunks/burgerConstructor';

import mockIngredientsData from './__mocks__/ingredients.json';
import mockBunsData from './__mocks__/buns.json';
import mockOrderResponseData from './__mocks__/order-response.json';
import { ORDER_BURGER } from '@thunks/typePrefixes';
import {
  getFulfilledRequestId,
  getPendingRequestId,
  getRejectedRequestId
} from './utils/helpers';

const mockIngredients: TIngredient[] = mockIngredientsData.data;
const mockBuns: TIngredient[] = mockBunsData.data;

describe('Работа редьюсера конструктора', () => {
  describe('Тесты синхронных экшенов', () => {
    const constructorIngredients: TConstructorIngredient[] = [
      {
        id: nanoid(),
        ...mockIngredients[0]
      },
      {
        id: nanoid(),
        ...mockIngredients[1]
      }
    ];

    const initialState: TBurgerConstructorState = {
      constructorItems: {
        bun: {
          id: null,
          price: 0
        },
        ingredients: [...constructorIngredients]
      },
      orderError: null,
      orderRequest: false,
      orderModalData: null
    };

    it('Добавление ингредиента в конструктор', () => {
      const newState = reducer(initialState, addIngredient(mockIngredients[0]));

      const { ingredients } = newState.constructorItems;

      expect(ingredients).toHaveLength(3);
    });

    it('Добавление булочки в конструктор', () => {
      const newState = reducer(initialState, addIngredient(mockBuns[0]));

      const { bun } = newState.constructorItems;

      expect(bun._id).toBe(mockBuns[0]._id);
    });

    it('Удаление ингредиента из конструктора', () => {
      const newState = reducer(
        initialState,
        removeIngredient(constructorIngredients[0].id)
      );

      const { ingredients } = newState.constructorItems;

      expect(ingredients).toHaveLength(1);
    });

    it('Перемещение ингредиента в конструкторе', () => {
      const fromIndex = 0;
      const toIndex = 1;

      const newState = reducer(
        initialState,
        moveIngredient({ fromIndex, toIndex })
      );

      const { ingredients } = newState.constructorItems;
      const expected = [...initialState.constructorItems.ingredients];
      expected.splice(toIndex, 0, expected.splice(fromIndex, 1)[0]);

      expect(ingredients).toEqual(expected);
    });
  });

  describe('Тесты экшенов, генерируемых при выполнении асинхронных запросов', () => {
    const initialState: TBurgerConstructorState = {
      constructorItems: {
        bun: {
          id: null,
          price: 0
        },
        ingredients: []
      },
      orderError: null,
      orderRequest: false,
      orderModalData: null
    };

    it('Заказ бургера - Начало запроса', () => {
      const requestId = getPendingRequestId(ORDER_BURGER);
      const newState = reducer(
        initialState,
        orderBurger.pending(requestId, [])
      );

      const { orderRequest, orderError } = newState;

      expect(orderRequest).toBe(true);
      expect(orderError).toBe(null);
    });

    it('Заказ бургера - Успешное выполнение запроса', () => {
      const requestId = getFulfilledRequestId(ORDER_BURGER);
      const mockOrderResponse: TNewOrderResponse = mockOrderResponseData;
      const newState = reducer(
        initialState,
        orderBurger.fulfilled(mockOrderResponse, requestId, [])
      );

      const { orderModalData, orderRequest, orderError } = newState;

      expect(orderModalData).toEqual(mockOrderResponse.order);
      expect(orderRequest).toBe(false);
      expect(orderError).toBe(null);
    });

    it('Заказ бургера - Возникновение ошибки', () => {
      const requestId = getRejectedRequestId(ORDER_BURGER);
      const mockError = new Error('Error when creating an order');
      const newState = reducer(
        initialState,
        orderBurger.rejected(mockError, requestId, [])
      );

      const { orderRequest, orderError } = newState;

      expect(orderRequest).toBe(false);
      expect(orderError).toBe(mockError.message);
    });
  });
});
