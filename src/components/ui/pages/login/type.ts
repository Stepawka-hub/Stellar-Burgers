import { Dispatch, SetStateAction } from 'react';
import { PageUIProps } from '../common-type';

export type LoginUIProps = PageUIProps & {
  loginRequest: boolean;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
};
