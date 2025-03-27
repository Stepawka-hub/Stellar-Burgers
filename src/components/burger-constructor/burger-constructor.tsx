import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getConstructorItems,
  getOrderModalData,
  getOrderRequest,
  setModalOrderData,
  setOrderRequest
} from '@slices/burgerConstructorSlice';
import { getIsAuthenticated } from '@slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';
import { orderBurger } from '@thunks/burgerConstructor';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(getConstructorItems);
  const orderRequest: boolean = useSelector(getOrderRequest);
  const orderModalData: TOrder | null = useSelector(getOrderModalData);
  const isAuthenticated: boolean = useSelector(getIsAuthenticated);
  const isBurgerReady: boolean =
    constructorItems.bun._id && constructorItems.ingredients.length;

  const onOrderClick = () => {
    if (!isBurgerReady || orderRequest) return;
    if (!isAuthenticated) return navigate('/login');

    dispatch(
      orderBurger([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map(
          (i: TConstructorIngredient) => i._id
        )
      ])
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
