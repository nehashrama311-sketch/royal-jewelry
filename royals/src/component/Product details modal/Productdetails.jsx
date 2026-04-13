import React from 'react';
import { formatINR } from '../../assets/product';

export const ProductDetails = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <div className="product-modal-overlay" onClick={onClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="product-modal-content">
          <img src={product.image} alt={product.name} className="product-modal-image" />

          <div className="product-modal-info">
            <p className="product-category">{product.category}</p>
            <h2>{product.name}</h2>
            <p>{product.description}</p>

            <div className="product-detail-list">
              <p><strong>Price:</strong> {formatINR(product.price)}</p>
              <p><strong>Metal:</strong> {product.metal}</p>
              <p><strong>Stone:</strong> {product.stone}</p>
              <p><strong>Weight:</strong> {product.weight}</p>
              <p><strong>SKU:</strong> {product.sku}</p>
              <p><strong>Tag:</strong> {product.tag}</p>
            </div>

            <button className="btn btn-primary" onClick={() => onAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};