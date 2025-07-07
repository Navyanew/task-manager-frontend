import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import API from '../services/api';

function TaskList() {
  const { tasks, fetchTasks, loading, filter, setFilter } = useContext(TaskContext);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await API.delete(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks();
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const token = localStorage.getItem('token');
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
    await API.put(`/tasks/${id}`, { status: newStatus }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks();
  };

  const filteredTasks = tasks.filter((task) =>
    filter === 'all' ? true : task.status === filter
  );

  if (loading) return <p className="loading-text">Loading tasks...</p>;

  return (
    <div className="task-list-wrapper">
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')} className={`filter-btn ${filter === 'all' ? 'active' : ''}`}>All</button>
        <button onClick={() => setFilter('pending')} className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}>Pending</button>
        <button onClick={() => setFilter('completed')} className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}>Completed</button>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="no-tasks">No tasks found.</p>
      ) : (
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <li key={task._id} className="task-card">
              <h4>{task.title}</h4>
              <p>{task.description || 'No description'}</p>
              <span className={`status-badge ${task.status}`}>{task.status}</span>
              <div className="task-actions">
                <button onClick={() => handleToggleStatus(task._id, task.status)} className="btn toggle">Toggle</button>
                <button onClick={() => handleDelete(task._id)} className="btn delete">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
