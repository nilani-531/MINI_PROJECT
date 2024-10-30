// src/components/StudentDashboard.js

import React, { useState, useEffect } from 'react';
import { fetchQuizzesByKeyword, getQuizResults } from '../services/quizService'; // fetchQuizByKeyword is added for search functionality
import { getUserDetails } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import Chatbot from './Chatbot'; // Import the Chatbot component
import chatbotIcon from '../components/chatbot.jpeg'; // Import the chatbot image

const StudentDashboard = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [results, setResults] = useState([]);
    const { name: userName, role: userRole } = getUserDetails();
    const [keyword, setKeyword] = useState('');
    const [quizData, setQuizData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // For navigating after successful search
    const [showChatbot, setShowChatbot] = useState(false); // State to toggle chatbot

    // Handle search keyword input
    const handleKeywordChange = (e) => setKeyword(e.target.value);

    // Fetch the quiz by keyword
    const handleSearchQuiz = async () => {
        try {
            if (keyword.trim() === '') {
                setErrorMessage('Please enter a valid keyword');
                return;
            }
            const result = await fetchQuizzesByKeyword(keyword);
            setQuizData(result); // Set quiz data if the quiz is found
            setErrorMessage(''); // Clear error message if successful
        } catch (error) {
            console.error('Error fetching quiz:', error);
            setErrorMessage('Invalid keyword. Please try again.');
            setQuizData(null); // Clear quiz data if the search fails
        }
    };

    // Navigate to the start quiz page
    const handleStartQuiz = () => {
        if (quizData) {
            navigate(`/start-quiz/${quizData.keyword}`);
        }
    };

    useEffect(() => {
        // Fetch the student's quiz results
        const fetchResults = async () => {
            try {
                const userId = localStorage.getItem('userId'); // Ensure userId is in localStorage
                const fetchedResults = await getQuizResults(userId);
                setResults(fetchedResults);
            } catch (error) {
                console.error('Error fetching quiz results:', error);
            }
        };
        fetchResults();
    }, []);
    const handleChatbotClick = () => {
        setShowChatbot(!showChatbot); // Toggle the chatbot visibility on image click
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Welcome, {userName || 'Student'}!</h1>
                <h2>Role: {userRole || 'Role not defined'}</h2>
            </div>

            {/* Search Bar for Quiz */}
            <div className="search-quiz-container">
                <h2>Search for a Quiz</h2>
                <input
                    type="text"
                    placeholder="Enter quiz keyword"
                    value={keyword}
                    onChange={handleKeywordChange}
                />
                <button onClick={handleSearchQuiz}>Search Quiz</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>

            {/* Display Quiz Data if Found */}
            {quizData && (
                <div className="quiz-data">
                    <h2>Quiz Found: {quizData.title}</h2>
                    <p>Category: {quizData.categoryName}</p>
                    <p>Topic: {quizData.topicName}</p>
                    <p>Keyword: {quizData.keyword}</p>
                    <button onClick={handleStartQuiz}>Start Quiz</button>
                </div>
            )}
<img
                src={chatbotIcon}
                alt="Chatbot"
                onClick={handleChatbotClick}
                style={{ cursor: 'pointer', width: '50px', height: '50px' }} // Style the image
            />
            {showChatbot && <Chatbot />} {/* Conditionally render the Chatbot */}
            {/* Quiz Results Section */}
            <div className="quiz-results">
                <h2>Your Quiz Results</h2>
                {results.length === 0 ? (
                    <p>No quiz results found.</p>
                ) : (
                    results.map(result => {
                        const quizDate = new Date(result.completedAt); // Create a Date object from completedAt
                        const formattedDate = quizDate.toLocaleDateString('en-US'); // Format the date

                        return (
                            <div key={result._id} className="result-item">
                                <h3>Topic: {result.topicName}</h3>
                                <p>Score: {result.score}/{result.totalQuestions}</p>
                                <p>Date: {formattedDate}</p>
                            </div>
                        );
                    })
                )}
            </div>

            <div className="take-quiz-container">
                <Link to="/take-quiz" className="take-quiz-button">
                    <button className="btn">Take Quiz</button>
                </Link>
            </div>
        </div>
    );
};

export default StudentDashboard;
