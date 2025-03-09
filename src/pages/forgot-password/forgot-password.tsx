import { FC, useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { forgotPasswordApi } from '@api';
import { ForgotPasswordUI } from '@ui-pages';

export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email) return setError(new Error('Укажите email!'));

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
      errorText={error?.message}
      email={email}
      isFetching={isFetching}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
