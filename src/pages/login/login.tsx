import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  getLoginUserError,
  getLoginUserRequest,
  setLoginUserError
} from '@slices/userSlice';
import { loginUser } from '@thunks/user';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(localStorage.getItem('login-email') || '');
  const [password, setPassword] = useState('');
  const error = useSelector(getLoginUserError);
  const loginRequest = useSelector(getLoginUserRequest);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return dispatch(setLoginUserError('Заполнены не все поля!'));
    }
    localStorage.setItem('login-email', email);
    dispatch(loginUser({ email, password }));
  };

  useEffect(
    () => () => {
      dispatch(setLoginUserError(null));
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
