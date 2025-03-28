// backend/routes/faculty.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getFaculty } = require('../controllers/facultyController');

router.get('/', auth, getFaculty);   // Only GET /api/faculty remains.

module.exports = router;
