const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({ message: 'Todo text is required' });
    }

    const todo = new Todo({
      text,
      userId: req.userId
    });

    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, userId: req.userId });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await Todo.deleteOne({ _id: req.params.id });
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.patch('/:id', auth, async (req, res) => {
  try {
    const { completed } = req.body;
    const todo = await Todo.findOne({ _id: req.params.id, userId: req.userId });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todo.completed = completed;
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
