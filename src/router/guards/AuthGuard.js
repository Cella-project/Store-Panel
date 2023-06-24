import { Navigate } from 'react-router-dom';

const AuthGuard = ({ component: Component, ...rest }) => {
  const isLoggedIn = localStorage.getItem("Access Token");

  return isLoggedIn ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/store-panel/auth/login" />
  );
};

export default AuthGuard;