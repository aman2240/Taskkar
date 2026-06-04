const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        
        res.status(200).json({ 
            email: user.email, 
            name: user.name,
            token 
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Signup user
const signupUser = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        const user = await User.signup(name, email, password);
        const token = createToken(user._id);
        
        res.status(200).json({ 
            email: user.email, 
            name: user.name,
            token 
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { loginUser, signupUser };
