// frontend/src/components/ProductCard.js
function ProductCard({ product, addToCart, onDelete }) {
  // Stable rating based on product ID (consistent per product)
  const ratingValue = ((product._id?.charCodeAt(0) || 65) % 15 + 35) / 10; // 3.5–4.9
  const rating = ratingValue.toFixed(1);
  const reviewCount = ((product._id?.charCodeAt(1) || 65) % 5000) + 50;

  const stars = Math.floor(ratingValue);
  const hasHalfStar = ratingValue % 1 >= 0.5;

  // Unique gradient ID per card to avoid SVG ID collision
  const gradientId = `halfStar-${product._id}`;

  return (
    <article className="card" role="listitem">
      <div className="card-image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.classList.add('card-image-fallback');
          }}
        />
      </div>

      <div className="card-content">
        {/* Category badge */}
        {product.category && (
          <span className="card-category">{product.category}</span>
        )}

        {/* Title */}
        <h2 className="card-title" title={product.name}>{product.name}</h2>

        {/* Rating */}
        <div className="card-rating">
          <div className="card-rating-stars" aria-label={`${rating} out of 5 stars`}>
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                {i < stars ? (
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                ) : i === stars && hasHalfStar ? (
                  <>
                    <defs>
                      <linearGradient id={gradientId} x1="0" y1="0" x2="24" y2="0">
                        <stop offset="50%" stopColor="currentColor" />
                        <stop offset="50%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                      fill={`url(#${gradientId})`}
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </>
                ) : (
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    opacity="0.4"
                  />
                )}
              </svg>
            ))}
          </div>
          <span className="card-rating-value">{rating}</span>
          <span className="card-rating-count">({reviewCount.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="card-price-row">
          <span className="card-price">₹{product.price.toLocaleString('en-IN')}</span>
        </div>

        {/* Stock indicator */}
        {product.stock !== undefined && (
          <span className={`card-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {product.stock > 0
              ? product.stock < 10 ? `Only ${product.stock} left` : 'In Stock'
              : 'Out of Stock'}
          </span>
        )}

        {/* Delivery */}
        <div className="card-delivery">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <rect x="1" y="3" width="15" height="13" rx="1" />
            <path d="M16 8h4l3 4v5h-7V8z" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
          <span>FREE delivery</span>
        </div>

        {/* Actions */}
        <div className="card-actions">
          <button
            onClick={() => addToCart(product)}
            className="card-btn"
            aria-label={`Add ${product.name} to cart`}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>

          {/* Admin delete — only rendered when onDelete prop is provided */}
          {onDelete && (
            <button
              onClick={() => {
                if (window.confirm(`Delete "${product.name}"? This cannot be undone.`)) {
                  onDelete(product._id);
                }
              }}
              className="card-btn-delete"
              aria-label={`Delete ${product.name}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
              Delete
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
