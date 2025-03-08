import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  getLoginUserError,
  getLoginUserRequest,
  loginUser,
  setLoginUserError
} from '../../services/slices/userSlice';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector(getLoginUserError);
  const loginRequest = useSelector(getLoginUserRequest);

  const handleSubmit = (e: SyntheticEvent) => {
    dispatch(loginUser({ email, password }));
    e.preventDefault();
  };

  useEffect(
    () => () => {
      dispatch(setLoginUserError(''));
    },
    []
  );

  return (
    <LoginUI
      loginRequest={loginRequest}
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
