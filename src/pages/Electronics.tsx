import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import './Electronics.scss';

const ElectronicsProducts = [
  {
    id: 101,
    name: "Samsung Galaxy S24 Ultra - 512GB Unlocked",
    sizes: "3 colors",
    reviews: -1245,
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c21hcnRwaG9uZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 102,
    name: "Apple MacBook Pro 14\" - M3 Pro Chip - 16GB RAM",
    sizes: "2 colors",
    reviews: -987,
    price: 1999.99,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 103,
    name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    sizes: "2 colors",
    reviews: -1124,
    price: 349.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 104,
    name: "Apple Watch Series 9 - GPS + Cellular 45mm",
    sizes: "4 colors",
    reviews: -856,
    price: 499.99,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHNtYXJ0d2F0Y2h8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
  }
];

const ElectronicsDeals = [
  {
    id: 101,
    title: "Smartphone\ndeals",
    label: "Smartphone deals",
    background: "#0055a6"
  },
  {
    id: 102,
    title: "Laptop\ndeals",
    label: "Laptop deals",
    background: "#0055a6"
  },
  {
    id: 103,
    title: "Audio\ndeals",
    label: "Audio deals",
    background: "#0055a6"
  },
  {
    id: 104,
    title: "Smart\nwatches\ndeals",
    label: "Smart watches deals",
    background: "#0055a6"
  },
  {
    id: 105,
    title: "Tablet\ndeals",
    label: "Tablet deals",
    background: "#0055a6"
  },
  {
    id: 106,
    title: "Camera\ndeals",
    label: "Camera deals",
    background: "#0055a6"
  }
];

const Electronics: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleProductClick = (product: any) => {
    navigate(`/product/${product.id}`, { 
      state: { 
        product,
        category: 'electronics'
      } 
    });
  };

  return (
    <div className="electronics-page">
      <h1>Electronics & Tech Gadgets</h1>

      <div className="deals-section">
        <div className="deals-header">
          <h2>All electronics deals</h2>
          <a href="#" className="shop-all">Shop all</a>
        </div>
        <div className="deals-grid">
          {ElectronicsDeals.map((deal) => (
            <div key={deal.id} className="deal-card">
              <div className="deal-circle">
                <span className="deal-text">{deal.title}</span>
              </div>
              <span className="deal-label">{deal.label}</span>
            </div>
          ))}
        </div>
      </div>

      <br />
      <br />

      <div className="products-section">
        <div className="products-grid">
          {ElectronicsProducts.map((product) => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => handleProductClick(product)}
            >
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="product-meta">
                  <span className="sizes">{product.sizes}</span>
                  <span className="reviews">{Math.abs(product.reviews)} Reviews</span>
                </div>
                <div className="price">${product.price.toFixed(2)}</div>
                <button 
                  className="view-details"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(product);
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />

      <div className="hero-banner">
        <img 
          src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGhvbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=1200&q=60" 
          alt="Electronics Promotion"
        />
        <div className="promo-content">
          <h1>Electronics Shop</h1>
          <h2>Smartphones, laptops, accessories & more</h2>
          <div className="offer-banner">
            <h3>$25 back in savings</h3>
            <p>EARN 12,500 pts ($25 back in savings) when you spend $200+ on any electronics PER DAY thru 4/15*</p>
            <button className="activate-btn">Activate</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Electronics;