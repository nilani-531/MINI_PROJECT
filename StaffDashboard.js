import React, { useState, useEffect } from 'react';
import { fetchRandomQuestions, getQuizResults } from '../services/quizService';
import { getUserDetails } from '../services/authService';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css'; // Ensure this CSS handles the layout and spacing properly.
import Chatbot from './Chatbot'; // Import the Chatbot component
import chatbotIcon from '../components/chatbot.jpeg'; // Import the chatbot image

const StaffDashboard = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [results, setResults] = useState([]);
    const { name: staffName, role: staffRole } = getUserDetails();
    const [message, setMessage] = useState('');
    const [showChatbot, setShowChatbot] = useState(false); // State to toggle chatbot

    useEffect(() => {
        const loadQuizzes = async () => {
            try {
                const result = await fetchRandomQuestions(); // Ensure this fetches the latest quizzes
                setQuizzes(result);
            } catch (error) {
                setMessage('Error fetching quizzes. Please try again later.');
            }
        };
    
        const fetchResults = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const fetchedResults = await getQuizResults(userId);
                setResults(fetchedResults);
            } catch (error) {
                console.error('Error fetching quiz results:', error);
            }
        };
    
        loadQuizzes();
        fetchResults();
    }, []); // This runs only once when the component mounts
    const handleChatbotClick = () => {
        setShowChatbot(!showChatbot); // Toggle the chatbot visibility on image click
    };

    

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Welcome, {staffName || 'Staff'}!</h1>
                <h2>Role: {staffRole || 'Role not defined'}</h2>
            </div>

            {/* Create Quiz Button */}
            <div className="create-quiz-container">
                <Link to="/create-quiz" className="create-quiz-button">
                    <button className="btn">Create Quiz</button>
                </Link>
            </div>

            {/* Display Created Quizzes */}
            <div className="quiz-list">
                {message && <p>{message}</p>}
               {/* <h2>Your Created Quizzes</h2>*/}
                {!quizzes ?(<p>No quizzes created yet.</p>
                ) : (
                    <div>
                        {quizzes.map(quiz => (
                            <div key={quiz._id} className="quiz-item">
                                <h3>{quiz.title}</h3>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <img
                src={chatbotIcon}
                alt="Chatbot"
                onClick={handleChatbotClick}
                style={{ cursor: 'pointer', width: '50px', height: '50px' }} // Style the image
            />
            {showChatbot && <Chatbot />} {/* Conditionally render the Chatbot */}
            {/* Display Quiz Results */}
            <div className="quiz-results">
                <h2>Quiz Results Overview</h2>
                {results.length === 0 ? (
                    <p>No quiz results found.</p>
                ) : (
                    <div>
                        {results.map(result => {
                            const quizDate = new Date(result.completedAt);
                            const formattedDate = quizDate.toLocaleDateString('en-US');
                            const isValidDate = !isNaN(quizDate.getTime());

                            return (
                                <div key={result._id} className="result-item">
                                    <h3>Topic: {result.topicName}</h3>
                                    <p>Score: {result.score}/{result.totalQuestions}</p>
                                    <p>Date: {isValidDate ? formattedDate : 'Invalid Date'}</p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Take Quiz Button */}
            <div className="take-quiz-container">
                <Link to="/take-quiz" className="take-quiz-button">
                    <button className="btn">Take Quiz</button>
                </Link>
            </div>
        </div>
    );
};

export default StaffDashboard;