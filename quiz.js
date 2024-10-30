const express = require('express');
const Quiz = require('../models/Quiz'); // Ensure this path is correct
const router = express.Router(); // Initialize the router

// Create a new quiz
router.post('/', async (req, res) => {
    const { title, categories, createdBy } = req.body; // Adjusted to include categories

    try {
        const newQuiz = new Quiz({ title, categories, createdBy }); // Save categories
        await newQuiz.save();
        res.status(201).json(newQuiz);
    } catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({ message: 'Error creating quiz', error: error.message });
    }
});

// Get all quizzes
router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate('createdBy', 'name email');
        res.status(200).json(quizzes);
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ message: 'Error fetching quizzes', error: error.message });
    }
});

// Get a specific quiz by ID
router.get('/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        res.status(200).json(quiz);
    } catch (error) {
        console.error('Error fetching quiz:', error);
        res.status(500).json({ message: 'Error fetching quiz', error: error.message });
    }
});

// Get random questions from a specific topic
router.get('/random-questions/:topicId', async (req, res) => {
    const { topicId } = req.params; // Get the topicId from the request parameters
    const numberOfQuestions = 5; // Specify how many questions you want to return

    try {
        // Fetch all quizzes and their corresponding questions
        const quizzes = await Quiz.find().populate('createdBy', 'name email');
        
        // Flatten the questions and filter by topicId
        const questions = quizzes.flatMap(quiz => 
            quiz.categories.flatMap(category =>
                category.topics.flatMap(topic =>
                    topic.topicName === topicId ? topic.questions : []
                )
            )
        );

        // Shuffle and select a random set of questions
        const shuffledQuestions = questions.sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffledQuestions.slice(0, numberOfQuestions);

        // Send the selected questions as the response
        res.status(200).json(selectedQuestions);
    } catch (error) {
        console.error('Error fetching random questions:', error);
        res.status(500).json({ message: 'Error fetching random questions', error: error.message });
    }
});

// Export the router
module.exports = router;
