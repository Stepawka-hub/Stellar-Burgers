import { configureStore, nanoid } from '@reduxjs/toolkit';
import {
  addIngredient,
  moveIngredient,
  orderBurger,
  reducer,
  removeIngredient
} from '../burgerConstructorSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { TNewOrderResponse } from '@api';

const mockIngredients: TIngredient[] = [
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
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0943',
    name: 'Соус фирменный Space Sauce',
    type: 'sauce',
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa093f',
    name: 'Мясо бессмертных моллюсков Protostomia',
    type: 'main',
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0940',
    name: 'Говяжий метеорит (отбивная)',
    type: 'main',
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: 'https://code.s3.yandex.net/react/code/meat-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0944',
    name: 'Соус традиционный галактический',
    type: 'sauce',
    proteins: 42,
    fat: 24,
    carbohydrates: 42,
    calories: 99,
    price: 15,
    image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0945',
    name: 'Соус с шипами Антарианского плоскоходца',
    type: 'sauce',
    proteins: 101,
    fat: 99,
    carbohydrates: 100,
    calories: 100,
    price: 88,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0946',
    name: 'Хрустящие минеральные кольца',
    type: 'main',
    proteins: 808,
    fat: 689,
    carbohydrates: 609,
    calories: 986,
    price: 300,
    image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
    image_mobile:
      'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/mineral_rings-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0947',
    name: 'Плоды Фалленианского дерева',
    type: 'main',
    proteins: 20,
    fat: 5,
    carbohydrates: 55,
    calories: 77,
    price: 874,
    image: 'https://code.s3.yandex.net/react/code/sp_1.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0948',
    name: 'Кристаллы марсианских альфа-сахаридов',
    type: 'main',
    proteins: 234,
    fat: 432,
    carbohydrates: 111,
    calories: 189,
    price: 762,
    image: 'https://code.s3.yandex.net/react/code/core.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/core-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0949',
    name: 'Мини-салат Экзо-Плантаго',
    type: 'main',
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    calories: 6,
    price: 4400,
    image: 'https://code.s3.yandex.net/react/code/salad.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/salad-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa094a',
    name: 'Сыр с астероидной плесенью',
    type: 'main',
    proteins: 84,
    fat: 48,
    carbohydrates: 420,
    calories: 3377,
    price: 4142,
    image: 'https://code.s3.yandex.net/react/code/cheese.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png'
  }
];

const mockBuns: TIngredient[] = [
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
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
  }
];

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

    const initialState = {
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

  /* Избыточно делать тестирование самой санки (с мокированным fetch), так как тесты ниже 
  (диспатчащие экшены - pending, fulfilled, rejected), уже покрывают всю проверяемую функциональность */
  describe('Тесты асинхронных экшенов', () => {
    const initialState = {
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

    const testRequestId = 'test-request-id';

    it('Заказ бургера - Начало запроса', () => {
      const store = configureStore({
        reducer,
        preloadedState: initialState
      });

      store.dispatch(orderBurger.pending(testRequestId, []));

      const { orderRequest, orderError } = store.getState();

      expect(orderRequest).toBe(true);
      expect(orderError).toBe(null);
    });

    it('Заказ бургера - Успешное выполнение запроса', () => {
      const store = configureStore({
        reducer,
        preloadedState: initialState
      });

      const mockOrderResponse: TNewOrderResponse = {
        success: true,
        name: 'Краторный био-марсианский бургер',
        order: {
          ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941'],
          _id: '67e063956fce7d001db5bd6c',
          status: 'done',
          name: 'Краторный био-марсианский бургер',
          createdAt: '2025-03-23T19:40:05.812Z',
          updatedAt: '2025-03-23T19:40:06.493Z',
          number: 71974
        }
      };

      store.dispatch(
        orderBurger.fulfilled(mockOrderResponse, testRequestId, [])
      );

      const { orderModalData, orderRequest, orderError } = store.getState();

      expect(orderModalData).toEqual(mockOrderResponse.order);
      expect(orderRequest).toBe(false);
      expect(orderError).toBe(null);
    });

    it('Заказ бургера - Возникновение ошибки', () => {
      const store = configureStore({
        reducer,
        preloadedState: initialState
      });
      const mockError = new Error('Error when creating an order');

      store.dispatch(orderBurger.rejected(mockError, testRequestId, []));

      const { orderRequest, orderError } = store.getState();

      expect(orderRequest).toBe(false);
      expect(orderError).toBe(mockError.message);
    });
  });
});
