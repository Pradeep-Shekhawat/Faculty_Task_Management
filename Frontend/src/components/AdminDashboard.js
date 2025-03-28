import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';

const AdminDashboard = () => {
  const [faculty, setFaculty] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await API.get('/faculty');
        setFaculty(res.data);
      } catch (err) {
        console.error(err.response?.data?.message || err.message);
      }
    };

    const fetchTasks = async () => {
      try {
        const res = await API.get('/tasks');
        setTasks(res.data);
      } catch (err) {
        console.error(err.response?.data?.message || err.message);
      }
    };

    fetchFaculty();
    fetchTasks();
  }, []);

  const stats = {
    totalFaculty: faculty.length,
    totalTasks: tasks.length,
    completedTasks: tasks.filter(task => task.status === 'completed').length
  };

  return (
    <div className="container p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 justify-center">
        <div className="card flex items-center space-x-4 p-6">
          <div className="icon-wrapper bg-teal-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div className="stat-text">
            <h3>Total Faculty</h3>
            <p className="stat-number">{stats.totalFaculty}</p>
          </div>
        </div>

        <div className="card flex items-center space-x-4 p-6">
          <div className="icon-wrapper bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="stat-text">
            <h3>Total Tasks</h3>
            <p className="stat-number">{stats.totalTasks}</p>
          </div>
        </div>

        <div className="card flex items-center space-x-4 p-6">
          <div className="icon-wrapper bg-green-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <div className="stat-text">
            <h3>Completed Tasks</h3>
            <p className="stat-number text-green-600">{stats.completedTasks}</p>
          </div>
        </div>
      </div>

      {/* Faculty List and Recent Tasks */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="heading">Faculty List</h2>
          </div>
          <div className="space-y-3">
            {faculty.map((f) => (
              <div key={f.id} className="list-item">
                <div>
                  <p className="list-title">{f.name}</p>
                  <p className="list-subtitle">{f.faculty_subject}</p>
                </div>
                <span className="badge">{f.email}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="heading">Recent Tasks</h2>
            <Link to="/assign-task" className="btn">
              Assign Task
            </Link>
          </div>
          <div className="space-y-3">
            {tasks.slice(0, 5).map((t) => (
              <div key={t.id} className="list-item">
                <div>
                  <p className="list-title">{t.title}</p>
                  <p className="list-subtitle">Due: {t.due_date}</p>
                </div>
                <span className={`badge ${t.status === 'completed' ? 'badge-green' : 'badge-yellow'}`}>
                  {t.status}
                </span>
                {t.attachment && (
                  <div>
                    <a
                      href={`http://localhost:5000/${t.attachment}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 hover:underline"
                    >
                      View Uploaded File
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
