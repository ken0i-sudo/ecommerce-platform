// frontend/src/components/Navbar.js
function Navbar({ cartCount, searchQuery, onSearchChange, onAdminToggle, adminOpen, onOrdersToggle, onCartClick }) {
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      {/* Left: Logo */}
      <div className="navbar-left">
        <a href="/" className="navbar-logo" aria-label="ShopZen Home">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span>ShopZen</span>
        </a>
      </div>

      {/* Center: Search */}
      <div className="navbar-search" role="search">
        <div className="search-input-wrapper">
        
          <input
            type="search"
            className="search-input"
            placeholder="Search for products, brands, and more..."
            aria-label="Search products"
            autoComplete="off"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <button className="search-btn" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
        </div>
      </div>

      {/* Right: Admin, Account, Cart */}
      <div className="navbar-right">
        <button
          className={`nav-admin-btn ${adminOpen ? 'active' : ''}`}
          onClick={onAdminToggle}
          aria-label="Toggle admin panel"
          aria-expanded={adminOpen}
          title="Admin Panel"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="8" r="4" />
            <path d="M20 21a8 8 0 1 0-16 0" />
            <path d="M16 11l2 2 4-4" />
          </svg>
          <span>Admin</span>
        </button>

        <button type="button" className="nav-link nav-link-btn" aria-label="Returns and Orders" onClick={onOrdersToggle}>
          <span className="nav-link-line1">Returns</span>
          <span className="nav-link-line2">&amp; Orders</span>
        </button>

        <button
          className="nav-cart"
          onClick={onCartClick}
          aria-label={`Shopping cart, ${cartCount} item${cartCount !== 1 ? 's' : ''}`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="cart-count-badge" aria-live="polite">{cartCount}</span>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
