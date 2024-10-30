const API_URL = 'http://localhost:5000/api';

// Function to fetch quiz by keyword
export const fetchQuizByKeyword = async (keyword) => {
    try {
        const response = await fetch(`${API_URL}/staff-quizzes/${keyword}`);
        if (!response.ok) {
            throw new Error('Error fetching quiz');
        }
        return await response.json();
    } catch (error) {
        console.error('Error in fetchQuizByKeyword:', error.message);
        throw error;
    }
};

// Function to save quiz results
export const saveQuizResult = async (quizResult) => {
    try {
        const response = await fetch(`${API_URL}/quiz-results`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(quizResult),
        });
        if (!response.ok) {
            throw new Error('Error saving quiz result');
        }
        return await response.json();
    } catch (error) {
        console.error('Error in saveQuizResult:', error.message);
        throw error;
    }
};
