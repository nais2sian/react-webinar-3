import { Navigate } from 'react-router-dom';
import useSelector from '../hooks/use-selector';

const RedirectRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.userState);
  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default RedirectRoute;
