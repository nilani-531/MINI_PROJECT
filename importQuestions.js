const mongoose = require('mongoose');
const fs = require('fs');
const Quiz = require('./models/Question');  // Ensure the correct path to Question.js
require('dotenv').config();  // Load environment variables

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

const importQuestions = async () => {
    try {
        // Read the JSON file
        const quizData = fs.readFileSync('quiz.json', 'utf8');  // Correct the file path if necessary
        const quiz = JSON.parse(quizData);  // Parse the JSON data

        console.log(quiz); // Log to inspect the structure

        // Insert the quiz into the database
        await Quiz.create(quiz);  // Adjust this line to insert the full structure
        console.log('Questions successfully imported!');
    } catch (error) {
        console.error('Error importing questions:', error);
    } finally {
        mongoose.connection.close(); // Close the database connection
    }
};

importQuestions();
