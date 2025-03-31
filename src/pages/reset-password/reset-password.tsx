import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { resetPasswordApi } from '@api';
import { ResetPasswordUI } from '@ui-pages';
import { TError } from '@utils-types';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState<TError>(null);
  const [isFetching, setIsFetching] = useState(false);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!password || !token) return setError('Заполните все поля!');

    setError(null);
    setIsFetching(true);
    resetPasswordApi({ password, token })
      .then(() => {
        localStorage.removeItem('resetPassword');
        navigate('/login');
      })
      .catch((err) => setError(err))
      .finally(() => setIsFetching(false));
  };

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      navigate('/forgot-password', { replace: true });
    }
  }, [navigate]);

  return (
    <ResetPasswordUI
      errorText={error}
      password={password}
      token={token}
      isFetching={isFetching}
      setPassword={setPassword}
      setToken={setToken}
      handleSubmit={handleSubmit}
    />
  );
};
