import { TError, TIngredient, TOrder, TOrdersData, TUser } from '@utils-types';

export type TUserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  user: TUser | null;

  loginUserRequest: boolean;
  registerUserRequest: boolean;
  logoutUserRequest: boolean;
  updateUserRequest: boolean;

  loginUserError: TError;
  registerUserError: TError;
  logoutUserError: TError;
  updateUserError: TError;
};

export type TProfileState = {
  orders: TOrder[];
  isFetchingOrders: boolean;
};

export type TIngredientsState = {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  getIngredientsError: TError;
  previewIngredientId: string | null;
};

export type TBurgerConstructorState = {
  constructorItems: any;
  orderRequest: boolean;
  orderError: TError;
  orderModalData: TOrder | null;
};

export type TFeedsState = {
  feed: TOrdersData;
  previewOrder: TOrder | null;
  isFetchingFeeds: boolean;
};


export type TAppState = {
  initialized: boolean;
};
