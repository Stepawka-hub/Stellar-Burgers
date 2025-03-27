import { configureStore } from '@reduxjs/toolkit';
import { reducer, setPreviewIngredientId } from '../ingredientsSlice';
import { TIngredient } from '@utils-types';
import { TIngredientsState } from '../types/types';
import { getIngredients } from '@thunks/ingredients';

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

  describe('Тесты асинхронных экшенов', () => {
    const testRequestId = 'test-ingredients-request-id';

    it('Получение ингредиента - Начало запроса', () => {
      const store = configureStore({
        reducer,
        preloadedState: initialState
      });

      store.dispatch(getIngredients.pending(testRequestId));

      const { isIngredientsLoading, getIngredientsError } = store.getState();

      expect(isIngredientsLoading).toBe(true);
      expect(getIngredientsError).toBe(null);
    });

    it('Получение ингредиента - Успешное выполнение запроса', () => {
      const store = configureStore({
        reducer,
        preloadedState: initialState
      });

      const mockIngredientResponse: TIngredient[] = [
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        },
        {
          _id: '643d69a5c3f7b9001cfa0941',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
        }
      ];

      store.dispatch(
        getIngredients.fulfilled(mockIngredientResponse, testRequestId)
      );

      const { ingredients, isIngredientsLoading, getIngredientsError } =
        store.getState();

      expect(ingredients).toEqual(mockIngredientResponse);
      expect(isIngredientsLoading).toBe(false);
      expect(getIngredientsError).toBe(null);
    });

    it('Получение ингредиента - Возникновение ошибки', () => {
      const store = configureStore({
        reducer,
        preloadedState: initialState
      });
      const mockError = new Error('Error when getting ingredients');

      store.dispatch(getIngredients.rejected(mockError, testRequestId));

      const { isIngredientsLoading, getIngredientsError } = store.getState();
      expect(isIngredientsLoading).toBe(false);
      expect(getIngredientsError).toBe(mockError.message);
    });
  });
});
