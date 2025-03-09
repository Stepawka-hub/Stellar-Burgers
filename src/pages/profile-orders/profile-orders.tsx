import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  getIsFetchingOrders,
  getUserOrders,
  getUserOrdersSelector
} from '../../services/slices/profileSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getUserOrdersSelector);
  const isFetchingOrders: boolean = useSelector(getIsFetchingOrders);

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  return (
    <ProfileOrdersUI orders={orders} isFetchingOrders={isFetchingOrders} />
  );
};
