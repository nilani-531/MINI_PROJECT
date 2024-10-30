import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import '../styles/styles.css';
import { signup } from '../services/authService';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');  // 'staff' or 'student'
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();  // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');  // Reset error message
        setSuccessMessage('');  // Reset success message

        try {
            const userData = { name, email, password, role };
            const response = await signup(userData);  // Await the signup request

            // If the response is successful, redirect the user to the login page
            if (response.message === 'User registered successfully') {
                setSuccessMessage('Signup successful! Redirecting to login...');

                // Use setTimeout to delay the redirection slightly to show the success message
                setTimeout(() => {
                    navigate('/login');  // Redirect to login page
                }, 1000);  // 1 second delay for the redirection
            } else {
                setErrorMessage('Signup failed. Please try again.');
            }
        } catch (error) {
            setErrorMessage('Error during signup. Try again.');
            console.error('Error during signup:', error);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                        style={{ 
                            width: '340px',  // Custom width
                            height: '40px',  // Custom height
                            padding: '10px',
                            marginTop: '10px',  // Spacing inside the dropdown
                            fontSize: '16px'  // Adjust font size for better readability
                        }}
                    >
                        <option value="" disabled>Select Role</option>
                        <option value="staff">Staff</option>
                        <option value="student">Student</option>
                    </select>

                    <button
                        type="submit"
                        style={{
                            marginTop: '40px',  // Add margin for spacing
                            padding: '10px 20px',
                            fontSize: '18px',
                        }}
                    >
                        Sign Up
                    </button>
                </form>

                {errorMessage && <p className="error">{errorMessage}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
            </div>
        </div>
    );
};

export default Signup;
