import axios from 'axios';
import { API } from './secret';

// Create an instance of axios with default configuration
export  const secureAxiosInstance = axios.create({
  baseURL: API, // Replace with your API base URL
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // Add any other custom headers if necessary
  },
});
export  const axiosInstance = axios.create({
  baseURL: API, // Replace with your API base URL
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // Add any other custom headers if necessary
  },
});



// Add a request interceptor if needed
secureAxiosInstance.interceptors.request.use(
  (config) => {
    // Perform actions before sending the request (e.g., attach tokens)
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor if needed
secureAxiosInstance.interceptors.response.use(
  (response) => {
    // Perform actions with the response data
    return response;
  },
  (error) => {
    // Handle response errors (e.g., token expiration, logging out)
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error
        window.location.href = "/";
      // You can log out the user or redirect to the login page
    }
    return Promise.reject(error);
  }
);

