import React from 'react';
import './Hero.css';



export const Hero = ({ setPage }) => {
  return (
    <>
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-subtitle">Est. 1998 · Jaipur, India</p>
          <h1>Elegance<br />is an Attitude</h1>
          <p className="hero-desc">
            Handcrafted jewelry designed for the modern muse.<br />
            Timeless pieces that speak without words.
          </p>
          <div className="hero-btns">
            <button className="btn btn-primary" onClick={() => setPage('collection')}>
              Discover Collection
            </button>
            <button className="btn btn-outline" onClick={() => setPage('story')}>
              Our Story
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
