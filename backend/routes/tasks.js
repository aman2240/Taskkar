const express = require('express');
const { createTask, getTasks, getTask, updateTask, deleteTask, markTaskCompleted } = require('../controllers/taskController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Require auth for all task routes
router.use(requireAuth);

// Get all tasks
router.get('/', getTasks);

// Get a single task
router.get('/:id', getTask);

// Create a new task
router.post('/', createTask);

// Update a task
router.patch('/:id', updateTask);

// Delete a task
router.delete('/:id', deleteTask);

// Mark task as completed
router.patch('/:id/complete', markTaskCompleted);

module.exports = router;
