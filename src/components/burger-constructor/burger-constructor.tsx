import { FC, useMemo, useState } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  getConstructorItems,
  getOrderModalData,
  getOrderRequest,
  orderBurger,
  setModalOrderData,
  setOrderRequest
} from '../../services/slices/burgerConstructorSlice';
import { getIsAuthenticated } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(getConstructorItems);
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderModalData);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const isBurgerReady =
    constructorItems.bun._id && constructorItems.ingredients.length;

  const onOrderClick = () => {
    if (!isBurgerReady || orderRequest) return;
    if (!isAuthenticated) return navigate('/login');

    dispatch(
      orderBurger([constructorItems.bun, ...constructorItems.ingredients])
    );
  };

  const closeOrderModal = () => {
    if (orderModalData) {
      dispatch(setModalOrderData(null));
    }
    if (orderRequest) {
      dispatch(setOrderRequest(false));
    }
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      isBurgerReady={isBurgerReady}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
