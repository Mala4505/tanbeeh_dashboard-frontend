import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [trNumber, setTrNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { trNumber, password });
      const token = res.data.token;
      localStorage.setItem('authToken', token);

      const profileRes = await axios.get(`${import.meta.env.VITE_API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      login(profileRes.data);
      navigate('/', { replace: true });
    } catch {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input type="number" placeholder="TR Number" value={trNumber} onChange={(e) => setTrNumber(e.target.value)} className="w-full mb-4 px-4 py-2 border rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-6 px-4 py-2 border rounded" required />
        <button type="submit" className="w-full bg-accent text-white py-2 rounded hover:bg-highlight">Login</button>
      </form>
    </div>
  );
};

export default Login;
