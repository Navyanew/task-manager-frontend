import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import API from '../services/api';
import './TaskForm.css'; // import the new CSS here

export default function TaskForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending'
  });

  const { fetchTasks } = useContext(TaskContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('Task title cannot be empty');
      return;
    }
    if (!formData.description.trim()) {
      alert('Description cannot be empty');
      return;
    }

    try {
      await API.post('/tasks', formData);
      setFormData({ title: '', description: '', status: 'pending' });
      fetchTasks();
    } catch (error) {
      console.error('Failed to add task:', error.response?.data || error.message);
      alert('Failed to add task');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="taskform">
      <input
        type="text"
        name="title"
        placeholder="Task title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        style={{ width: '100%' }}
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit">
        Add Task
      </button>
    </form>
  );
}
