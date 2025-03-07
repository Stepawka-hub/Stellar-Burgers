import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  getFeeds,
  getIsFetchingFeedsSelector,
  getOrdersSelector
} from '../../services/slices/feedSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const isFetchingFeeds = useSelector(getIsFetchingFeedsSelector);
  const orders: TOrder[] = useSelector(getOrdersSelector);

  useEffect(() => {
    getFeedsInfo();
  }, []);

  const getFeedsInfo = () => {
    dispatch(getFeeds());
  };

  if (!orders.length || isFetchingFeeds) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={getFeedsInfo} />;
};
