import { Link, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { useAuth } from "../TaskContext/useAuth";

const Navbar = ({lock}) => {
    const navigate=useNavigate();
    const toLogin=()=>navigate('/login')

    const {isAuthenticated,logout} = useAuth();


  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          Task Manager
        </div>
        <div className="space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          <Link to="/task" className="text-gray-300 hover:text-white">Task</Link>
        </div>

        {
            lock && isAuthenticated? (
            <button onClick={logout} className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-500">
                Sign Out
              </button>):(
                <button onClick={toLogin} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Sign In
        </button>)
        }
        
      </div>
    </nav>
  );
}

Navbar.propTypes={
    lock: PropTypes.bool
}

export default Navbar;
