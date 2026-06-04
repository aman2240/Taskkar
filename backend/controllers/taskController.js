const Task = require('../models/taskModel');
const mongoose = require('mongoose');

// Get all tasks
const getTasks = async (req, res) => {
    const user_id = req.user._id;
    const { page = 1, limit = 10, search = '' } = req.query;
    
    try {
        const query = { userId: user_id };
        
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        
        const tasks = await Task.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);
        
        const count = await Task.countDocuments(query);
        
        res.status(200).json({
            tasks,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            totalTasks: count
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Get a single task
const getTask = async (req, res) => {
    const user_id = req.user._id;
    
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(404).json({error: 'No such task'})
    }

    const { id } = req.params;
    const task = await Task.findOne({ _id: id, userId: user_id });
    if(!task){
        return res.status(404).json({error: 'No such task'})
    }
    res.status(200).json(task);
}

// Create a new task
const createTask = async (req, res) => {
    const { title, description, priority, status } = req.body;
    const user_id = req.user._id;

    let emptyFields = [];
    if(!title){
        emptyFields.push('title');
    }
    if(!description){
        emptyFields.push('description');
    }
    if(!priority){
        emptyFields.push('priority');
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all required fields', emptyFields});
    }

    try {
        const task = await Task.create({ 
            title, 
            description, 
            priority, 
            status: status || 'pending',
            userId: user_id
        });
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// Update a task
const updateTask = async (req, res) => {
    const { id } = req.params;
    const user_id = req.user._id;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such task'})
    }

    const task = await Task.findOneAndUpdate(
        { _id: id, userId: user_id },
        { ...req.body },
        { new: true }
    )
    
    if(!task){
        return res.status(404).json({error: 'No such task'})
    }
    res.status(200).json(task);
}

// Delete a task
const deleteTask = async (req, res) => {
    const { id } = req.params;
    const user_id = req.user._id;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such task'})
    }

    const task = await Task.findOneAndDelete({ _id: id, userId: user_id });
    if(!task){
        return res.status(404).json({error: 'No such task'})
    }
    res.status(200).json(task);
}

// Mark task as completed
const markTaskCompleted = async (req, res) => {
    const { id } = req.params;
    const user_id = req.user._id;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such task'})
    }

    const task = await Task.findOneAndUpdate(
        { _id: id, userId: user_id }, 
        { status: 'completed' },
        { new: true }
    );
    
    if(!task){
        return res.status(404).json({error: 'No such task'})
    }
    res.status(200).json(task);
}

module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
    markTaskCompleted
}
