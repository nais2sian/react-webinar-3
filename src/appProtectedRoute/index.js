import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import useStore from '../hooks/use-store';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const store = useStore();
  const { isAuthenticated, token } = useSelector(state => state.userState);
  const location = useLocation();

  useEffect(() => {
    if (token && isAuthenticated) {
      store.actions.userState.fetchSessionProfile(token);
    }
  }, [token, isAuthenticated, store.actions.userState]);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
