import PropTypes from 'prop-types';
import { useAuth } from '../components/TaskContext/useAuth';
export function ProtectedRoute({ element }) {
  const { isAuthenticated } = useAuth();

  return (
    <>
    {isAuthenticated && element}
    </>
  );
}


ProtectedRoute.propTypes = {
    element: PropTypes.node.isRequired
}
