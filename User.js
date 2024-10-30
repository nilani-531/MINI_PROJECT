const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure emails are unique
        lowercase: true // Save emails as lowercase
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['student', 'staff'], // Restrict roles to student or staff
        required: true, // Ensure role is provided
    },
});

// Create User model
const User = mongoose.model('User', UserSchema);

module.exports = User;
