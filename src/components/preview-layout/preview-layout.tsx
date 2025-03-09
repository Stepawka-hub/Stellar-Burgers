import { FC } from 'react';
import { PreviewLayoutProps } from './type';
import { PreviewLayoutUI } from '../ui/preview-layout';

export const PreviewLayout: FC<PreviewLayoutProps> = ({ title, children }) => (
  <PreviewLayoutUI title={title} children={children} />
);
