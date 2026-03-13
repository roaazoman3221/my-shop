import React, { useState } from 'react';
import './App.css';
import ProductModal from "./ProductModal";

function App() {
  
  const productsData = [
    { id: 1, title: "Classic Leather Wallet", price: 39.99, category: "men", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=300&fit=crop" },
    { id: 2, title: "Wireless Headphones", price: 89.50, category: "electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop" },
    { id: 3, title: "Elegant Silver Necklace", price: 120.00, category: "jewelery", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop" },
    { id: 4, title: "Cotton T-Shirt", price: 24.99, category: "men", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop" },
    { id: 5, title: "Summer Dress", price: 49.99, category: "women", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop" },
    { id: 6, title: "Smart Watch", price: 199.99, category: "electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop" },
    { id: 7, title: "Gold Bracelet", price: 75.00, category: "jewelery", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=300&fit=crop" },
    { id: 8, title: "Denim Jacket", price: 89.99, category: "men", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop" },
  ];

  
  const [products, setProducts] = useState(productsData);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


  
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    
    setLoading(true);
    setTimeout(() => {
      let filtered = productsData;
      
      
      if (value) {
        filtered = filtered.filter(product =>
          product.title.toLowerCase().includes(value.toLowerCase())
        );
      }
      
      
      if (category !== 'all') {
        filtered = filtered.filter(product => product.category === category);
      }
      
      setProducts(filtered);
      setLoading(false);
    }, 300);
  };

  
  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setLoading(true);
    
    setTimeout(() => {
      if (cat === 'all') {
        setProducts(productsData);
      } else {
        const filtered = productsData.filter(product => product.category === cat);
        setProducts(filtered);
      }
      setLoading(false);
    }, 300);
  };

  
  const handleReset = () => {
    setSearch('');
    setCategory('all');
    setProducts(productsData);
  };

  
  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  
  const getCategoryColor = (cat) => {
    const colors = {
      electronics: '#3b82f6',
      jewelery: '#f59e0b',
      men: '#10b981',
      women: '#ec4899'
    };
    return colors[cat] || '#6b7280';
  };

  return (
    <div className="app">
      
      <header className="app-header">
        <div className="header-content">
          <h1>🛍️ Simple Shop</h1>
          <p className="subtitle">Discover amazing products at great prices</p>
        </div>
      </header>

      {/* main content */}
      <main className="app-main">
        <div className="container">
          {/* control tools */}
          <div className="controls-section">
            {/* search bar */}
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="What are you looking for?"
                value={search}
                onChange={handleSearch}
              />
            </div>

            {/* categories */}
            <div className="categories-container">
              <div className="categories-title">Shop by Category:</div>
              <div className="categories-buttons">
                <button 
                  className={`cat-btn ${category === 'all' ? 'active' : ''}`}
                  onClick={() => handleCategoryChange('all')}
                >
                  All Items
                </button>
                <button 
                  className={`cat-btn ${category === 'electronics' ? 'active' : ''}`}
                  onClick={() => handleCategoryChange('electronics')}
                >
                  Electronics
                </button>
                <button 
                  className={`cat-btn ${category === 'jewelery' ? 'active' : ''}`}
                  onClick={() => handleCategoryChange('jewelery')}
                >
                  Jewelery
                </button>
                <button 
                  className={`cat-btn ${category === 'men' ? 'active' : ''}`}
                  onClick={() => handleCategoryChange('men')}
                >
                  Men's
                </button>
                <button 
                  className={`cat-btn ${category === 'women' ? 'active' : ''}`}
                  onClick={() => handleCategoryChange('women')}
                >
                  Women's
                </button>
              </div>
            </div>

            {/* information and reset */}
            <div className="info-section">
              <div className="results-info">
                <span className="results-count">{products.length}</span>
                <span className="results-label">products available</span>
              </div>
              <button 
                className="reset-btn"
                onClick={handleReset}
                disabled={search === '' && category === 'all'}
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* loading */}
          {loading && (
            <div className="loading-indicator">
              <div className="loader"></div>
              <p>Searching products...</p>
            </div>
          )}

          {/* products */}
          <div className="products-section">
            {products.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📦</div>
                <h3>No products found</h3>
                <p>Try adjusting your search or filters</p>
                <button className="empty-btn" onClick={handleReset}>
                  Reset all filters
                </button>
              </div>
            ) : (
              <div className="products-grid">
                {products.map(product => (
                  <div key={product.id} className="product-card">
                    <div className="product-image-wrapper">
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="product-image"
                        loading="lazy"
                      />
                      <span 
                        className="category-badge"
                        style={{ backgroundColor: getCategoryColor(product.category) }}
                      >
                        {product.category}
                      </span>
                    </div>
                    <div className="product-details">
                      <h3 className="product-title">{product.title}</h3>
                      <div className="product-price">{formatPrice(product.price)}</div>
                      <div className="product-actions">
                        <button className="action-btn add-to-cart">
                          Add to Cart
                        </button>
                        <button
  className="action-btn view-details"
  onClick={() => setSelectedProduct(product)}
>
  View Details
</button>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <ProductModal 
  product={selectedProduct} 
  onClose={() => setSelectedProduct(null)} 
/>

      </main>

      
      <footer className="app-footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Simple Shop. All rights reserved.</p>
          
        </div>
      </footer>
    </div>
  );
}

export default App;