import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isLoading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(name, email, password);
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h3>Create an Account</h3>
                
                <label>Name:</label>
                <input 
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Enter your name"
                />
                
                <label>Email:</label>
                <input 
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Enter your email"
                />
                
                <label>Password:</label>
                <input 
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Enter your password"
                />
                
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Signing up...' : 'Sign Up'}
                </button>
                
                {error && <div className="error">{error}</div>}
                
                <p className="auth-switch">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </form>
        </div>
    );
};

export default Signup;
