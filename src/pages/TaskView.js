import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskContext } from '../context/TaskContext';
import TaskList from '../components/TaskList';
import '../components/TaskView.css'; // 👈 Import the new CSS

export default function TaskView() {
  const navigate = useNavigate();
  const { fetchTasks } = useContext(TaskContext);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first');
      navigate('/login');
    } else {
      fetchTasks().finally(() => setReady(true));
    }
  }, [navigate, fetchTasks]);

  if (!ready) {
    return <p>Loading...</p>; // Avoid rendering TaskList until ready
  }

  return (
   <div className="task-view-container">
  <h2>Task Viewer</h2>
  <TaskList />
</div>

  );
}
