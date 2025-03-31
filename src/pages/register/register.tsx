import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  getRegisterUserError,
  getRegisterUserRequest,
  setRegisterUserError
} from '@slices/userSlice';
import { registerUser } from '@thunks/user';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const error = useSelector(getRegisterUserError);
  const registerRequest = useSelector(getRegisterUserRequest);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!userName || !email || !password) {
      return dispatch(setRegisterUserError('Заполнены не все поля!'));
    }
    dispatch(registerUser({ email, name: userName, password }));
  };

  useEffect(
    () => () => {
      dispatch(setRegisterUserError(null));
    },
    []
  );

  return (
    <RegisterUI
      registerRequest={registerRequest}
      errorText={error}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
