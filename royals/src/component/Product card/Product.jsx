import React from 'react'
const ProductCard = ({ product, onAddToCart, onViewDetails }) => {

  return (
<>

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
</>
  )
}