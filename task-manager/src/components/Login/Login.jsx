import { useState } from "react";
import { useAuth } from "../TaskContext/useAuth";
import { useNavigate } from "react-router-dom";
import { formDataToObject } from "../../utils";

const Login = () => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [message, setMessage] = useState(undefined);
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const result = await login(formData.get('username'), formData.get('password'))
    if (result) {
      navigate('/task')
    } else {
      setTimeout(() => setShow(true), 5000);
    }
  }

  const handleSubmitSignUp = async (event) => {
    event.preventDefault();
    const formData = formDataToObject(new FormData(event.target),true);
    //console.log(formData);
    const result = await register(formData);
    if (result.message) {
      setMessage(result.message);
      setTimeout(() => setShow2(true), 5000);

    }
  }
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-background p-4">
      <div className="bg-card rounded-lg shadow-lg p-6 w-full max-w-md md:mr-4 transition-transform transform hover:scale-105 duration-300 border-4 border-accent">
        <h2 className="text-4xl font-bold text-foreground mb-4 text-center">Welcome Back!</h2>
        {show && <p className="text-sm text-red-600 text-center">Email or Password Invalid</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-muted-foreground mb-2" htmlFor="email">Email</label>
            <input type="email" name="username" id="email" className="w-full p-3 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-accent" placeholder="you@example.com" required />
          </div>
          <div className="mb-4">
            <label className="block text-muted-foreground mb-2" htmlFor="password">Password</label>
            <input type="password" name="password" id="password" className="w-full p-3 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-accent" placeholder="••••••••" required />
          </div>
          <button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/80 w-full p-3 rounded-lg transition-colors duration-200 shadow-lg">Sign In</button>
        </form>
        <p className="text-muted-foreground mt-4 text-center">Don&apos;t have an account? <a href="#signup" className="text-primary hover:underline">Sign Up</a></p>
      </div>

      <div className="bg-card rounded-lg shadow-lg p-6 w-full max-w-md mt-8 md:mt-0 transition-transform transform hover:scale-105 duration-300 border-4 border-accent">
        <h2 className="text-4xl font-bold text-foreground mb-4 text-center">Create an Account</h2>

        {show2 && <p className="text-sm text-gray-600 text-center">{message}</p>}
        <form onSubmit={handleSubmitSignUp}>
          <div className="mb-4">
            <label className="block text-muted-foreground mb-2" htmlFor="new-email">Email</label>
            <input name="username" type="email" id="new-email" className="w-full p-3 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-accent" placeholder="you@example.com" required />
          </div>
          <div className="mb-4">
            <label className="block text-muted-foreground mb-2" htmlFor="new-password">Password</label>
            <input name="password" type="password" id="new-password" className="w-full p-3 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-accent" placeholder="••••••••" required />
          </div>
          <div className="mb-4">
            <label className="block text-muted-foreground mb-2" htmlFor="new-password">Confirm password</label>
            <input name="password1" type="password" id="confirm-password" className="w-full p-3 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-accent" placeholder="••••••••" required />
          </div>
          <button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/80 w-full p-3 rounded-lg transition-colors duration-200 shadow-lg">Sign Up</button>
        </form>
        <p className="text-muted-foreground mt-4 text-center">Already have an account? <a href="#signin" className="text-primary hover:underline">Sign In</a></p>
      </div>
    </div>
  )
}

export default Login;