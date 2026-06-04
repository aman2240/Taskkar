const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Static method for signup
userSchema.statics.signup = async function(name, email, password) {
    if (!name || !email || !password) {
        throw Error('All fields must be filled');
    }
    
    const exists = await this.findOne({ email });
    if (exists) {
        throw Error('Email already in use');
    }
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    
    const user = await this.create({ name, email, password: hash });
    return user;
};

// Static method for login
userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled');
    }
    
    const user = await this.findOne({ email });
    if (!user) {
        throw Error('Incorrect email or password');
    }
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error('Incorrect email or password');
    }
    
    return user;
};

module.exports = mongoose.model('User', userSchema);
