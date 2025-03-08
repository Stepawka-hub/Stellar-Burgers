import { ReactElement } from 'react';

export type ProtectedRouteProps = {
  children: ReactElement;
  onlyUnAuth?: boolean;
};
