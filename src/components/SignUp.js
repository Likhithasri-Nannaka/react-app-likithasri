import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link

function SignUp() {
  const [formData, setFormData] = useState({
    user_firstname: '',
    user_email: '',
    user_password: '',
    user_phone: ''
  });
  const [error, setError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === 'user_phone') {
      const phone = e.target.value;
      if (!/^\d{0,10}$/.test(phone)) {
        setPhoneError('Phone number must be exactly 10 digits');
      } else {
        setPhoneError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phoneError || formData.user_phone.length !== 10) {
      setPhoneError('Phone number must be exactly 10 digits');
      return;
    }

    const payload = {
      ...formData,
      user_lastname: 'Vardhan',
      user_city: 'hitech City',
      user_zipcode: '50007800'
    };

    try {
      const response = await axios.post('https://syoft.dev/Api/user_registeration/api/user_registeration', payload);
      if (response.data.status) {
        navigate('/login');
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
      <h6>Welcome to Our Community - Likithasri Nannaka</h6>
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="user_firstname" placeholder="First Name" value={formData.user_firstname} onChange={handleChange} required />
        <input type="email" name="user_email" placeholder="Email" value={formData.user_email} onChange={handleChange} required />
        <input type="password" name="user_password" placeholder="Password" value={formData.user_password} onChange={handleChange} required />
        <input type="text" name="user_phone" placeholder="Phone Number" value={formData.user_phone} onChange={handleChange} required />
        {phoneError && <p className="error">{phoneError}</p>}
        <button type="submit">Sign Up</button>
      </form>
      <div className="sign-in-link">
        <p>Already have an account?</p>
        <Link to="/login">
          <button>Sign In</button>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
