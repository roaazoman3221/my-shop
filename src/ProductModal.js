// src/ProductModal.js
import React from "react";
import "./ProductModal.css";

function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        
        {/* Close button */}
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        {/* Content */}
        <div className="modal-content">
          <div className="modal-image-wrapper">
            <img
              src={product.image}
              alt={product.title}
              className="modal-image"
            />
          </div>

          <h2 className="modal-title">{product.title}</h2>

          <p className="modal-category">
            {product.category.toUpperCase()}
          </p>

          <p className="modal-price">
            ${product.price.toFixed(2)}
          </p>

          <p className="modal-desc">
            Discover premium quality crafted with excellence.  
            This item is designed to deliver comfort and style —  
            perfect for everyday use and special occasions.
          </p>

          <div className="modal-actions">
            <button className="modal-cart-btn">
              🛒 Add to Cart
            </button>
            <button className="modal-secondary-btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
