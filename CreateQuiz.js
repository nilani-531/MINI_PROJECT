import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateQuiz = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [topic, setTopic] = useState('');
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [keyword, setKeyword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // New state for success message
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    // Input handlers for all fields
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleKeywordChange = (e) => setKeyword(e.target.value);
    const handleCategoryChange = (e) => setCategory(e.target.value);
    const handleTopicChange = (e) => setTopic(e.target.value);
    const handleQuestionChange = (e) => setCurrentQuestion(e.target.value);
    const handleOptionChange = (e, index) => {
        const updatedOptions = [...options];
        updatedOptions[index] = e.target.value;
        setOptions(updatedOptions);
    };
    const handleCorrectAnswerSelect = (e) => setCorrectAnswer(e.target.value);

    // Add the current question to the questions array
    const handleAddQuestion = () => {
        if (currentQuestion && options.every(opt => opt) && correctAnswer) {
            const newQuestion = {
                questionText: currentQuestion,
                options,
                correctAnswer
            };
            console.log('Adding new question:', newQuestion);
            setQuestions([...questions, newQuestion]);

            // Reset fields for the next question
            setCurrentQuestion('');
            setOptions(['', '', '', '']);
            setCorrectAnswer('');
            setErrorMessage('');  // Clear any previous errors

            // Go back to the step for adding a new question
            setStep(5);
        } else {
            setErrorMessage('Please fill in all fields for the question and options.');
        }
    };

    // Save the quiz to the backend
    const handleCreateQuiz = async () => {
        if (questions.length === 0) {
            setErrorMessage('Please add at least one question before creating the quiz.');
            return;
        }

        const newQuiz = {
            title,
            categoryName: category,
            topicName: topic,
            questions,  // Questions array should be populated here
            keyword,
            createdBy: localStorage.getItem('userId')  // Assuming userId is stored in localStorage
        };

        console.log('Submitting quiz:', newQuiz);

        if (!title || !category || !topic || !keyword) {
            setErrorMessage('All fields are required: title, categoryName, topicName, keyword, and at least one question.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/staff-quizzes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newQuiz),
            });

            if (response.ok) {
                setSuccessMessage('Quiz created successfully!');
                setTimeout(() => {
                    navigate('/staff-dashboard');  // Redirect after 3 seconds
                }, 3000);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message);
            }
        } catch (error) {
            setErrorMessage('An error occurred while creating the quiz. Please try again.');
        }
    };

    return (
        <div className="create-quiz-container">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}  {/* Success message */}

            {step === 1 && (
                <div className="step-1">
                    <h2>Step 1: Enter Quiz Title</h2>
                    <input type="text" value={title} onChange={handleTitleChange} placeholder="Title" required />
                    <button onClick={() => setStep(2)}>Next</button>
                </div>
            )}

            {step === 2 && (
                <div className="step-2">
                    <h2>Step 2: Enter Quiz Keyword (Unique)</h2>
                    <input type="text" value={keyword} onChange={handleKeywordChange} placeholder="Keyword (e.g., MAT1)" required />
                    <button onClick={() => setStep(3)}>Next</button>
                </div>
            )}

            {step === 3 && (
                <div className="step-3">
                    <h2>Step 3: Enter Quiz Category</h2>
                    <input type="text" value={category} onChange={handleCategoryChange} placeholder="Category" required />
                    <button onClick={() => setStep(4)}>Next</button>
                </div>
            )}

            {step === 4 && (
                <div className="step-4">
                    <h2>Step 4: Enter Quiz Topic</h2>
                    <input type="text" value={topic} onChange={handleTopicChange} placeholder="Topic" required />
                    <button onClick={() => setStep(5)}>Next</button>
                </div>
            )}

            {step === 5 && (
                <div className="step-5">
                    <h2>Step 5: Enter Question</h2>
                    <input type="text" value={currentQuestion} onChange={handleQuestionChange} placeholder="Question" required />
                    <button onClick={() => setStep(6)}>Next</button>
                </div>
            )}

            {step === 6 && (
                <div className="step-6">
                    <h2>Step 6: Enter Options</h2>
                    {options.map((option, index) => (
                        <input key={index} type="text" value={option} onChange={(e) => handleOptionChange(e, index)} placeholder={`Option ${index + 1}`} required />
                    ))}
                    <button onClick={() => setStep(7)}>Next</button>
                </div>
            )}

            {step === 7 && (
                <div className="step-7">
                    <h2>Step 7: Select Correct Answer</h2>
                    {options.map((option, index) => (
                        <div key={index}>
                            <input type="radio" name="correct-answer" value={option} checked={correctAnswer === option} onChange={handleCorrectAnswerSelect} />
                            <label>{option}</label>
                        </div>
                    ))}
                    <button onClick={handleAddQuestion}>Add Question</button>
                    <button onClick={handleCreateQuiz}>Create Quiz</button>
                </div>
            )}
        </div>
    );
};

export default CreateQuiz;

