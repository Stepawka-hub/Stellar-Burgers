import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  getConstructorItems,
  getOrderModalData,
  getOrderRequest,
  setOrderRequest
} from '../../services/slices/burget-constructor/burger-constructor';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();

  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(getConstructorItems);
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderModalData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    dispatch(setOrderRequest(true));
  };

  const closeOrderModal = () => {
    dispatch(setOrderRequest(false));
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
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
