import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons'; // Import close icon
import { useNavigate } from 'react-router-dom';
import './admin.css';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/v2/login', {
        email,
        password,
      });

localStorage.setItem('authToken', response.data.token)
      setSuccessMessage('Login successful!');
      setLoading(false);

      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);

    } catch (error) {
      setLoading(false);
      setErrorMessage(error.response?.data?.message || 'Invalid email or password.');
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-container">
        {/* Close Button */}
        <button className="close-button" onClick={() => navigate('/')}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <h2 className="login-container_heading">Log in with password</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              id="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="remember-forgot">
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Log in'}
          </button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <a href="#" className="back-options">Back to log in options</a>
      </div>
    </div>
  );
};

export default LoginComponent;