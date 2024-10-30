import React, { useEffect, useState } from 'react';
import { fetchRandomQuestions, saveQuizResult } from '../services/quizService';
import { useParams, useNavigate } from 'react-router-dom';  // Import useNavigate

const QuizPage = () => {
    const { topicName } = useParams();  // Get the topic name from the URL
    const navigate = useNavigate();  // Initialize navigate for navigation
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const fetchedQuestions = await fetchRandomQuestions(topicName);
                setQuestions(fetchedQuestions);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
        loadQuestions();
    }, [topicName]);

    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleNextQuestion = () => {
        if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
            setScore(score + 1);
        }
        setSelectedAnswer('');
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handleSubmitQuiz = async () => {
        try {
            const userId = localStorage.getItem('userId');  // Retrieve userId from localStorage

            if (!userId) {
                throw new Error("User ID is missing");
            }

            const resultData = {
                userId,
                topicName,
                score,
                totalQuestions: questions.length,
                date: new Date().toISOString(),
            };

            await saveQuizResult(resultData);  // Save quiz result
            setQuizCompleted(true);  // Set quiz as completed
        } catch (error) {
            console.error('Error submitting quiz result:', error);
        }
    };

    // If quiz is completed, show the results
    if (quizCompleted) {
        return (
            <div className="quiz-result">
                <h2>Quiz Completed!</h2>
                <p>
                    Your score is: <strong>{score}</strong> out of{' '}
                    <strong>{questions.length}</strong>.
                </p>
                {score < questions.length / 2 ? (
                    <p>Oops! You might want to review the material and try again.</p>
                ) : (
                    <p>Great job! You did well.</p>
                )}
                {/* Button to navigate back to the dashboard */}
                <button onClick={() => {
                    const userType = localStorage.getItem('userType'); // Assuming userType is stored in localStorage
                    if (userType === 'staff') {
                        navigate('/staffdashboard'); // Navigate to StaffDashboard
                    } else if (userType === 'student') {
                        navigate('/studentdashboard'); // Navigate to StudentDashboard
                    }
                }}>
                    Go to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="quiz-container">
            <h1>Quiz: {topicName}</h1>
            {questions.length > 0 ? (
                currentQuestionIndex < questions.length ? (
                    <div className="question-container">
                        <h2>{questions[currentQuestionIndex].questionText}</h2>
                        <div className="options">
                            {questions[currentQuestionIndex].options.map((option, index) => (
                                <div key={index} className="option-item">
                                    <input
                                        type="radio"
                                        id={`option-${index}`}
                                        name="quiz-answer"
                                        value={option}
                                        checked={selectedAnswer === option}
                                        onChange={() => handleAnswerSelect(option)}
                                    />
                                    <label htmlFor={`option-${index}`}>{option}</label>
                                </div>
                            ))}
                        </div>
                        <div className="quiz-controls">
                            {currentQuestionIndex < questions.length - 1 ? (
                                <button
                                    onClick={handleNextQuestion}
                                    disabled={!selectedAnswer}
                                >
                                    Next Question
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmitQuiz}
                                    disabled={!selectedAnswer}
                                >
                                    Submit Quiz
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <button onClick={handleSubmitQuiz}>Submit Quiz</button>
                )
            ) : (
                <p>Loading questions...</p>
            )}
        </div>
    );
};

export default QuizPage;