{/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateQuiz = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [topic, setTopic] = useState('');
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [keyword, setKeyword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // New state for success message
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    // Input handlers for all fields
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleKeywordChange = (e) => setKeyword(e.target.value);
    const handleCategoryChange = (e) => setCategory(e.target.value);
    const handleTopicChange = (e) => setTopic(e.target.value);
    const handleQuestionChange = (e) => setCurrentQuestion(e.target.value);
    const handleOptionChange = (e, index) => {
        const updatedOptions = [...options];
        updatedOptions[index] = e.target.value;
        setOptions(updatedOptions);
    };
    const handleCorrectAnswerSelect = (e) => setCorrectAnswer(e.target.value);

    // Add the current question to the questions array
    const handleAddQuestion = () => {
        if (currentQuestion && options.every(opt => opt) && correctAnswer) {
            const newQuestion = {
                questionText: currentQuestion,
                options,
                correctAnswer
            };
            console.log('Adding new question:', newQuestion);
            setQuestions([...questions, newQuestion]);

            // Reset fields for the next question
            setCurrentQuestion('');
            setOptions(['', '', '', '']);
            setCorrectAnswer('');
            setErrorMessage('');  // Clear any previous errors

            // Go back to the step for adding a new question
            setStep(5);
        } else {
            setErrorMessage('Please fill in all fields for the question and options.');
        }
    };

    

    
    // Save the quiz to the backend
const handleCreateQuiz = async () => {
    // Ensure the questions state is fully updated
    if (!questions) {
        setErrorMessage('Please add at least one question before creating the quiz.');
        return;
    }

    const newQuiz = {
        title,
        categoryName: category,
        topicName: topic,
        questions,  // Questions array should now contain at least one question
        keyword,
        createdBy: localStorage.getItem('userId')  // Assuming userId is stored in localStorage
    };

    console.log('Submitting quiz:', newQuiz);

    if (!title || !category || !topic || !keyword) {
        setErrorMessage('All fields are required: title, categoryName, topicName, keyword, and at least one question.');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/staff-quizzes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newQuiz),
        });

        if (response.ok) {
            setSuccessMessage('Quiz created successfully!');
            setTimeout(() => {
                navigate('/staff-dashboard');  // Redirect after 3 seconds
            }, 5000);
        } else {
            const errorData = await response.json();
            setErrorMessage(errorData.message);
        }
    } catch (error) {
        setErrorMessage('An error occurred while creating the quiz. Please try again.');
    }
};

        

    return (
        <div className="create-quiz-container">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}  

            {step === 1 && (
                <div className="step-1">
                    <h2>Step 1: Enter Quiz Title</h2>
                    <input type="text" value={title} onChange={handleTitleChange} placeholder="Title" required />
                    <button onClick={() => setStep(2)}>Next</button>
                </div>
            )}

            {step === 2 && (
                <div className="step-2">
                    <h2>Step 2: Enter Quiz Keyword (Unique)</h2>
                    <input type="text" value={keyword} onChange={handleKeywordChange} placeholder="Keyword (e.g., MAT1)" required />
                    <button onClick={() => setStep(3)}>Next</button>
                </div>
            )}

            {step === 3 && (
                <div className="step-3">
                    <h2>Step 3: Enter Quiz Category</h2>
                    <input type="text" value={category} onChange={handleCategoryChange} placeholder="Category" required />
                    <button onClick={() => setStep(4)}>Next</button>
                </div>
            )}

            {step === 4 && (
                <div className="step-4">
                    <h2>Step 4: Enter Quiz Topic</h2>
                    <input type="text" value={topic} onChange={handleTopicChange} placeholder="Topic" required />
                    <button onClick={() => setStep(5)}>Next</button>
                </div>
            )}

            {step === 5 && (
                <div className="step-5">
                    <h2>Step 5: Enter Question</h2>
                    <input type="text" value={currentQuestion} onChange={handleQuestionChange} placeholder="Question" required />
                    <button onClick={() => setStep(6)}>Next</button>
                </div>
            )}

            {step === 6 && (
                <div className="step-6">
                    <h2>Step 6: Enter Options</h2>
                    {options.map((option, index) => (
                        <input key={index} type="text" value={option} onChange={(e) => handleOptionChange(e, index)} placeholder={`Option ${index + 1}`} required />
                    ))}
                    <button onClick={() => setStep(7)}>Next</button>
                </div>
            )}

            {step === 7 && (
                <div className="step-7">
                    <h2>Step 7: Select Correct Answer</h2>
                    {options.map((option, index) => (
                        <div key={index}>
                            <input type="radio" name="correct-answer" value={option} checked={correctAnswer === option} onChange={handleCorrectAnswerSelect} />
                            <label>{option}</label>
                        </div>
                    ))}
                    <button onClick={handleAddQuestion}>Add Question</button>
                    <button onClick={handleCreateQuiz}>Create Quiz</button>
                </div>
            )}
        </div>
    );
};

export default CreateQuiz;
*/}