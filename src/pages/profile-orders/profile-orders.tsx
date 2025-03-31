import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  getIsFetchingOrders,
  getUserOrdersSelector
} from '@slices/profileSlice';
import { getUserOrders } from '@thunks/profile';

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
