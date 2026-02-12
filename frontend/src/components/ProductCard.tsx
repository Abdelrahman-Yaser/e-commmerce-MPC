import { useState } from 'react';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variants.length > 0 ? product.variants[0] : ''
  );
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem(product, selectedVariant);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1500);
  };

  const fallbackImage = `https://placehold.co/400x300/f0ede8/8b7355?text=${encodeURIComponent(product.name)}`;

  return (
    <article className="product-card">
      {/* Image */}
      <div className="card-image-wrapper">
        <img
          src={imageError ? fallbackImage : (product.imageUrl || fallbackImage)}
          alt={product.name}
          className="card-image"
          onError={() => setImageError(true)}
          loading="lazy"
        />
        <div className={`stock-badge ${isOutOfStock ? 'out-of-stock' : 'in-stock'}`}>
          {isOutOfStock ? 'Out of Stock' : `${product.stock} left`}
        </div>
        <div className="category-tag">{product.category}</div>
      </div>

      {/* Content */}
      <div className="card-body">
        <h3 className="product-name">{product.name}</h3>
        {product.description && (
          <p className="product-description">{product.description}</p>
        )}

        <div className="card-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>

          {/* Variants dropdown */}
          {product.variants.length > 0 && (
            <div className="variant-wrapper">
              <label htmlFor={`variant-${product.id}`} className="variant-label">
                Option
              </label>
              <select
                id={`variant-${product.id}`}
                className="variant-select"
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
                disabled={isOutOfStock}
              >
                {product.variants.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Add to Cart / Out of Stock Button */}
          <button
            className={`add-to-cart-btn ${isOutOfStock ? 'disabled' : ''} ${addedFeedback ? 'added' : ''}`}
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            aria-label={isOutOfStock ? 'Out of Stock' : `Add ${product.name} to cart`}
          >
            {isOutOfStock ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                </svg>
                Out of Stock
              </>
            ) : addedFeedback ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Added!
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
