import React, { useState } from 'react';
import '../styles/styles.css';  // Import the CSS file
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';  // Import navigate for redirection

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();  // Use the navigate hook for redirection

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
    
        try {
            const userData = { email, password };
            const response = await login(userData); // Ensure your login function fetches the response
            const { user } = response; // Destructure user from response
    
            // Store user details in local storage or context
            localStorage.setItem('userId', user.id);
            localStorage.setItem('userRole', user.role); // Store user role
            localStorage.setItem('userName', user.name); // Optional: store user name
    
            if (user.role === 'staff') {
                navigate('/staff-dashboard'); // Redirect staff to the staff dashboard
            } else if (user.role === 'student') {
                navigate('/student-dashboard'); // Redirect students to the student dashboard
            } else {
                setError('Unknown user role');
            }
        } catch (err) {
            setError('Invalid email or password');
        }
    };
    
    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <button 
                        type="submit"
                        style={{
                            marginTop: '30px', 
                            padding: '10px 20px',
                            fontSize: '18px',
                        }}
                    >
                        Login
                    </button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default Login;
