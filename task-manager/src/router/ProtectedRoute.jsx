import PropTypes from 'prop-types';
import { useAuth } from '../components/TaskContext/useAuth';
import { Navigate } from 'react-router-dom';
export function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
  
    if (!isAuthenticated) {
      return <Navigate to="/login" />; // Redirect to login if not authenticated
    }
  
    return children; // Render the protected component if authenticated
  }

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired
}
