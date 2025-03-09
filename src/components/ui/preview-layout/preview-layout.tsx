import { FC } from 'react';
import { PreviewLayoutUIProps } from './type';
import styles from './preview-layout.module.css';

export const PreviewLayoutUI: FC<PreviewLayoutUIProps> = ({
  title,
  children
}) => (
  <section className={`mt-30 ${styles.layout}`}>
    <h2 className={`text text_type_main-large ${styles.title}`}>{title}</h2>
    {children}
  </section>
);
