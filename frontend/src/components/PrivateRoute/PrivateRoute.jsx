 
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const PrivateRoute = ({ isAuthenticated, redirect, children, allowedRoles = [] }) => {

  const {user} = useSelector(state=> state.user);
  const role = user?.user?.role;

  if (!isAuthenticated) {
    return <Navigate to={redirect} replace />;
  };
   
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return  (
        <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Unauthorized Access</h2>
        <p>You don't have permission to view this page.</p>
      </div>
    )
  };

  return children;
};

export default PrivateRoute;
