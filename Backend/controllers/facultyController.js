// backend/controllers/facultyController.js
const pool = require('../config/db');

const getFaculty = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  try {
    const [rows] = await pool.query(
      'SELECT id, name, email, faculty_subject FROM users WHERE role = ?',
      ['faculty']
    );
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getFaculty };
