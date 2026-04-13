import React, { useState } from 'react';
import './App.css';
import { Login } from './component/Login/Login';
import { Navbar } from './component/Navbar/Navbar';
import { Hero } from './component/Hero/hero';
import { StatsBar } from './component/Starbar/starbar';
import { ProductDetails } from './component/Product details modal/Productdetails';
import { products, categories, tagColors, formatINR } from './assets/product';
import logo from '../src/assets/logo.png';

// ─── PRODUCT CARD ────────────────────────────────────────────────────────────
const ProductCard = ({ product, onAddToCart, onViewDetails }) => (
  <div className="product-card" onClick={() => onViewDetails(product)}>
    <div className="product-image-wrapper">
      <img src={product.image} alt={product.name} className="product-image" />
      {product.tag && (
        <span className="product-tag" style={{ background: tagColors[product.tag] || '#d4af37' }}>
          {product.tag}
        </span>
      )}
    </div>

    <div className="product-info">
      <p className="product-category">{product.category}</p>
      <h3 className="product-title">{product.name}</h3>
      <p className="product-description">{product.description}</p>

      <div className="product-meta">
        <span>🪙 {product.metal}</span>
        <span>💎 {product.stone}</span>
      </div>

      <div className="product-footer">
        <p className="product-price">{formatINR(product.price)}</p>
        <button
          className="add-btn"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
        >
          + Add to Cart
        </button>
      </div>
    </div>
  </div>
);

// ─── HOME PAGE ───────────────────────────────────────────────────────────────
const HomePage = ({ setPage, onAddToCart }) => {
  const featured = products.slice(0, 3);
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <Hero setPage={setPage} />
      <StatsBar />

      <section className="home-featured">
        <div className="section-header">
          <div className="section-tag">Featured Pieces</div>
          <h2>Handpicked For You</h2>
          <p>Each piece tells a story of devotion and fine craftsmanship.</p>
        </div>

        <div className="product-grid">
          {featured.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              onAddToCart={onAddToCart}
              onViewDetails={setSelectedProduct}
            />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <button className="btn btn-primary" onClick={() => setPage('collection')}>
            View Full Collection →
          </button>
        </div>
      </section>

      <section className="home-banner">
        <div className="home-banner-content">
          <h2>Timeless. Ethical. Yours.</h2>
          <p>
            Every Royals piece is crafted by master artisans in Jaipur using only conflict-free diamonds and responsibly sourced gold.
          </p>
          <button className="btn btn-primary" onClick={() => setPage('story')}>Learn Our Story</button>
        </div>
      </section>

      <section className="home-categories">
        <div className="section-header">
          <h2>Shop by Category</h2>
        </div>
        <div className="cat-grid">
          {["Bracelets", "Necklaces", "Rings", "Earrings", "Bangles", "Pendants"].map(cat => (
            <div key={cat} className="cat-card" onClick={() => setPage('collection')}>
              <div className="cat-icon">◆</div>
              <span>{cat}</span>
            </div>
          ))}
        </div>
      </section>

      <ProductDetails
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={onAddToCart}
      />
    </>
  );
};

// ─── COLLECTION PAGE ─────────────────────────────────────────────────────────
const CollectionPage = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  let filtered = activeCategory === "All"
    ? products
    : products.filter(p => p.category === activeCategory);

  if (search.trim()) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (sortBy === "low") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "high") filtered = [...filtered].sort((a, b) => b.price - a.price);

  return (
    <div className="page-wrapper">
      <div className="page-hero-banner">
        <h1>The Signature Collection</h1>
        <p>Curated for those who appreciate the finer details of life.</p>
      </div>

      <div className="collection-controls">
        <div className="search-box">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search pieces..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="default">Sort By</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      <div className="category-filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>No pieces found. Try a different filter or search.</p>
        </div>
      ) : (
        <div className="product-grid padded">
          {filtered.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              onAddToCart={onAddToCart}
              onViewDetails={setSelectedProduct}
            />
          ))}
        </div>
      )}

      <ProductDetails
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={onAddToCart}
      />
    </div>
  );
};

// ─── OUR STORY PAGE ──────────────────────────────────────────────────────────
const StoryPage = () => (
  <div className="page-wrapper">
    <div className="page-hero-banner">
      <h1>Our Story</h1>
      <p>A legacy of love, craft, and brilliance — passed down through generations.</p>
    </div>

    <div className="story-intro">
      <p>
        From a small atelier in the heart of Jaipur to one of India's most trusted fine jewellery houses —
        Royals Jewellery has always believed that true luxury lies not in price, but in purpose.
      </p>
    </div>
  </div>
);

