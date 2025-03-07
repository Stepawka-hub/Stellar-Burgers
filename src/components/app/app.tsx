import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useDispatch } from '../../services/store';
import { useSelector } from 'react-redux';
import { Preloader } from '@ui';
import { getInitialized, initializeApp } from '../../services/slices/appSlice';

/* 
  Через useEffect инициализируем приложение (получаем начальные ингредиенты, заказы).
  Без инициализации пользователь может напрямую перейти на карточку с ингредиентом/заказом
  и ничего не увидит, так как данных нет.
  Можно конечно непосредственно в компоненте карточки постоянно проверять наличие данных и
  при их отсутствии отправлять запрос на сервер, но решил остановиться на таком варианте.

  Кроме того, не будет "морганий" экрана при переходе на защищённый маршрут.
*/

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialized = useSelector(getInitialized);

  const location = useLocation();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(initializeApp());
  }, []);

  const onClose = () => {
    navigate(background);
  };

  return (
    <div className={styles.app}>
      <AppHeader />

      {!initialized ? (
        <Preloader />
      ) : (
        <Routes location={background || location}>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/profile'>
            <Route index element={<Profile />} />
            <Route path='orders' element={<ProfileOrders />} />
          </Route>
          <Route path='/ingredients/:id' element={<IngredientDetails />} />
          <Route path='/feed/:number' element={<OrderInfo />} />
          <Route path='*' element={<NotFound404 />} />
        </Routes>
      )}

      {background && (
        <>
          <Routes>
            <Route
              path='/ingredients/:id'
              element={
                <Modal title='Ингредиент' onClose={onClose}>
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal title='Информация о заказе' onClose={onClose}>
                  <OrderInfo />
                </Modal>
              }
            />
          </Routes>
        </>
      )}

      {/* <Routes>
        <Route
          path='/profile/orders/:number'
          element={
            <Modal title='Заказы' onClose={() => {}}>
              <OrderInfo />
            </Modal>
          }
        />
      </Routes>  */}
    </div>
  );
};

export default App;
