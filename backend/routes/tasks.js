const express = require('express');
const Task = require('../models/Task');
const router = express.Router();


const jwt = require('jsonwebtoken');


const authenticateJWT = (req, res, next) => {
    const authHeader = req.header('Authorization');
  
    if (!authHeader) {
      return res.status(403).json({ message: 'Access denied. No token provided.' });
    }
  
    const token = authHeader.split(' ')[1]; 
  
    jwt.verify(token, 'secretkey', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token.' });
      }
      req.user = decoded; 
      next();
    });
};

// Create Task
router.post('/', authenticateJWT, async (req, res) => {
  const { title, description } = req.body;
  const newTask = new Task({ title, description, user: req.user.id });
  await newTask.save();
  res.status(201).json(newTask);
});

// Read Tasks
router.get('/', authenticateJWT, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
});

// Update Task
router.put('/:id', authenticateJWT, async (req, res) => {
  const { title, description, status } = req.body;
  const task = await Task.findByIdAndUpdate(req.params.id, { title, description, status, updatedAt: Date.now() }, { new: true });
  res.json(task);
});

// Delete Task
router.delete('/:id', authenticateJWT, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

module.exports = router;