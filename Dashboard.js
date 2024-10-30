import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StaffDashboard from './StaffDashboard';
import StudentDashboard from './StudentDashboard';
import { getUserRole } from '../services/authService';  // Assuming this fetches from localStorage

const Dashboard = () => {
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const role = await getUserRole();  // Fetch the user's role (from localStorage or API)
                if (!role) {
                    throw new Error('User role not found');
                }
                setRole(role);
            } catch (error) {
                console.error('Error fetching user role:', error);
                navigate('/login');  // Redirect to login if there's an issue
            }
        };
        fetchUserRole();
    }, [navigate]);

    return (
        <div>
            {role === 'staff' ? <StaffDashboard /> : <StudentDashboard />}
        </div>
    );
};

export default Dashboard;
