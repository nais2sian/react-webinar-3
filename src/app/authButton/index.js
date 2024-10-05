import React from 'react';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/spinner';
import Login from '../../components/login-button';
import useTranslate from '../../hooks/use-translate';

const AuthButton = () => {
  const navigate = useNavigate();
  const store = useStore();
  const { isAuthenticated, sessionUserData, loading } = useSelector(state => state.userState);
  const handleAuthAction = () => {
    if (isAuthenticated) {
      store.actions.userState.logout();
      navigate('/login');
    } else {
      store.actions.userState.errorCleaning();
      navigate('/login');
    }
  };

  const buttonText = isAuthenticated ? 'Выход' : 'Вход';
  const userName =
    isAuthenticated && sessionUserData && sessionUserData.profile
      ? sessionUserData.profile.name
      : '';
  const profileLink = isAuthenticated ? '/profile' : undefined;

  if (loading) {
    return <Spinner />;
  }

  const { t } = useTranslate();

  return <Login onClick={handleAuthAction}
  // title={buttonText}
  title={t(buttonText)}
  name={userName} link={profileLink} />;
};

export default AuthButton;
