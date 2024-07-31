import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    user_email: '',
    user_password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://syoft.dev/Api/userlogin/api/userlogin', formData);
      if (response.data.status) {
        localStorage.setItem('user', JSON.stringify(response.data.user_data[0]));
        navigate('/dashboard');
      } else {
        setError(response.data.msg);
      }
    } catch (error) {
      setError('There was an error!');
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Log In</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="user_email" placeholder="Email" value={formData.user_email} onChange={handleChange} required />
        <input type="password" name="user_password" placeholder="Password" value={formData.user_password} onChange={handleChange} required />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;
