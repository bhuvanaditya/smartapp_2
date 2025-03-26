import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './All.scss';

// Define correct interfaces
interface CategoryItem {
  name: string;
  image: string;
  link: string;
  productId?: number;
  category?: string;
}

interface PickItem {
  points: string;
  category: string;
  image: string;
  productId?: number;
  targetCategory?: string;
}

interface DealItem {
  title: string;
  image: string;
  link: string;
  category: string;
  productId?: number;
  targetCategory?: string;
}

// Popular picks data organized by category
const PopularPicks: Record<string, PickItem[]> = {
  pet: [
    {
      points: "5X",
      category: "All dog food, any brand",
      image: "https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nJTIwZm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      points: "5X",
      category: "All cat food & treats, any brand",
      image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0JTIwdHJlYXRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    }
  ],
  electronics: [
    {
      points: "3X",
      category: "Smartphones & Accessories",
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c21hcnRwaG9uZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      productId: 101,
      targetCategory: "electronics"
    },
    {
      points: "3X",
      category: "Laptops & Computers",
      image: "https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGxhcHRvcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      productId: 103,
      targetCategory: "electronics"
    }
  ],
  clothing: [
    {
      points: "2X",
      category: "Men's Fashion",
      image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWVucyUyMGZhc2hpb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      productId: 201,
      targetCategory: "clothing"
    },
    {
      points: "2X",
      category: "Women's Fashion",
      image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW5zJTIwZmFzaGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      productId: 202,
      targetCategory: "clothing"
    }
  ]
};

// Shop by category data
const Categories: Record<string, CategoryItem[]> = {
  pet: [
    {
      name: "Dog",
      image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      link: "/dog",
      category: "dog"
    },
    {
      name: "Cat",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      link: "/category/cat",
      category: "cat"
    }
  ],
  electronics: [
    {
      name: "Smartphones",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGhvbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      link: "/dog",
      productId: 101,
      category: "electronics"
    },
    {
      name: "Laptops",
      image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      link: "/dog",
      productId: 103,
      category: "electronics"
    }
  ],
  clothing: [
    {
      name: "Men",
      image: "https://images.unsplash.com/photo-1516826957135-700dedea698c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fG1lbiUyMGZhc2hpb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      link: "/dog",
      productId: 201,
      category: "clothing"
    },
    {
      name: "Women",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d29tZW4lMjBmYXNoaW9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      link: "/dog",
      productId: 202,
      category: "clothing"
    }
  ]
};

// Deals and offers data
const Deals: DealItem[] = [
  {
    title: "Save 30% on select dog toys",
    image: "https://images.unsplash.com/photo-1560743641-3914f2c45636?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZG9nJTIwdG95c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    link: "/dog",
    category: "pet",
    productId: 5,
    targetCategory: "dog"
  },
  {
    title: "Buy 1, Get 1 50% off cat treats",
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0JTIwdHJlYXRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    link: "/category/cat-treats",
    category: "pet"
  },
  {
    title: "Up to 40% off selected smartphones",
    image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHNtYXJ0cGhvbmVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    link: "/dog",
    category: "electronics",
    productId: 101,
    targetCategory: "electronics"
  },
  {
    title: "Headphones - Buy one get 30% off second pair",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    link: "/dog",
    category: "electronics",
    productId: 102,
    targetCategory: "electronics"
  },
  {
    title: "Spring Collection - 25% off new arrivals",
    image: "https://images.unsplash.com/photo-1622519407650-3df9883f76a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHNwcmluZyUyMGNsb3RoaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    link: "/dog",
    category: "clothing",
    productId: 201,
    targetCategory: "clothing"
  },
  {
    title: "Clearance - Up to 70% off winter styles",
    image: "https://images.unsplash.com/photo-1515434126000-961d90ff09db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHdpbnRlciUyMGNsb3RoaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    link: "/dog",
    category: "clothing",
    productId: 203,
    targetCategory: "clothing"
  }
];

// Combined categories
const AllCategories = [
  ...Categories.pet,
  ...Categories.electronics,
  ...Categories.clothing
];

