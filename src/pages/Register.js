import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../components/Login.css'; // We'll add styles here

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [passwordValidity, setPasswordValidity] = useState({
    length: false,
    startsWithChar: false,
    hasSpecialChar: false,
    hasNumber: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    setPasswordValidity({
      length: password.length >= 8,
      startsWithChar: /^[A-Za-z]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasNumber: /\d/.test(password)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const emailValid = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/.test(formData.email);
    const passwordAllValid = Object.values(passwordValidity).every(Boolean);

    if (!emailValid) {
      setError('Email must end with @gmail.com or @yahoo.com');
      return;
    }

    if (!passwordAllValid) {
      setError('Password does not meet the required rules');
      return;
    }

    try {
      const res = await API.post('/auth/register', formData);
      alert(res.data.message);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="login-container">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form" autoComplete="off" name="no-autofill-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="blink-on-focus"
          autoComplete="off"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="blink-on-focus"
          autoComplete="off"
          readOnly
          onFocus={(e) => e.target.removeAttribute('readOnly')}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="blink-on-focus"
          autoComplete="new-password"
          readOnly
          onFocus={(e) => e.target.removeAttribute('readOnly')}
          required
        />

        <div className="password-rules">
          <p className={passwordValidity.length ? 'valid' : ''}>
            • Password length must be at least 8
          </p>
          <p className={passwordValidity.startsWithChar ? 'valid' : ''}>
            • Starts with a character
          </p>
          <p className={passwordValidity.hasSpecialChar ? 'valid' : ''}>
            • At least one special character
          </p>
          <p className={passwordValidity.hasNumber ? 'valid' : ''}>
            • At least one number
          </p>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
