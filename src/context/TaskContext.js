import React, { createContext, useState, useCallback } from 'react';
import API from '../services/api';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setTasks([]);
        setLoading(false);
        return;
      }

      const res = await API.get('/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error.response?.data || error.message);
      setTasks([]);
    }
    setLoading(false);
  }, []);  // no dependencies → stable function reference

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        filter,
        setFilter,
        fetchTasks,
        loading,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
