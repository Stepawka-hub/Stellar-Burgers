import { FC } from 'react';

import {
  Button,
  Input,
  PasswordInput
} from '@zlden/react-developer-burger-ui-components';
import styles from './profile.module.css';
import commonStyles from '../common.module.css';

import { ProfileUIProps } from './type';
import { ProfileMenu } from '@components';

export const ProfileUI: FC<ProfileUIProps> = ({
  formValue,
  isFormChanged,
  updateUserError,
  updateUserRequest,
  handleSubmit,
  handleCancel,
  handleInputChange
}) => (
  <main className={`${commonStyles.container}`}>
    <div className={`mt-30 mr-15 ${styles.menu}`}>
      <ProfileMenu />
    </div>
    <form
      className={`mt-30 ${styles.form} ${commonStyles.form}`}
      onSubmit={handleSubmit}
    >
      <>
        <div className='pb-6'>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={handleInputChange}
            value={formValue.name}
            name={'name'}
            error={false}
            errorText={''}
            size={'default'}
            icon={'EditIcon'}
            disabled={updateUserRequest}
          />
        </div>
        <div className='pb-6'>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={handleInputChange}
            value={formValue.email}
            name={'email'}
            error={false}
            errorText={''}
            size={'default'}
            icon={'EditIcon'}
            disabled={updateUserRequest}
          />
        </div>
        <div className='pb-6'>
          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={handleInputChange}
            value={formValue.password}
            name={'password'}
            error={!(formValue.password.length < 8)}
            errorText={''}
            size={'default'}
            icon={'EditIcon'}
            disabled={updateUserRequest}
          />
        </div>
        {isFormChanged && (
          <div className={styles.button}>
            <Button
              type='secondary'
              htmlType='button'
              size='medium'
              disabled={updateUserRequest}
              onClick={handleCancel}
            >
              Отменить
            </Button>
            <Button
              type='primary'
              size='medium'
              htmlType='submit'
              disabled={updateUserRequest}
            >
              {updateUserRequest ? 'Обновление...' : 'Сохранить'}
            </Button>
          </div>
        )}
        {updateUserError && (
          <p
            className={`${commonStyles.error} pt-5 text text_type_main-default`}
          >
            {updateUserError}
          </p>
        )}
      </>
    </form>
  </main>
);
