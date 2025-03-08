import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  getLogoutUserRequest,
  logoutUser
} from '../../services/slices/userSlice';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const logoutRequest = useSelector(getLogoutUserRequest);
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <ProfileMenuUI
      handleLogout={handleLogout}
      logoutRequest={logoutRequest}
      pathname={pathname}
    />
  );
};
