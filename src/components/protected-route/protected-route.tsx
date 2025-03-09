import { FC } from 'react';
import { ProtectedRouteProps } from './type';
import { useSelector } from '../../services/store';
import {
  getAuthChecked,
  getIsAuthenticated
} from '../../services/slices/userSlice';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyUnAuth
}) => {
  const isAuthChecked: boolean = useSelector(getAuthChecked);
  const isAuthenticated: boolean = useSelector(getIsAuthenticated);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  // Требуется авторизация, пользователь не авторизован
  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  // Не требуется авторизация, пользователь авторизрован
  if (onlyUnAuth && isAuthenticated) {
    // Возвращаем на страницу (Если перешёл по прямому URL - редиректим на конструктор)
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
