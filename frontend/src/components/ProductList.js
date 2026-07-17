// frontend/src/components/ProductList.js
import { useEffect, useState } from "react";
import api from "../service/api";
import ProductCard from "./ProductCard";

function ProductList({ addToCart, refresh, searchQuery, showToast }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/products");
      setProducts(response.data);
      const cats = ['All', ...new Set(response.data.map(p => p.category).filter(Boolean))];
      setCategories(cats);
    } catch (error) {
      console.error("Error fetching products:", error);
      showToast('Failed to load products. Is the server running?', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch when refresh token changes (after admin adds a product)
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/api/products/${id}`);
      showToast('Product deleted successfully.', 'success');
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      showToast('Failed to delete product.', 'error');
    }
  };

  // ─── Filtering logic ────────────────────────────────────────
  const filtered = products.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes((searchQuery || '').toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const price = Number(item.price);
    const matchesMin = minPrice === '' || price >= Number(minPrice);
    const matchesMax = maxPrice === '' || price <= Number(maxPrice);
    return matchesSearch && matchesCategory && matchesMin && matchesMax;
  });

  if (loading) {
    return (
      <div className="main-layout" role="status" aria-label="Loading products">
        <aside className="sidebar" aria-hidden="true">
          <div className="skeleton-block skeleton-title" />
          <div className="skeleton-block skeleton-item" />
          <div className="skeleton-block skeleton-item" />
          <div className="skeleton-block skeleton-item" />
        </aside>
        <div className="product-grid">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="card skeleton-card">
              <div className="card-image-wrapper skeleton-image" />
              <div className="card-content">
                <div className="skeleton-block skeleton-text" />
                <div className="skeleton-block skeleton-text skeleton-text-short" />
                <div className="skeleton-block skeleton-price" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="main-layout">
      {/* Sidebar Filters */}
      <aside className="sidebar" aria-label="Product filters">
        <div className="sidebar-section">
          <h3 className="sidebar-title">Categories</h3>
          <div className="filter-group">
            {categories.map((cat) => (
              <label key={cat} className={`filter-label ${selectedCategory === cat ? 'filter-label-active' : ''}`}>
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={selectedCategory === cat}
                  onChange={() => setSelectedCategory(cat)}
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="sidebar-section">
          <h3 className="sidebar-title">Price Range (₹)</h3>
          <div className="price-range">
            <input
              type="number"
              placeholder="Min"
              min="0"
              step="100"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              aria-label="Minimum price"
            />
            <span>–</span>
            <input
              type="number"
              placeholder="Max"
              min="0"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              aria-label="Maximum price"
            />
          </div>
          {(minPrice || maxPrice) && (
            <button
              className="filter-clear-btn"
              onClick={() => { setMinPrice(''); setMaxPrice(''); }}
            >
              Clear price filter
            </button>
          )}
        </div>
      </aside>

      {/* Product Grid */}
      <main>
        <div className="product-grid-header">
          <span className="product-count">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' ? ` in "${selectedCategory}"` : ''}
            {searchQuery ? ` for "${searchQuery}"` : ''}
          </span>
        </div>

        <div className="product-grid" role="list" aria-label="Products">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <p className="empty-state-title">No products found</p>
              <p className="empty-state-sub">
                {searchQuery
                  ? `No results for "${searchQuery}". Try a different search term.`
                  : 'Try adjusting your filters.'}
              </p>
              {(searchQuery || selectedCategory !== 'All' || minPrice || maxPrice) && (
                <button
                  className="empty-state-reset"
                  onClick={() => {
                    setSelectedCategory('All');
                    setMinPrice('');
                    setMaxPrice('');
                  }}
                >
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            filtered.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                addToCart={addToCart}
                onDelete={deleteProduct}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default ProductList;
