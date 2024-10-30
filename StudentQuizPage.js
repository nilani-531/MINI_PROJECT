import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchQuizByKeyword, saveQuizResult } from '../services/studentQuizService';  // New service

const StudentQuizPage = () => {
    const { keyword } = useParams();  // Get the keyword from the URL
    const [quiz, setQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loadQuiz = async () => {
            try {
                const fetchedQuiz = await fetchQuizByKeyword(keyword);
                setQuiz(fetchedQuiz);
            } catch (error) {
                console.error('Error fetching quiz:', error);
            }
        };
        loadQuiz();
    }, [keyword]);

    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleNextQuestion = () => {
        if (selectedAnswer === quiz.questions[currentQuestionIndex].correctAnswer) {
            setScore(score + 1);
        }
        setSelectedAnswer('');
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handleSubmitQuiz = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const quizResult = {
                userId,
                topicName: keyword,
                score,
                totalQuestions: quiz.questions.length,
                date: new Date().toISOString(),
            };

            await saveQuizResult(quizResult);
            setQuizCompleted(true);
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    if (quizCompleted) {
        return (
            <div className="quiz-result">
                <h2>Quiz Completed!</h2>
                <p>Your score: {score} out of {quiz.questions.length}</p>
                <button onClick={() => navigate('/student-dashboard')}>Go to Dashboard</button>
            </div>
        );
    }

    return (
        <div className="quiz-container">
            {quiz ? (
                <>
                    <h1>Quiz: {quiz.title}</h1>
                    {currentQuestionIndex < quiz.questions.length ? (
                        <div className="question-section">
                            <h2>{quiz.questions[currentQuestionIndex].questionText}</h2>
                            <div className="options">
                                {quiz.questions[currentQuestionIndex].options.map((option, index) => (
                                    <div key={index}>
                                        <input
                                            type="radio"
                                            value={option}
                                            checked={selectedAnswer === option}
                                            onChange={() => handleAnswerSelect(option)}
                                        />
                                        <label>{option}</label>
                                    </div>
                                ))}
                            </div>
                            <button
                                disabled={!selectedAnswer}
                                onClick={currentQuestionIndex < quiz.questions.length - 1 ? handleNextQuestion : handleSubmitQuiz}
                            >
                                {currentQuestionIndex < quiz.questions.length - 1 ? 'Next' : 'Submit'}
                            </button>
                        </div>
                    ) : null}
                </>
            ) : (
                <p>Loading quiz...</p>
            )}
        </div>
    );
};

export default StudentQuizPage;
