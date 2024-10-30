// routes/chatbot.js
const express = require('express');
const router = express.Router();

// Example data for chatbot responses
const chatData = require('../components/ChatQuestions.json'); // Adjust the path if necessary

router.post('/ask', (req, res) => {
    const question = req.body.question;

    // Example logic to find an answer based on the question
    const answerObj = chatData.find(item => item.question === question);

    if (answerObj) {
        res.json({ answer: answerObj.answer });
    } else {
        res.json({ answer: "I'm sorry, I don't have an answer for that." });
    }
});



module.exports = router;
