import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../utils/api';

const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [attachment, setAttachment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await API.get('/tasks');
        const currentTask = res.data.find((t) => t.id.toString() === id);
        setTask(currentTask);
      } catch (err) {
        console.error(err.response?.data?.message || err.message);
      }
    };
    fetchTask();
  }, [id]);

  const onFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const markComplete = async () => {
    const data = new FormData();
    if (attachment) {
      data.append('attachment', attachment);
    }
    try {
      await API.put(`/tasks/${id}/complete`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/faculty-dashboard');
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  if (!task) return <div className="container">Loading...</div>;

  const fileURL = task.attachment ? `http://localhost:5000/${task.attachment}` : null;

  return (
    <div className="container">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p><strong>Due Date:</strong> {task.due_date}</p>
      <p><strong>Status:</strong> {task.status}</p>

      {task.attachment && (
        <div className="attachment-section">
          <button className="btn" onClick={() => setShowModal(true)}>
            View Attachment
          </button>
        </div>
      )}

      {task.status === 'assigned' && (
        <>
          <div className="form-group">
            <label>Upload Evidence (if required):</label>
            <input className="file-input" type="file" onChange={onFileChange} />
          </div>
          <button className="btn" onClick={markComplete}>Mark as Complete</button>
        </>
      )}

      {showModal && fileURL && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              &times;
            </button>
            {fileURL.match(/\.(jpeg|jpg|gif|png)$/i) ? (
              <img src={fileURL} alt="Attachment" className="modal-image" />
            ) : (
              <p>
                <a href={fileURL} target="_blank" rel="noopener noreferrer">
                  Open Attachment
                </a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetail;
