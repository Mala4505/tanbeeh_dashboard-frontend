import React, { useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    tr_number: '',
    its_number: '',
    class: '',
    hizb: '',
    role: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('authToken');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const payload = {
        ...formData,
        tr_number: parseInt(formData.tr_number),
        its_number: parseInt(formData.its_number),
        class: parseInt(formData.class),
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/users`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage('✅ User created successfully!');
      setFormData({
        first_name: '',
        last_name: '',
        tr_number: '',
        its_number: '',
        class: '',
        hizb: '',
        role: '',
        password: '',
      });
    } catch (err) {
      setError('❌ Failed to create user. Please check the inputs or your access.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-primary mb-6">Create New User</h2>
      {message && <p className="mb-4 text-green-600 font-medium">{message}</p>}
      {error && <p className="mb-4 text-red-500 font-medium">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="number"
          name="tr_number"
          placeholder="TR Number"
          value={formData.tr_number}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="number"
          name="its_number"
          placeholder="ITS Number"
          value={formData.its_number}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="number"
          name="class"
          placeholder="Class"
          value={formData.class}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="text"
          name="hizb"
          placeholder="Hizb"
          value={formData.hizb}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="prefect">Prefect</option>
          <option value="deputy">Deputy</option>
          <option value="lajnat">Lajnat</option>
          <option value="student">Student</option>
        </select>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-accent text-white py-2 rounded hover:bg-highlight"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;
