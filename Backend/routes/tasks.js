// backend/routes/tasks.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const { createTask, getTasks, markTaskComplete } = require('../controllers/taskController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// POST /api/tasks (Admin) - create task
router.post('/', auth, upload.single('attachment'), createTask);

// GET /api/tasks (Admin sees all; Faculty sees own)
router.get('/', auth, getTasks);

// PUT /api/tasks/:taskId/complete (Faculty)
router.put('/:taskId/complete', auth, upload.single('attachment'), markTaskComplete);

module.exports = router;
