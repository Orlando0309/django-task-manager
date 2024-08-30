import PropTypes from 'prop-types';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/LoginPage/LoginPage";
import TaskList from "./pages/TaskListPage/TaskListPage";
import { TaskProvider } from "./components/TaskContext/TaskContext";
import Layout from "./components/Layout/Layout";
import { useNavigate } from 'react-router-dom';
import { AuthProvider } from "./components/TaskContext/AuthContext";
import { ProtectedRoute } from './router/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();

  return (
    <AuthProvider navigate={navigate}>
      {children}
    </AuthProvider>
  );
};
AuthWrapper.propTypes = {
  children: PropTypes.node.isRequired,

}
export default function App() {
  return (
    <BrowserRouter>
      <AuthWrapper>
        <Routes>
          <Route path='/' element={<Layout />}>

            <Route index element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/task" element={
              <ProtectedRoute >
                <TaskProvider>
                  <TaskList />
                </TaskProvider>
              </ProtectedRoute>

            } />
            <Route path="*" element={<NotFoundPage />}/>
          </Route>
        </Routes>
      </AuthWrapper>
    </BrowserRouter>
  );
}
