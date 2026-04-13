import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';

export const Navbar = ({ cartCount, page, setPage, user, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="logo" onClick={() => setPage('home')} style={{ cursor: 'pointer' }}>
        <img src={logo} alt="Royals Jewellery" className="logo-img" />
        <div className="logo-text">
          <div className="logo-name">Royals</div>
          <div className="logo-subtitle">Jewellery</div>
        </div>
      </div>

      {/* Navigation Links */}
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li>
          <button
            className={`nav-btn ${page === 'home' ? 'active' : ''}`}
            onClick={() => {
              setPage('home');
              setMenuOpen(false);
            }}
          >
            Home
          </button>
        </li>
        <li>
          <button
            className={`nav-btn ${page === 'collection' ? 'active' : ''}`}
            onClick={() => {
              setPage('collection');
              setMenuOpen(false);
            }}
          >
            Collection
          </button>
        </li>
        <li>
          <button
            className={`nav-btn ${page === 'story' ? 'active' : ''}`}
            onClick={() => {
              setPage('story');
              setMenuOpen(false);
            }}
          >
            Story
          </button>
        </li>
        <li>
          <button
            className={`nav-btn ${page === 'contact' ? 'active' : ''}`}
            onClick={() => {
              setPage('contact');
              setMenuOpen(false);
            }}
          >
            Contact
          </button>
        </li>
      </ul>

      {/* Right Section - Cart, User, Logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Cart Icon */}
        <div 
          className="cart-icon" 
          onClick={() => setPage('cart')}
          style={{ cursor: 'pointer' }}
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </div>

        {/* User Section */}
        {user && (
          <>
            <span className="nav-user">Hi, {user}</span>
            <button className="nav-btn logout-btn" onClick={onLogout}>
              Logout
            </button>
          </>
        )}

        {/* Hamburger Menu (Mobile) */}
        <button 
          className="hamburger" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
};