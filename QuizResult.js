const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to User model
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    topicName: {
        type: String,  // Store the name of the quiz topic
        required: true
    },
    totalQuestions: {
        type: Number,  // Total number of questions in the quiz
        required: true
    },
    completedAt: {
        type: Date,
        default: Date.now,
        required:true
    }
});

const QuizResult = mongoose.model('QuizResult', quizResultSchema);
module.exports = QuizResult;
