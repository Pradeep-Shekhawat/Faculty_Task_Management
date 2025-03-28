import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../utils/api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      if (res.data.user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/faculty-dashboard');
      }
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="container" id='login'>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
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
        <button className="btn" type="submit">Login</button>
      </form>
      <p className="text-center">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
