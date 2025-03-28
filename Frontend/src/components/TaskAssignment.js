import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

const TaskAssignment = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: '',
    assigned_to: ''
  });
  const [facultyList, setFacultyList] = useState([]);
  const [attachment, setAttachment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await API.get('/faculty');
        setFacultyList(res.data);
      } catch (err) {
        console.error(err.response?.data?.message || err.message);
      }
    };
    fetchFaculty();
  }, []);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('due_date', formData.due_date);
    data.append('assigned_to', formData.assigned_to);
    if (attachment) {
      data.append('attachment', attachment);
    }
    try {
      await API.post('/tasks', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/admin-dashboard');
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="container">
      <h2>Assign New Task</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            className="input"
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            className="textarea"
            name="description"
            placeholder="Task Description"
            value={formData.description}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="input"
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <select
            className="select"
            name="assigned_to"
            value={formData.assigned_to}
            onChange={onChange}
            required
          >
            <option value="">Select Faculty</option>
            {facultyList.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} - {f.faculty_subject}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>File Attachment (optional):</label>
          <input className="file-input" type="file" onChange={onFileChange} />
        </div>
        <button className="btn" type="submit">Assign Task</button>
      </form>
    </div>
  );
};

export default TaskAssignment;
