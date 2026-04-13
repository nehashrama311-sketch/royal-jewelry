import React, { useState } from 'react';
import axios from 'axios';
import loginBg from '../../assets/neck.webp';
import logo from '../../assets/logo.png';
import './Login.css';

const API_URL = 'http://localhost:5000/api';

export const Login = ({ onLogin, onLogout }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });

      // Save token and user to localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Call onLogin with user's name
      onLogin(response.data.user.name);

      // Reset form
      setEmail('');
      setPassword('');
      setShowLoginForm(false);
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Login failed. Please check your credentials.'
      );
      console.error('Login Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!username || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        name: username,
        email,
        password,
        phone: ''
      });

      // Save token and user to localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Call onLogin with user's name
      onLogin(response.data.user.name);

      // Reset form
      setUsername('');
      setEmail('');
      setPassword('');
      setShowLoginForm(false);
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Signup failed. Please try again.'
      );
      console.error('Signup Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (isSignup) {
      handleSignup();
    } else {
      handleLogin();
    }
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Reset form
    setUsername('');
    setEmail('');
    setPassword('');
    setShowLoginForm(false);
    setError('');
    setIsSignup(false);

    // Call onLogout
    if (onLogout) onLogout();
  };

  return (
    <div 
      className="login-page"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${loginBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        cursor: !showLoginForm ? 'pointer' : 'default'
      }}
      onClick={() => !showLoginForm && setShowLoginForm(true)}
    >
      {!showLoginForm ? (
        <div className="login-prompt">
          <h2 style={{color:'white'}}>Click here to continue</h2>
        </div>
      ) : (
        <div className="login-card">
          
          <div className="login-logo-container">
            <img src={logo} alt="Logo" className="login-logo-img" />
          </div>
          
          <p className="login-tagline">Welcome back. Your elegance awaits.</p>
          
          <h2 className="login-signin-title">
            {isSignup ? 'Create Account' : 'Sign In'}
          </h2>

          {error && (
            <div className="login-error">
              ❌ {error}
            </div>
          )}

          <div className="login-form">
            {isSignup && (
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  onClick={e => e.stopPropagation()}
                />
              </div>
            )}

            <div className="form-group">
              <label>{isSignup ? 'Email Address' : 'Email'}</label>
              <input
                type="email"
                placeholder={isSignup ? 'Enter your email' : 'Enter email'}
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                onClick={e => e.stopPropagation()}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                onClick={e => e.stopPropagation()}
              />
            </div>

            <button 
              className="btn full-width-btn" 
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? '⏳ Loading...' : isSignup ? 'Sign Up →' : 'Login →'}
            </button>

            <div className="login-toggle">
              <p>
                {isSignup ? 'Already have an account?' : "Don't have an account?"}
              </p>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setIsSignup(!isSignup);
                  setError('');
                }}
                style={{ marginTop: '10px', width: '100%' }}
              >
                {isSignup ? 'Sign In' : 'Sign Up'}
              </button>
            </div>

            <button
              className="btn btn-outline full-width-btn"
              onClick={handleLogout}
              style={{ marginTop: '15px' }}
            >
              Close / Logout
            </button>

            
          </div>
        </div>
      )}
    </div>
  );
};