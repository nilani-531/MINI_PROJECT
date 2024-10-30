// models/StaffQuiz.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }], // Array of options
    correctAnswer: { type: String, required: true } // Correct answer
});

const staffQuizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    categoryName: { type: String, required: true }, // Only one category
    topicName: { type: String, required: true },    // Only one topic
    questions: [questionSchema],                    // Array of questions
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the staff user
    keyword: { type: String, required: true, unique: true }, // Unique keyword for student access
    createdAt: { type: Date, default: Date.now }
});

const StaffQuiz = mongoose.model('StaffQuiz', staffQuizSchema);
module.exports = StaffQuiz;
