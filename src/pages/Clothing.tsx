import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import './Clothing.scss';

const ClothingProducts = [
  {
    id: 201,
    name: "Men's Classic Fit Suit - Navy Blue",
    sizes: "6 sizes",
    reviews: -832,
    price: 299.99,
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWVucyUyMGZhc2hpb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 202,
    name: "Women's Floral Summer Dress - Multicolor",
    sizes: "5 sizes",
    reviews: -945,
    price: 79.99,
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW5zJTIwZmFzaGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 203,
    name: "Men's Leather Oxford Shoes - Brown",
    sizes: "8 sizes",
    reviews: -624,
    price: 129.99,
    image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bWVucyUyMHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 204,
    name: "Women's Designer Tote Bag - Black",
    sizes: "One size",
    reviews: -728,
    price: 149.99,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW5zJTIwYmFnfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
  }
];

const ClothingDeals = [
  {
    id: 201,
    title: "Men's\nfashion\ndeals",
    label: "Men's fashion deals",
    background: "#2d365c"
  },
  {
    id: 202,
    title: "Women's\nfashion\ndeals",
    label: "Women's fashion deals",
    background: "#2d365c"
  },
  {
    id: 203,
    title: "Shoes\ndeals",
    label: "Shoes deals",
    background: "#2d365c"
  },
  {
    id: 204,
    title: "Accessories\ndeals",
    label: "Accessories deals",
    background: "#2d365c"
  },
  {
    id: 205,
    title: "Kids\nclothing\ndeals",
    label: "Kids clothing deals",
    background: "#2d365c"
  },
  {
    id: 206,
    title: "Seasonal\ndeals",
    label: "Seasonal deals",
    background: "#2d365c"
  }
];

const Clothing: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleProductClick = (product: any) => {
    navigate(`/product/${product.id}`, { 
      state: { 
        product,
        category: 'clothing'
      } 
    });
  };

  return (
    <div className="clothing-page">
      <h1>Clothing & Fashion</h1>

      <div className="deals-section">
        <div className="deals-header">
          <h2>All clothing deals</h2>
          <a href="#" className="shop-all">Shop all</a>
        </div>
        <div className="deals-grid">
          {ClothingDeals.map((deal) => (
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
          {ClothingProducts.map((product) => (
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
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d29tZW4lMjBmYXNoaW9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1200&q=60" 
          alt="Clothing Promotion"
        />
        <div className="promo-content">
          <h1>Fashion Shop</h1>
          <h2>Clothing, shoes, accessories & more</h2>
          <div className="offer-banner">
            <h3>$20 back in savings</h3>
            <p>EARN 10,000 pts ($20 back in savings) when you spend $150+ on any clothing PER DAY thru 4/30*</p>
            <button className="activate-btn">Activate</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clothing;