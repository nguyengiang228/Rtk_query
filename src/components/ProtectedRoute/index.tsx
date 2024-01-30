import { Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isAuth = true;
  // console.log(isAuth);
  return isAuth ? <Outlet /> : 'Not Authenticated';
};

export default ProtectedRoute;
