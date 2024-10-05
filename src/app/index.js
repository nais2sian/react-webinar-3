import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import LoginPage from './loginPage';
import ProfilePage from './profilePage';
import ProtectedRoute from './../appProtectedRoute';
import { useEffect } from 'react';
import useStore from '../hooks/use-store';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();
  const activeModal = useSelector(state => state.modals.name);
  const { isAuthenticated, token } = useSelector(state => state.userState);

  useEffect(() => {
    if (token && isAuthenticated) {
      store.actions.userState.fetchSessionProfile(token);
    }
  }, [token, isAuthenticated]);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<LoginPage />} />
        <Route
          path={'/profile'}
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
