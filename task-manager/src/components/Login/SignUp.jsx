import { useState } from "react";
import { useAuth } from "../TaskContext/useAuth";
import { formDataToObject } from "../../utils";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [show2, setShow2] = useState(false);
    const [message, setMessage] = useState(undefined);
    const { register } = useAuth();

    const handleSubmitSignUp = async (event) => {
        event.preventDefault();
        const formData = formDataToObject(new FormData(event.target), true);
        const result = await register(formData);
        if (result.message) {
            setMessage(result.message);
            setTimeout(() => setShow2(true), 5000);
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-background p-4">
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
                        <label className="block text-muted-foreground mb-2" htmlFor="confirm-password">Confirm password</label>
                        <input name="password1" type="password" id="confirm-password" className="w-full p-3 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-accent" placeholder="••••••••" required />
                    </div>
                    <button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/80 w-full p-3 rounded-lg transition-colors duration-200 shadow-lg">Sign Up</button>
                </form>
                <p className="text-muted-foreground mt-4 text-center">Already have an account? <Link to="/login" className="text-primary hover:underline">Sign In</Link></p>
            </div>
        </div>
    );
};

export default SignUp;
