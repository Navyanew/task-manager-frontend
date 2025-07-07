import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleNavClick = (e, path) => {
    if (!token) {
      e.preventDefault();
      alert('You should login first');
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  return (
    <header
      style={{
        backgroundColor: 'black',
        color: 'white',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <h1 style={{ margin: 0 }}>Task Management</h1>
      <nav>
        <button
          onClick={(e) => handleNavClick(e, '/dashboard')}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            marginRight: '15px',
            fontSize: '1rem',
          }}
        >
          Dashboard
        </button>
        <button
          onClick={(e) => handleNavClick(e, '/tasks')}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            marginRight: '15px',
            fontSize: '1rem',
          }}
        >
          View Tasks
        </button>

        {token && (
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              cursor: 'pointer',
              borderRadius: '4px',
            }}
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
