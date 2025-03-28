// backend/controllers/taskController.js
const pool = require('../config/db');

const createTask = async (req, res) => {
  const { title, description, due_date, assigned_to } = req.body;
  const attachment = req.file ? req.file.path : null;
  try {
    const [result] = await pool.query(
      'INSERT INTO tasks (title, description, due_date, attachment, assigned_to, status, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())',
      [title, description, due_date, attachment, assigned_to, 'assigned', req.user.id]
    );
    res.status(201).json({ message: 'Task created', taskId: result.insertId });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const getTasks = async (req, res) => {
  let query = 'SELECT * FROM tasks';
  let params = [];
  // If faculty, only show tasks assigned to them
  if (req.user.role === 'faculty') {
    query += ' WHERE assigned_to = ?';
    params.push(req.user.id);
  }
  try {
    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const markTaskComplete = async (req, res) => {
  const { taskId } = req.params;
  const attachment = req.file ? req.file.path : null;
  try {
    await pool.query(
      'UPDATE tasks SET status = ?, completed_at = NOW(), attachment = ? WHERE id = ? AND assigned_to = ?',
      ['completed', attachment, taskId, req.user.id]
    );
    res.json({ message: 'Task marked as complete' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createTask, getTasks, markTaskComplete };
