import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

const Register = () => {
  const [role, setRole] = useState('faculty');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    faculty_subject: '',
    special_code: ''
  });
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const payload = { ...formData, role };
      await API.post('/auth/register', payload);
      navigate('/login');
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="container" id='regi'>
      <h2>Register</h2>
      <div className="role-toggle">
        <button
          type="button"
          className={`toggle-button ${role === 'faculty' ? 'active' : ''}`}
          onClick={() => setRole('faculty')}
        >
          Faculty
        </button>
        <button
          type="button"
          className={`toggle-button ${role === 'admin' ? 'active' : ''}`}
          onClick={() => setRole('admin')}
        >
          Admin
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            className="input"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="input"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="input"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={onChange}
            required
          />
        </div>
        {role === 'faculty' && (
          <div className="form-group">
            <input
              className="input"
              type="text"
              name="faculty_subject"
              placeholder="Faculty Subject"
              value={formData.faculty_subject}
              onChange={onChange}
              required
            />
          </div>
        )}
        {role === 'admin' && (
          <div className="form-group">
            <input
              className="input"
              type="text"
              name="special_code"
              placeholder="Admin Special Code"
              value={formData.special_code}
              onChange={onChange}
              required
            />
          </div>
        )}
        <button className="btn" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
