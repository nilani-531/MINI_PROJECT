// routes/staffQuiz.js
const express = require('express');
const StaffQuiz = require('../models/StaffQuiz');
const router = express.Router();
const mongoose = require('mongoose'); // Importing mongoose, though it's not needed here

// Create a new staff quiz
router.post('/', async (req, res) => {
    console.log('Received request:', req.body);  // Log the request body

    const { title, categoryName, topicName, questions, keyword, createdBy } = req.body;

    // Validate: Ensure all fields are provided
    if (!title || !categoryName || !topicName || !questions || !keyword || !createdBy) {
        return res.status(400).json({ message: 'All fields are required: title, categoryName, topicName, questions, keyword, and createdBy.' });
    }

    try {
        // Create a new quiz
        const newStaffQuiz = new StaffQuiz({
            title,
            categoryName,  // Single category
            topicName,     // Single topic
            questions,     // Array of questions
            keyword,
            createdBy      // Assuming the createdBy is passed as userId (staff ID)
        });

        await newStaffQuiz.save(); // Save to the database
        res.status(201).json(newStaffQuiz); // Return the created quiz
    } catch (error) {
        console.error('Error creating staff quiz:', error);
        res.status(500).json({ message: 'Error creating staff quiz', error: error.message });
    }
});

// Route to get a quiz by keyword
router.get('/:keyword', async (req, res) => {
    try {
        const quiz = await StaffQuiz.findOne({ keyword: req.params.keyword });
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving quiz', error: error.message });
    }
});

// Fetch quizzes created by the authenticated staff user
router.get('/', async (req, res) => {
    try {
        const userId = req.user._id; // Assuming you have middleware to set req.user
        const quizzes = await StaffQuiz.find({ createdBy: userId }); // Fetch quizzes for this user
        res.status(200).json(quizzes);
    } catch (error) {
        console.error('Error fetching staff quizzes:', error);
        res.status(500).json({ message: 'Error fetching staff quizzes', error: error.message });
    }
});

module.exports = router;
