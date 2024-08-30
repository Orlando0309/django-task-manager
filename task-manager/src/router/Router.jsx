import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import Login from "../pages/LoginPage/LoginPage";
import TaskList from "../pages/TaskListPage/TaskListPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { TaskProvider } from "../components/TaskContext/TaskContext";
import Layout from "../components/Layout/Layout"; // Import a Layout component

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,  // Use a Layout component as the root element
        children: [
            {
                path: '',
                element: <HomePage />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'task',
                element: (
                    <ProtectedRoute element={
                        <TaskProvider>
                            <TaskList />
                        </TaskProvider>
                    } />
                )
            }
        ]
    }
]);

// Example of Layout component structure
// This Layout component renders common elements like the Navbar
// and also renders the specific content for each route.