// ─── CONTACT PAGE ────────────────────────────────────────────────────────────
const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) {
      alert("Please fill in all required fields.");
      return;
    }
    setSent(true);
  };

  return (
    <div className="page-wrapper">
      <div className="page-hero-banner">
        <h1>Contact Us</h1>
        <p>We'd love to welcome you to our showroom or assist you online.</p>
      </div>

      <div className="contact-layout">
        <div className="contact-form-col">
          <h2>Send Us a Message</h2>

          {sent ? (
            <div className="form-success">
              <div className="success-icon">✓</div>
              <h3>Message Received!</h3>
              <p>Thank you, {form.name}. Our team will get back to you within 24 hours.</p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSent(false);
                  setForm({ name: '', email: '', phone: '', message: '' });
                }}
              >
                Send Another
              </button>
            </div>
          ) : (
            <div className="contact-form">
              <div className="form-group">
                <label>Full Name *</label>
                <input type="text" name="name" placeholder="Priya Sharma" value={form.name} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input type="email" name="email" placeholder="priya@example.com" value={form.email} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" placeholder="+91 98XXX XXXXX" value={form.phone} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Your Message *</label>
                <textarea
                  name="message"
                  placeholder="Tell us about the piece you're looking for..."
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              <button className="btn btn-primary full-width-btn" onClick={handleSubmit}>
                Send Message →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── CART PAGE ───────────────────────────────────────────────────────────────
const CartPage = ({ cartItems, onRemove, onClearCart, setPage }) => {
  const subtotal = cartItems.reduce((s, i) => s + i.price, 0);
  const gst = Math.round(subtotal * 0.03);
  const shipping_charge = subtotal > 500000 ? 0 : 999;
  const total = subtotal + gst + shipping_charge;

  return (
    <div className="page-wrapper">
      <div className="page-hero-banner" style={{ padding: '3rem 2rem' }}>
        <h1>Your Cart</h1>
        <p>{cartItems.length} {cartItems.length === 1 ? 'piece' : 'pieces'} selected</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Explore our collection to find your perfect piece.</p>
          <button className="btn btn-primary" onClick={() => setPage('collection')}>Browse Collection</button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-main">
            <h3 className="cart-section-title">Items in Your Cart</h3>

            <div className="cart-items-list">
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item-row">
                  <img src={item.image} alt={item.name} className="cart-item-img" />

                  <div className="cart-item-details">
                    <div className="cart-item-cat">{item.category}</div>
                    <h4>{item.name}</h4>
                    <div className="cart-item-specs">
                      <span>Metal: {item.metal}</span>
                      <span>•</span>
                      <span>Stone: {item.stone}</span>
                      <span>•</span>
                      <span>SKU: {item.sku}</span>
                    </div>
                  </div>

                  <div className="cart-item-right">
                    <p className="cart-item-price">{formatINR(item.price)}</p>
                    <button className="remove-btn" onClick={() => onRemove(index)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-nav-btns">
              <button className="btn btn-outline" onClick={onClearCart}>Clear Cart</button>
              <button className="btn btn-primary" onClick={() => alert('Checkout flow ready hai, aap chahe to next step bhi add kar dunga.')}>
                Proceed to Checkout →
              </button>
            </div>
          </div>

          <div className="cart-summary-col">
            <div className="order-summary-box">
              <h3>Order Summary</h3>

              <div className="summary-items">
                {cartItems.map((item, i) => (
                  <div key={i} className="summary-item">
                    <span className="summary-item-name">{item.name}</span>
                    <span className="summary-item-price">{formatINR(item.price)}</span>
                  </div>
                ))}
              </div>

              <div className="summary-divider" />
              <div className="summary-row"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
              <div className="summary-row"><span>GST (3%)</span><span>{formatINR(gst)}</span></div>
              <div className="summary-row"><span>Shipping</span><span>{shipping_charge === 0 ? 'Free' : formatINR(shipping_charge)}</span></div>
              <div className="summary-divider" />
              <div className="summary-row total"><span>Total</span><span>{formatINR(total)}</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── FOOTER ──────────────────────────────────────────────────────────────────
const Footer = ({ setPage }) => (
  <footer className="footer">
    <div className="footer-logo" onClick={() => setPage('home')} style={{ cursor: 'pointer' }}>
      <img src={logo} alt="Royals Jewellery" className="footer-logo-img" />
      <div className="footer-logo-text">
        <div className="footer-logo-name">Royals</div>
        <div className="footer-logo-subtitle">Jewellery</div>
      </div>
    </div>
    <p>Crafted with love, elegance, and timeless beauty.</p>
  </footer>
);

// ─── APP ─────────────────────────────────────────────────────────────────────
function App() {
  const [page, setPage] = useState('login');
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const cartCount = cartItems.length;

  const handleLogin = (username) => {
    setUser(username);
    setPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    setPage('login');
    setCartItems([]);
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    alert(`${product.name} added to cart!`);
  };

  const removeFromCart = (index) => {
    const newCart = cartItems.filter((_, i) => i !== index);
    setCartItems(newCart);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  if (page === 'login') {
    return <Login onLogin={handleLogin} onLogout={handleLogout} />;
  }

  return (
    <div className="App">
      <Navbar
        cartCount={cartCount}
        page={page}
        setPage={setPage}
        user={user}
        onLogout={handleLogout}
      />

      <main>
        {page === 'home' && <HomePage setPage={setPage} onAddToCart={addToCart} />}
        {page === 'collection' && <CollectionPage onAddToCart={addToCart} />}
        {page === 'story' && <StoryPage />}
        {page === 'contact' && <ContactPage />}
        {page === 'cart' && (
          <CartPage
            cartItems={cartItems}
            onRemove={removeFromCart}
            onClearCart={clearCart}
            setPage={setPage}
          />
        )}
      </main>

      <Footer setPage={setPage} />
    </div>
  );
}

export default App;