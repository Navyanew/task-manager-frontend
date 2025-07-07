import axios from 'axios';

const API = axios.create({
  baseURL:'https://task-manager-backend-hnvj.onrender.com/api', // your backend base URL
});
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
