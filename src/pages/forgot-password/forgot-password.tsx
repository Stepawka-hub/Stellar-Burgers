import { FC, useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { forgotPasswordApi } from '@api';
import { ForgotPasswordUI } from '@ui-pages';
import { TError } from '@utils-types';

export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<TError>(null);
  const [isFetching, setIsFetching] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email) return setError('Укажите email!');

    setError(null);
    setIsFetching(true);
    forgotPasswordApi({ email })
      .then(() => {
        localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password', { replace: true });
      })
      .catch((err) => setError(err))
      .finally(() => setIsFetching(false));
  };

  return (
    <ForgotPasswordUI
      errorText={error}
      email={email}
      isFetching={isFetching}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
