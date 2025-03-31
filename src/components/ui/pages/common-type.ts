import { TError } from '@utils-types';
import { Dispatch, SetStateAction, SyntheticEvent } from 'react';

export type PageUIProps = {
  errorText: TError;
  email: string;
  isFetching?: boolean;
  setEmail: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: SyntheticEvent) => void;
};
