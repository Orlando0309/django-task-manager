// import Login from "./components/Login/Login";
import { AuthProvider } from "./components/TaskContext/AuthContext";
import { RouterProviders } from "./router/RouterProviders";

export default function App() {
  return (
    <AuthProvider>
      <RouterProviders/>
    </AuthProvider>
  )
}