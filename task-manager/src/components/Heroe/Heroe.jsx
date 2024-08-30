import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate=useNavigate();
    const toLogin=()=>navigate('/login')

  return (
    <div className="bg-gray-100 h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to Task Manager</h1>
      <p className="text-lg text-gray-600 mb-8">Manage your tasks efficiently and effectively.</p>
      <button onClick={toLogin} className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700">
        Sign In to Get Started
      </button>
    </div>
  );
}

export default Hero;
