import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Signup from './components/Signup';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import StaffDashboard from './components/StaffDashboard';
import TakeQuiz from './components/TakeQuiz';
import TermsAndConditions from './components/TermsAndConditions';
import QuizPage from './components/QuizPage';
import CreateQuiz from './components/CreateQuiz';
import StudentQuizPage from './components/StudentQuizPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/staff-dashboard" element={<StaffDashboard />} />
                <Route path="/take-quiz" element={<TakeQuiz />} />
                <Route path="/terms-and-conditions/:topicName" element={<TermsAndConditions />} />
                <Route path="/create-quiz" element={<CreateQuiz />} />

                {/* Place the more specific route first */}
                <Route path="/start-quiz/:keyword" element={<StudentQuizPage />} />
                <Route path="/start-quiz/:topicName" element={<QuizPage />} />
            </Routes>
        </Router>
    );
};

export default App;
