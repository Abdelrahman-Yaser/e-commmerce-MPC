import { useState } from 'react';
import { ProductCard } from './components/ProductCard';
import { CartSidebar } from './components/CartSidebar';
import { CartProvider, useCart } from './context/CartContext';
import { useProducts, useCategories } from './hooks/useProducts';
import './styles/global.css';

// Category icons map
const categoryIcons: Record<string, JSX.Element> = {
  All: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  APPAREL: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z" />
    </svg>
  ),
  SHOES: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 12l1-1 4 2 4-6 3 3 5-5 2 2-7 7-3-3-4 5-3-1-2-3z" />
    </svg>
  ),
  ELECTRONICS: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
};

// Fallback icon for unknown categories
const DefaultIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
  </svg>
);

function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartOpen, setCartOpen] = useState(false);
  const { products, loading, error, fetchProducts } = useProducts();
  const categories = useCategories();
  const { totalItems } = useCart();

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    fetchProducts(cat === 'All' ? undefined : cat);
  };

  return (
    <>
      {/* Header */}
      <header className="site-header">
        <div className="header-inner">
          <div className="logo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span>Storé</span>
          </div>

          <button className="cart-btn" onClick={() => setCartOpen(true)} aria-label="Open cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <h1 className="hero-title">
          Curated <em>Essentials</em>
        </h1>
        <p className="hero-sub">Timeless pieces for the modern wardrobe</p>
      </section>

      {/* Category Filter */}
      <div className="category-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => handleCategoryChange(cat)}
          >
            <span className="pill-icon">
              {categoryIcons[cat] ?? DefaultIcon}
            </span>
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <main className="product-grid-wrapper">
        {loading && (
          <div className="loading-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton-card" />
            ))}
          </div>
        )}

        {error && (
          <div className="error-state">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p>{error}</p>
            <p className="error-hint">Make sure the backend is running on port 3001</p>
            <button className="retry-btn" onClick={() => fetchProducts()}>Retry</button>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="empty-state">
            <p>No products found in <strong>{selectedCategory}</strong></p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <ProductGrid />
    </CartProvider>
  );
}