import React, { useEffect, useState } from 'react';
import { fetchQuizzes } from '../services/quizService'; // Import service to fetch quizzes
import { useNavigate } from 'react-router-dom';

const TakeQuiz = () => {
    const [categories, setCategories] = useState([]); // State to hold quiz categories
    const [topics, setTopics] = useState([]); // State to hold topics for selected category
    const [loading, setLoading] = useState(true); // Loading state
    const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
    const navigate = useNavigate();

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const quizzes = await fetchQuizzes(); // Fetch all quizzes
                console.log('Fetched quizzes:', quizzes); // Log fetched quizzes

                // Extract unique categories and corresponding topics from quizzes
                const uniqueCategories = [];
                quizzes.forEach(quiz => {
                    quiz.categories.forEach(category => {
                        if (!uniqueCategories.find(c => c.categoryName === category.categoryName)) {
                            uniqueCategories.push({ 
                                categoryName: category.categoryName, 
                                topics: category.topics 
                            });
                        }
                    });
                });

                setCategories(uniqueCategories); // Update state with unique categories
            } catch (error) {
                console.error('Error fetching quiz categories:', error);
            } finally {
                setLoading(false); // Set loading to false after fetch
            }
        };

        loadCategories();
    }, []);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category); // Set the selected category
        setTopics(category.topics); // Set topics for the selected category
    };

    const handleTopicClick = (topic) => {
        // Redirect to terms and conditions page with selected topic
        navigate(`/terms-and-conditions/${topic.topicName}`);
    };

    return (
        <div className="quiz-category-container">
            <h1>Select a Quiz Category</h1>
            {loading ? (
                <p>Loading categories...</p> // Show loading state
            ) : (
                <div>
                    {!selectedCategory ? (
                        <div className="quiz-categories">
                            {categories.length === 0 ? (
                                <p>No categories available.</p> // Show message if no categories found
                            ) : (
                                categories.map((category, index) => (
                                    <button 
                                        key={index} 
                                        onClick={() => handleCategoryClick(category)}
                                        className="category-button"
                                    >
                                        {category.categoryName} {/* Button for each category */}
                                    </button>
                                ))
                            )}
                        </div>
                    ) : (
                        <div>
                            <h2>Topics in {selectedCategory.categoryName}</h2>
                            <div className="quiz-topics">
                                {topics.length === 0 ? (
                                    <p>No topics available in this category.</p>
                                ) : (
                                    topics.map((topic, index) => (
                                        <button 
                                            key={index} 
                                            onClick={() => handleTopicClick(topic)}
                                            className="topic-button"
                                        >
                                            {topic.topicName} {/* Button for each topic */}
                                        </button>
                                    ))
                                )}
                            </div>
                            <button onClick={() => setSelectedCategory(null)}>Back to Categories</button> {/* Back button */}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TakeQuiz;
