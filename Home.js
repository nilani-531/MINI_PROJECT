import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch data from backend to test connection
        fetch('http://localhost:5000/')
            .then((response) => response.text())
            .then((data) => setMessage(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="home-container">
            <h1>Welcome to the AI-Powered Quiz Platform</h1><br></br>
           <p>Your one-step solution for placement preparation, quizzes!</p>
           
            <div className="home-buttons">
                <Link to="/login">
                    <button className="btn">Login</button>
                </Link>
                <Link to="/signup">
                    <button className="btn">Sign Up</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
