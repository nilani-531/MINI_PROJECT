// src/services/authService.js

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'; // Ensure this is correct

// Signup function
export const signup = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/signup`, { // Correct endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const text = await response.text(); // Get response as text
        console.log('Signup response:', text); // Log the raw response

        if (!response.ok) {
            throw new Error(text); // Throw detailed error response
        }

        const data = JSON.parse(text); // Parse the JSON response
        return data; // Return the parsed data
    } catch (error) {
        console.error('Signup error:', error.message); // Log detailed error message
        throw error; // Re-throw error to be caught in component
    }
};

// Login function
export const login = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorText = await response.text();  // Log any error message from backend
            throw new Error(`Error logging in: ${errorText}`);
        }

        const data = await response.json();
        console.log('Login response:', data);  // Check if `userId` and `role` are present in the response

        // Return the response data
        return data;
    } catch (error) {
        console.error('Error in login:', error.message);
        throw error;  // Re-throw to handle in Login.js
    }
};

// Fetch user role from localStorage
export const getUserRole = async () => {
    const role = localStorage.getItem('userRole'); // Fetch the user role from localStorage
    return role;
};

// Logout function (optional)
export const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('userRole'); // Remove the user role from localStorage
    localStorage.removeItem('userName'); // Remove the user name from localStorage
    console.log('Logged out');
};

// Function to get user details
export const getUserDetails = () => {
    return {
        name: localStorage.getItem('userName'), // Fetch user name
        role: localStorage.getItem('userRole'), // Fetch user role
    };
};