const All: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithPopup } = useAuth0();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [popCategoryPicksTitle, setPopCategoryPicksTitle] = useState("All Departments");

  useEffect(() => {
    if (activeTab === "pet") {
      setPopCategoryPicksTitle("Pets");
    } else if (activeTab === "electronics") {
      setPopCategoryPicksTitle("Electronics");
    } else if (activeTab === "clothing") {
      setPopCategoryPicksTitle("Clothing");
    } else {
      setPopCategoryPicksTitle("All Departments");
    }
  }, [activeTab]);

  // Filter deals based on active tab
  const filteredDeals = activeTab === "all" 
    ? Deals 
    : Deals.filter(deal => deal.category === activeTab);

  // Get popular picks based on active tab
  const getPopularPicks = () => {
    if (activeTab === "all") {
      return [
        ...PopularPicks.pet.slice(0, 1),
        ...PopularPicks.electronics.slice(0, 1),
        ...PopularPicks.clothing.slice(0, 2)
      ];
    } else {
      return PopularPicks[activeTab as keyof typeof PopularPicks] || [];
    }
  };

  // Get categories based on active tab
  const getCategories = () => {
    if (activeTab === "all") {
      return AllCategories;
    } else {
      return Categories[activeTab as keyof typeof Categories] || [];
    }
  };

  // Carefully designed navigation function to directly link to product details in the Dog component
  const handleNavigation = (item: any) => {
    if (item.productId) {
      // Navigate to product using product ID and proper category
      const category = item.targetCategory || item.category || 
                       (item.productId >= 100 && item.productId < 200 ? 'electronics' : 
                       item.productId >= 200 ? 'clothing' : 'dog');
      
      navigate(`/product/${item.productId}`, {
        state: {
          product: { id: item.productId },
          category: category
        }
      });
    } else {
      // Default navigation
      navigate(item.link || '/dog');
    }
  };

  // Tab change handler
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  if (loading) return <div className="loading-message">Loading products...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="home-page">
      {/* Header with Logo */}
      <header className="site-header">
        <div className="header-container">
          <div className="logo-container">
            <img src="/smartbuy-logo.svg" alt="SmartBuy Logo" className="site-logo" />
          </div>
          <nav className="main-nav">
            <ul>
              <li>
                <a href="#" 
                  className={activeTab === "all" ? "active" : ""} 
                  onClick={(e) => { e.preventDefault(); handleTabChange("all"); }}
                >
                  All Departments
                </a>
              </li>
              <li>
                <a href="#" 
                  className={activeTab === "pet" ? "active" : ""} 
                  onClick={(e) => { e.preventDefault(); handleTabChange("pet"); }}
                >
                  Pets
                </a>
              </li>
              <li>
                <a href="#" 
                  className={activeTab === "electronics" ? "active" : ""} 
                  onClick={(e) => { e.preventDefault(); handleTabChange("electronics"); }}
                >
                  Electronics
                </a>
              </li>
              <li>
                <a href="#" 
                  className={activeTab === "clothing" ? "active" : ""} 
                  onClick={(e) => { e.preventDefault(); handleTabChange("clothing"); }}
                >
                  Clothing
                </a>
              </li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/dog'); }}>Today's Deals</a></li>
            </ul>
          </nav>
          <div className="header-actions">
            <button className="search-btn">
              <i className="search-icon">🔍</i>
            </button>
            <button className="account-btn">Account</button>
            <button className="cart-btn">Cart (0)</button>
          </div>
        </div>
      </header>

      {/* Popular Categories Section */}
      <section className="popular-picks">
        <h2>Popular Categories in {popCategoryPicksTitle}</h2>
        <div className="picks-grid">
          {getPopularPicks().map((pick, index) => (
            <div 
              key={`pick-${index}`} 
              className="pick-card"
              onClick={() => handleNavigation(pick)}
            >
              <div className="points-badge">
                <span className="points">{pick.points}</span>
                <span className="pts">pts</span>
              </div>
              <div className="pick-content">
                <h3>{pick.category}</h3>
                <img src={pick.image} alt={pick.category} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="shop-by-category">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          {getCategories().map((category, index) => (
            <div 
              key={`category-${index}`} 
              className="category-card"
              onClick={() => handleNavigation(category)}
            >
              <div className="image-container">
                <img src={category.image} alt={category.name} />
              </div>
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Hot Deals Section */}
      <section className="deals-section">
        <h2>Hot Deals & Offers</h2>
        <div className="deals-grid">
          {filteredDeals.map((deal, index) => (
            <div 
              key={`deal-${index}`} 
              className="deal-card" 
              onClick={() => handleNavigation(deal)}
            >
              <div className="deal-image">
                <img src={deal.image} alt={deal.title} />
              </div>
              <div className="deal-content">
                <h3>{deal.title}</h3>
                <button 
                  className="shop-now-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation(deal);
                  }}
                >
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="newsletter-signup">
        <div className="signup-content">
          <h2>Get SmartBuy News & Offers</h2>
          <p>Sign up to receive updates, special offers, shopping tips and more!</p>
          <form className="signup-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-column">
            <h3>Customer Service</h3>
            <ul>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/order-status">Order Status</a></li>
              <li><a href="/shipping">Shipping</a></li>
              <li><a href="/returns">Returns & Exchanges</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>About SmartBuy</h3>
            <ul>
              <li><a href="/about">Our Story</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/stores">Store Locator</a></li>
              <li><a href="/sustainability">Sustainability</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Resources</h3>
            <ul>
              <li><a href="/blog">SmartBuy Blog</a></li>
              <li><a href="/app">Download Our App</a></li>
              <li><a href="/gift-cards">Gift Cards</a></li>
              <li><a href="/rewards">SmartBuy Rewards</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Connect With Us</h3>
            <div className="social-icons">
              <a href="#" className="social-icon">📱</a>
              <a href="#" className="social-icon">📘</a>
              <a href="#" className="social-icon">📸</a>
              <a href="#" className="social-icon">🐦</a>
            </div>
            <p>Download Our App</p>
            <div className="app-buttons">
              <a href="#" className="app-button">App Store</a>
              <a href="#" className="app-button">Google Play</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 SmartBuy. All Rights Reserved.</p>
          <div className="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Use</a>
            <a href="/accessibility">Accessibility</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default All;