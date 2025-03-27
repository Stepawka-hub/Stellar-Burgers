import { TUserState } from '../types/types';
import { reducer, userLogout } from '../userSlice';

describe('Работа редьюсера user', () => {
  const initialState: TUserState = {
    isAuthChecked: false,
    isAuthenticated: false,
    user: null,

    loginUserRequest: false,
    registerUserRequest: false,
    logoutUserRequest: false,
    updateUserRequest: false,

    loginUserError: null,
    registerUserError: null,
    logoutUserError: null,
    updateUserError: null
  };

  describe('Тесты синхронных экшенов', () => {
    const initialState: TUserState = {
      isAuthChecked: true,
      isAuthenticated: true,
      user: {
        email: 'test@mail.ru',
        name: 'Test Name'
      },

      loginUserRequest: false,
      registerUserRequest: false,
      logoutUserRequest: false,
      updateUserRequest: false,

      loginUserError: null,
      registerUserError: null,
      logoutUserError: null,
      updateUserError: null
    };

    it('Логаут пользователя', () => {
      const newState = reducer(initialState, userLogout());

      const { user, isAuthenticated } = newState;
      expect(user).toBe(null);
      expect(isAuthenticated).toBe(false);
    });

    it('Изменение ')
  });

  // describe('Тесты асинхронных экшенов', () => {
  //   const testRequestId = 'test-profile-orders-request-id';

  //   it('Получение ленты заказов - Начало запроса', () => {
  //     const store = configureStore({
  //       reducer,
  //       preloadedState: initialState
  //     });

  //     store.dispatch(getUserOrders.pending(testRequestId));

  //     const { isFetchingOrders } = store.getState();
  //     expect(isFetchingOrders).toBe(true);
  //   });

  //   it('Получение ленты заказов - Успешное выполнение запроса', () => {
  //     const store = configureStore({
  //       reducer,
  //       preloadedState: initialState
  //     });

  //     const mockOrdersResponse: TOrder[] = [
  //       {
  //         ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941'],
  //         _id: '67e063956fce7d001db5bd6c',
  //         status: 'done',
  //         name: 'Краторный био-марсианский бургер',
  //         createdAt: '2025-03-23T19:40:05.812Z',
  //         updatedAt: '2025-03-23T19:40:06.493Z',
  //         number: 71974
  //       },
  //       {
  //         ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941'],
  //         _id: '67e063956fce7d001db5bd6c',
  //         status: 'done',
  //         name: 'Краторный био-марсианский бургер',
  //         createdAt: '2025-03-23T19:40:05.812Z',
  //         updatedAt: '2025-03-23T19:40:06.493Z',
  //         number: 71974
  //       }
  //     ];

  //     store.dispatch(
  //       getUserOrders.fulfilled(mockOrdersResponse, testRequestId)
  //     );

  //     const { orders, isFetchingOrders } = store.getState();

  //     expect(isFetchingOrders).toBe(false);
  //     expect(orders).toEqual(mockOrdersResponse);
  //   });

  //   it('Получение ленты заказов - Возникновение ошибки', () => {
  //     const store = configureStore({
  //       reducer,
  //       preloadedState: initialState
  //     });
  //     const mockError = new Error('Error when getting profile orders');

  //     store.dispatch(getUserOrders.rejected(mockError, testRequestId));

  //     const { isFetchingOrders } = store.getState();
  //     expect(isFetchingOrders).toBe(false);
  //   });
  // });
});
