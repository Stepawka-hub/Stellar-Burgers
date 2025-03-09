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

import {
  AppHeader,
  IngredientDetails,
  Modal,
  OrderInfo,
  PreviewLayout
} from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useDispatch } from '../../services/store';
import { useSelector } from 'react-redux';
import { Preloader } from '@ui';
import { getInitialized, initializeApp } from '../../services/slices/appSlice';
import { ProtectedRoute } from '../protected-route';

/* 
  Через useEffect делаем первоначальную инициализацию приложения
  (получаем начальные ингредиенты, заодно проверяем refresh/auth токены).
  
  Без инициализации пользователь может напрямую перейти на карточку с ингредиентом
  и ничего не увидит, так как данных нет (запроса для получения ингредиента по id с сервера также нет).
  Можно конечно непосредственно в компоненте карточки постоянно проверять наличие данных и
  при их отсутствии отправлять запрос на сервер, но решил остановиться на таком варианте.
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
          <Route
            path='/login'
            element={
              <ProtectedRoute onlyUnAuth>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedRoute onlyUnAuth>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute onlyUnAuth>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/reset-password'
            element={
              <ProtectedRoute onlyUnAuth>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route path='/profile'>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path='orders'
              element={
                <ProtectedRoute>
                  <ProfileOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path='orders/:number'
              element={
                <ProtectedRoute>
                  <OrderInfo />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path='/ingredients/:id'
            element={
              <PreviewLayout title='Детали ингредиента'>
                <IngredientDetails />
              </PreviewLayout>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <PreviewLayout title='Детали заказа'>
                <OrderInfo />
              </PreviewLayout>
            }
          />
          <Route path='*' element={<NotFound404 />} />
        </Routes>
      )}

      {background && (
        <>
          <Routes>
            <Route
              path='/ingredients/:id'
              element={
                <Modal title='Детали ингредиента' onClose={onClose}>
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
          <Routes>
            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute>
                  <Modal title='Информация о заказе' onClose={onClose}>
                    <OrderInfo />
                  </Modal>
                </ProtectedRoute>
              }
            />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
