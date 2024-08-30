import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { axiosInstance, secureAxiosInstance } from '../../axiosConfig';

// Création du contexte d'authentification
export const AuthContext = createContext();

// Hook personnalisé pour utiliser le contexte d'authentification

// Fournisseur d'authentification
export function AuthProvider({ children,navigate  }) {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const checkAuth = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token');
        //console.log("ato")
        if (token) {
          // Validate the token
          const result = await secureAxiosInstance.get('/validate-token/');
          if (result.status === 200) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            // localStorage.removeItem('token');
            navigate('/login')
          }

        } else {
          setIsAuthenticated(false);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        navigate('/login');  // Redirect to login page
      }
    };

    checkAuth();
  }, []);

  const register=async (data)=>{
    try {
        const result= await axiosInstance.post('/register/',data);
        if(result.status === 201 && result.data.message){
            return {message:result.data.message};
        }
    } catch (error) {
        console.error(error);
        return {message: error.message};
    }
  }
  // Fonction pour se connecter
  const login = async (username,password) => {
    try {
        const result= await axiosInstance.post('/login/',{username,password});
        if(result.status === 200 && result.data.token){
            localStorage.setItem('token',result.data.token);
            setIsAuthenticated(true);
            return true;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
  };

  // Fonction pour se déconnecter
  const logout = async () => {
    try {
        const result= await secureAxiosInstance.post('/logout/');
        if(result.status === 2){
            localStorage.removeItem('token');
            navigate("/");
            return true;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
  };

  const value = {
    isAuthenticated,
    login,
    logout,
    register,
    setLoading,
    loading
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
    navigate : PropTypes.func
};