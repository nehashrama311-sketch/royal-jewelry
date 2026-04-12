import React, { useState } from 'react';
import loginBg from '../../assets/neck.webp';
import logo from '../../assets/logo.png';
import './Login.css';

export const Login = ({ onLogin, onLogout }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleSubmit = () => {
    if (username && password) {
      onLogin(username);
    } else {
      alert('Please enter both username and password.');
    }
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
          
          <h2 className="login-signin-title">Sign In</h2>

          <div className="login-form">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={e => setUsername(e.target.value)}
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

            <button className="btn full-width-btn" onClick={handleSubmit}>
              Login →
            </button>

            <button
              className="btn btn-outline full-width-btn"
              onClick={() => {
                setUsername('');
                setPassword('');
                setShowLoginForm(false);
                if (onLogout) onLogout();
              }}
            >
              Logout / Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};