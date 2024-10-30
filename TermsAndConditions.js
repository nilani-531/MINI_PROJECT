import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/styles.css'; // Assuming you have a CSS file

const TermsAndConditions = () => {
    const navigate = useNavigate();
    const { topicName } = useParams();  // Get topicName from URL

    const handleStartQuiz = () => {
        // Redirect to the quiz questions page with the selected topicName
        navigate(`/start-quiz/${topicName}`);
    };

    return (
        <div className="terms-conditions-container">
            <h1>Terms and Conditions</h1>
            <p>Please read and accept the terms and conditions before starting the quiz.</p>
            <ul>
                <li>Each quiz will be timed.</li>
                <li>Once started, the quiz cannot be paused.</li>
                <li>You must select one answer for each question.</li>
                <li>Your score will be calculated based on correct answers.</li>
            </ul>
            <button className="start-quiz-button" onClick={handleStartQuiz}>Start Quiz</button>  {/* Button to start quiz */}
        </div>
    );
};

export default TermsAndConditions;
