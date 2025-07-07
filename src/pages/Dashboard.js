import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { TaskContext } from '../context/TaskContext';
import '../components/Dashboard.css';  // import the CSS here

export default function Dashboard() {
  const navigate = useNavigate();
  const { setTasks } = useContext(TaskContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first');
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Create a Task</h2>
      <TaskForm />
    </div>
  );
}
