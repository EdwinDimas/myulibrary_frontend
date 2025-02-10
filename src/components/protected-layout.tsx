
import { Outlet, Navigate } from 'react-router';
import { useSelector } from 'react-redux';

const ProtectedLayout = () => {
  const user = useSelector((state: any) => {
    return state.authApi.queries["getUser(null)"].data
  });

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
