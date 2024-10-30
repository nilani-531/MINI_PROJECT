import axios from 'axios';

export const sendQuestion = async (question) => {
    const response = await axios.post('http://localhost:5000/chatbot', { question }); // Adjust the URL if needed
    return response;
};
