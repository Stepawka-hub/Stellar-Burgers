import { reducer, setPreviewIngredientId } from '../ingredientsSlice';
import { TIngredient } from '@utils-types';
import { TIngredientsState } from '../types/types';
import { getIngredients } from '@thunks/ingredients';
import {
  getFulfilledRequestId,
  getPendingRequestId,
  getRejectedRequestId
} from './helpers/helpers';

import mockIngredientsData from './__mocks__/ingredients.json';
import { GET_ALL_INGREDIENTS } from '@thunks/ingredients';

describe('Работа редьюсера ingredients', () => {
  const initialState: TIngredientsState = {
    ingredients: [],
    isIngredientsLoading: false,
    getIngredientsError: null,
    previewIngredientId: null
  };

  describe('Тесты синхронных экшенов', () => {
    it('Смена превью ингредиента', () => {
      const testIngredientId = 'test-ingredient-id';
      const newState = reducer(
        initialState,
        setPreviewIngredientId(testIngredientId)
      );

      const { previewIngredientId } = newState;

      expect(previewIngredientId).toBe(testIngredientId);
    });
  });

  describe('Тесты экшенов, генерируемых при выполнении асинхронных запросов', () => {
    const mockIngredients: TIngredient[] = mockIngredientsData.data;

    describe('Получение ингредиентов', () => {
      it('Начало запроса', () => {
        const requestId = getPendingRequestId(GET_ALL_INGREDIENTS);
        const newState = reducer(
          initialState,
          getIngredients.pending(requestId)
        );

        const { isIngredientsLoading, getIngredientsError } = newState;

        expect(isIngredientsLoading).toBe(true);
        expect(getIngredientsError).toBe(null);
      });

      it('Успешное выполнение запроса', () => {
        const requestId = getFulfilledRequestId(GET_ALL_INGREDIENTS);
        const newState = reducer(
          initialState,
          getIngredients.fulfilled(mockIngredients, requestId)
        );

        const { ingredients, isIngredientsLoading, getIngredientsError } =
          newState;

        expect(ingredients).toEqual(mockIngredients);
        expect(isIngredientsLoading).toBe(false);
        expect(getIngredientsError).toBe(null);
      });

      it('Возникновение ошибки', () => {
        const requestId = getRejectedRequestId(GET_ALL_INGREDIENTS);
        const mockError = new Error('Error when getting ingredients');
        const newState = reducer(
          initialState,
          getIngredients.rejected(mockError, requestId)
        );

        const { isIngredientsLoading, getIngredientsError } = newState;
        expect(isIngredientsLoading).toBe(false);
        expect(getIngredientsError).toBe(mockError.message);
      });
    });
  });
});
