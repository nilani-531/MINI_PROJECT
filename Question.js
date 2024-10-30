const mongoose = require('mongoose');

// Define the schema for individual questions
const QuestionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: { type: [String], required: true }, // Array of strings for options
    correctAnswer: { type: String, required: true },
});

// Define the schema for topics
const TopicSchema = new mongoose.Schema({
    topicName: { type: String, required: true },
    questions: [QuestionSchema],  // Array of questions for the topic
});

// Define the schema for categories
const CategorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true },
    topics: [TopicSchema],  // Array of topics under this category
});

// Main schema to hold all categories
const QuizSchema = new mongoose.Schema({
    categories: [CategorySchema],  // Array of categories
});

// Create model
const Quiz = mongoose.model('Quiz', QuizSchema);
module.exports = Quiz;
