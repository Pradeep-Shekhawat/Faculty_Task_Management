import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';

const FacultyDashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await API.get('/tasks');
        setTasks(res.data);
      } catch (err) {
        console.error(err.response?.data?.message || err.message);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="container p-6">
      <h2 className="heading mb-6">Your Tasks</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="card p-4">
            <Link to={`/task/${task.id}`} className="list-title hover:underline">
              {task.title}
            </Link>
            <div className="list-subtitle">Due: {task.due_date}</div>
            <div className="mt-2">
              <span className={`badge ${task.status === 'completed' ? 'badge-green' : 'badge-yellow'}`}>
                {task.status}
              </span>
            </div>
            {task.attachment && (
              <div className="mt-2">
                <a 
                  href={`http://localhost:5000/${task.attachment}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:underline"
                >
                  View Attachment
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyDashboard;
