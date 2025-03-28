import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import FacultyDashboard from './components/FacultyDashboard';
import TaskAssignment from './components/TaskAssignment';
import TaskDetail from './components/TaskDetail';
import Profile from './components/Profile';

const App = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
      <Route path="/task/:id" element={<TaskDetail />} />
      <Route path="/assign-task" element={<TaskAssignment />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default App;
