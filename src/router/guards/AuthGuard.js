import { Navigate } from 'react-router-dom';

const AuthGuard = ({ component: Component, ...rest }) => {
  const isLoggedIn = localStorage.getItem('Store Access Token');

  return isLoggedIn ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/store-panel/login" />
  );
};

export default AuthGuard;