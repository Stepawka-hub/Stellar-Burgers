import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getUpdateUserError,
  getUpdateUserRequest,
  getUserSelector,
  setUpdateUserError,
  updateUser
} from '../../services/slices/userSlice';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);
  const updateUserError = useSelector(getUpdateUserError);
  const updateUserRequest = useSelector(getUpdateUserRequest);

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!formValue.name || !formValue.email || !formValue.password) {
      dispatch(setUpdateUserError('Не все поля заполнены!'));
      return;
    }

    dispatch(updateUser({ ...formValue }));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
    dispatch(setUpdateUserError(''));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      updateUserError={updateUserError}
      updateUserRequest={updateUserRequest}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
