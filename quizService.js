const API_URL = 'http://localhost:5000/api';  // Ensure this is correct


// Function to fetch quizzes (fetching all available quizzes)
export const fetchQuizzes = async () => {
    try {
        const response = await fetch(`${API_URL}/quizzes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();  // Capture error response
            console.error('Error fetching quizzes:', errorText);
            throw new Error(`Error fetching quizzes: ${response.status} ${errorText}`);
        }

        return await response.json();  // Return the parsed data
    } catch (error) {
        console.error('Error in fetchQuizzes:', error.message);
        throw error;  // Re-throw error to be caught in the component
    }
};

// Function to fetch random questions based on a specific topic
export const fetchRandomQuestions = async (topic) => {
    try {
        const response = await fetch(`${API_URL}/quizzes/random-questions/${topic}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching random questions');
        }

        return await response.json();  // Return the fetched random questions
    } catch (error) {
        console.error('Error in fetchRandomQuestions:', error.message);
        throw error;
    }
};

// Function to save quiz results to the database
export const saveQuizResult = async (quizResult) => {
    try {
        const response = await fetch(`${API_URL}/quiz-results`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(quizResult),  // Convert quiz result to JSON for submission
        });

        if (!response.ok) {
            const errorText = await response.text();  // Capture error response
            throw new Error(`Error saving quiz result: ${errorText}`);
        }

        return await response.json();  // Return saved result
    } catch (error) {
        console.error('Error in saveQuizResult:', error.message);
        throw error;
    }
};

// Function to fetch quiz results for a specific user (student or staff)
export const getQuizResults = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/quiz-results/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching quiz results');
        }

        return await response.json();  // Return fetched quiz results
    } catch (error) {
        console.error('Error in getQuizResults:', error.message);
        throw error;
    }
};
// Function to fetch quizzes created by a specific staff member
export const fetchStaffCreatedQuizzes = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/staff-quizzes?createdBy=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching staff-created quizzes');
        }

        return await response.json();
    } catch (error) {
        console.error('Error in fetchStaffCreatedQuizzes:', error.message);
        throw error;
    }
};




// Function to fetch quizzes by keyword
export const fetchQuizzesByKeyword = async (keyword) => {
    try {
        const response = await fetch(`${API_URL}/staff-quizzes/${keyword}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching quizzes');
        }

        const quizData = await response.json();
        console.log('Response from backend:', quizData); // Add log
        return quizData; // Return the fetched quiz
    } catch (error) {
        console.error('Error in fetchQuizzesByKeyword:', error.message);
        throw error; // Re-throw error to be caught in the component
    }
};