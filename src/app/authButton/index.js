import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../../components/login-button';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';

const AuthButton = () => {
  const navigate = useNavigate();
  const store = useStore();
  const { isAuthenticated, userData } = useSelector(state => state.userState);

  const handleAuthAction = () => {
    if (isAuthenticated) {
      store.actions.userState.logout();
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  const buttonText = isAuthenticated ? 'Выход' : 'Вход';
  const userName = isAuthenticated && userData && userData.profile ? userData.profile.name : '';
  const profileLink = isAuthenticated ? '/profile' : undefined;

  return <Login onClick={handleAuthAction} title={buttonText} name={userName} link={profileLink} />;
};

export default AuthButton;
