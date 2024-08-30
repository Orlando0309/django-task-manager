import { useState } from "react";
import { useAuth } from "../TaskContext/useAuth";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const result = await login(formData.get('username'), formData.get('password'));
        if (result) {
            navigate('/task');
        } else {
            setTimeout(() => setShow(true), 5000);
        }
    };

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
                <p className="text-muted-foreground mt-4 text-center">Don&apos;t have an account? <Link to="/signup" className="text-primary hover:underline">Sign Up</Link></p>
            </div>
        </div>
    );
};

export default SignIn;
