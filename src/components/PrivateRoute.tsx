import { Navigate } from 'react-router-dom';
import { getPageRoute } from '../utils/routes';
import { useIsAuth } from '../store/authStore';

const PrivateRoute = ({ element: Component }: { element: React.ComponentType}): React.ReactElement => {
  const isAuth = useIsAuth();

  return (isAuth) ? <Component /> : <Navigate to={getPageRoute('PAGE_LOGIN')} />;
};

export default PrivateRoute;