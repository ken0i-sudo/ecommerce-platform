// frontend/src/App.js
import './index.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Admin from './components/Admin';
import Orders from './components/Orders';
import { useState, useCallback } from 'react';

function App() {
  const [cart, setCart] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [adminOpen, setAdminOpen] = useState(false);
  const [toast, setToast] = useState(null); // { message, type: 'success'|'error' }
  const [showOrders, setShowOrders] = useState(false);

  // ─── Toast helper ────────────────────────────────────────────
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  // ─── Cart operations ─────────────────────────────────────────
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.findIndex(item => item._id === product._id);
      if (existing !== -1) {
        // Increment quantity if already in cart
        const updated = [...prev];
        updated[existing] = { ...updated[existing], quantity: updated[existing].quantity + 1 };
        return updated;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`"${product.name}" added to cart`);
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, qty) => {
    if (qty < 1) return;
    setCart(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], quantity: qty };
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  // ─── Product refresh (no page reload) ────────────────────────
  const refreshProducts = () => {
    setRefresh(prev => !prev);
  };

  // ─── Scroll to Shopping Section ─────────────────────────────
  const scrollToCheckout = () => {
    const section = document.querySelector('.shopping-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ─── Total item count (respects quantity) ─────────────────────
  const cartItemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div className="App">
      {/* Toast Notification */}
      {toast && (
        <div className={`toast toast-${toast.type}`} role="alert" aria-live="assertive">
          <span className="toast-icon">
            {toast.type === 'success' ? '✓' : '✕'}
          </span>
          <span className="toast-message">{toast.message}</span>
        </div>
      )}

      <Navbar
        cartCount={cartItemCount}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAdminToggle={() => setAdminOpen(prev => !prev)}
        adminOpen={adminOpen}
        onOrdersToggle={() => setShowOrders(prev => !prev)}
        onCartClick={scrollToCheckout}
      />

      {/* Admin Panel — collapsible */}
      {adminOpen && (
        <Admin refreshProducts={refreshProducts} showToast={showToast} />
      )}

      {showOrders && <Orders />}
      
      <ProductList
        addToCart={addToCart}
        refresh={refresh}
        searchQuery={searchQuery}
        showToast={showToast}
      />

      <div className="shopping-section">
        <Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
        <Checkout cart={cart} clearCart={clearCart} showToast={showToast} />
      </div>
    </div>
  );
}

export default App;
