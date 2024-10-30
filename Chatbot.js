import React, { useState } from 'react';
import '../styles/Chatbot.css'; // Import CSS for styling

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false); // Control modal visibility
    const [conversation, setConversation] = useState([]); // Store the conversation history
    const [question, setQuestion] = useState('');

    // Toggle chat box visibility
    const toggleChat = () => setIsOpen(!isOpen);

    // Handle form submit and fetch response
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (question.trim() === '') return; // Avoid empty questions

        // Add user's question to conversation
        setConversation((prev) => [...prev, { sender: 'user', text: question }]);

        try {
            const response = await fetch('http://localhost:5000/api/chatbot/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question }),
            });

            const data = await response.json();

            // Add bot's response to conversation
            setConversation((prev) => [...prev, { sender: 'bot', text: data.answer }]);
        } catch (error) {
            console.error('Error fetching the response:', error);
            setConversation((prev) => [...prev, { sender: 'bot', text: 'Sorry, something went wrong.' }]);
        }

        setQuestion(''); // Clear input field
    };

    return (
        <div>
            {/* Floating chat button */}
            <button className="chatbot-button" onClick={toggleChat}>
                💬
            </button>

            {/* Chat box modal */}
            {isOpen && (
                <div className="chatbot-modal">
                    <div className="chatbot-header">
                        <h4>Chatbot</h4>
                        <button onClick={toggleChat}>&times;</button>
                    </div>
                    <div className="chatbot-body">
                        {conversation.map((msg, index) => (
                            <p key={index} className={msg.sender === 'user' ? 'user-msg' : 'bot-msg'}>
                                {msg.text}
                            </p>
                        ))}
                    </div>
                    <form onSubmit={handleSubmit} className="chatbot-form">
                        <input
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Type your question here..."
                            required
                        />
                        <button type="submit">Send</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
