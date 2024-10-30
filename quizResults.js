const express = require('express');
const QuizResult = require('../models/QuizResult');
const router = express.Router();

// Submit a quiz result
router.post('/', async (req, res) => {
    const { userId, score, topicName, totalQuestions } = req.body; // Added topicName and totalQuestions

    try {
        // Validate that userId and score are provided
        if (!userId || typeof score === 'undefined') {
            return res.status(400).json({ message: 'userId and score are required.' });
        }

        // Create a new quiz result
        const newResult = new QuizResult({ userId, score, topicName, totalQuestions });
        await newResult.save();

        // Send the newly created quiz result as a response
        res.status(201).json(newResult);
    } catch (error) {
        console.error('Error submitting quiz result:', error);
        res.status(500).json({ message: 'Error submitting quiz result', error: error.message });
    }
});

// Get quiz results for a specific user
router.get('/:userId', async (req, res) => {
    try {
        // Find all results for the specific user
        const results = await QuizResult.find({ userId: req.params.userId });

        // If no results are found, return a 404
        if (!results.length) {
            return res.status(404).json({ message: 'No quiz results found for this user.' });
        }

        // Send the quiz results as a response
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching quiz results:', error);
        res.status(500).json({ message: 'Error fetching quiz results', error: error.message });
    }
});

module.exports = router;
