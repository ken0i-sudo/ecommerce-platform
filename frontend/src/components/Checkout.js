// frontend/src/components/Checkout.js
import { useState } from "react";
import api from "../service/api";

function Checkout({ cart, clearCart, showToast }) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null); // holds order data on success

  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const itemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Full name is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Email is required';
    } else if (!emailRegex.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Enter a valid email address';
    }
    const phoneClean = formData.customerPhone.replace(/[\s\-+()]/g, '');
    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Phone number is required';
    } else if (phoneClean.length < 10 || !/^\d+$/.test(phoneClean)) {
      newErrors.customerPhone = 'Enter a valid 10-digit phone number';
    }
    if (!formData.customerAddress.trim()) {
      newErrors.customerAddress = 'Delivery address is required';
    } else if (formData.customerAddress.trim().length < 20) {
      newErrors.customerAddress = 'Please provide a complete address (include city, state, PIN)';
    }
    return newErrors;
  };

  const placeOrder = async () => {
    if (cart.length === 0) {
      showToast('Your cart is empty. Add products before placing an order.', 'error');
      return;
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/api/orders', {
        customerName: formData.customerName.trim(),
        customerEmail: formData.customerEmail.trim(),
        customerPhone: formData.customerPhone.trim(),
        customerAddress: formData.customerAddress.trim(),
        products: cart.map(item => ({
          name: item.name,
          quantity: item.quantity || 1,
          price: item.price
        })),
        totalAmount: total
      });

      setOrderSuccess({
        orderId: response.data._id || 'ORD-' + Date.now(),
        customerName: formData.customerName,
        totalAmount: total,
        itemCount
      });
      clearCart();
      setFormData({ customerName: '', customerEmail: '', customerPhone: '', customerAddress: '' });
      setErrors({});
      showToast('Order placed successfully! 🎉', 'success');
    } catch (error) {
      console.error('Order error:', error);
      showToast(
        error.response?.data?.message || 'Order failed. Please check your connection and try again.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  // ─── Order success screen ────────────────────────────────────
  if (orderSuccess) {
    return (
      <div className="checkout order-success" role="region" aria-label="Order confirmation">
        <div className="order-success-icon" aria-hidden="true">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h2 className="order-success-title">Order Placed!</h2>
        <p className="order-success-sub">
          Thank you, <strong>{orderSuccess.customerName}</strong>! Your order has been received.
        </p>
        <div className="order-success-details">
          <div className="order-detail-row">
            <span>Order ID</span>
            <span className="order-detail-value">#{orderSuccess.orderId.toString().slice(-8).toUpperCase()}</span>
          </div>
          <div className="order-detail-row">
            <span>Items</span>
            <span className="order-detail-value">{orderSuccess.itemCount}</span>
          </div>
          <div className="order-detail-row total">
            <span>Total Paid</span>
            <span className="order-detail-value price">₹{orderSuccess.totalAmount.toLocaleString('en-IN')}</span>
          </div>
        </div>
        <p className="order-success-delivery">
          📦 Estimated delivery in 3–5 business days.
        </p>
        <button
          className="checkout-place-order"
          onClick={() => setOrderSuccess(null)}
          style={{ marginTop: '1.5rem' }}
        >
          Place Another Order
        </button>
      </div>
    );
  }

  return (
    <div className="checkout" role="region" aria-label="Checkout">
      <h2>Checkout</h2>

      {cart.length === 0 && (
        <div className="checkout-empty-notice">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          Add items to your cart to proceed with checkout.
        </div>
      )}

      <div className="checkout-section">
        <h3 className="checkout-section-title">Contact Information</h3>

        <div className="checkout-field full-width">
          <label className="checkout-label" htmlFor="customerName">Full Name *</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            className={`checkout-input ${errors.customerName ? 'input-error' : ''}`}
            value={formData.customerName}
            onChange={handleChange}
            required
            autoComplete="name"
            placeholder="Enter your full name"
          />
          {errors.customerName && <span className="field-error">{errors.customerName}</span>}
        </div>

        <div className="checkout-row">
          <div className="checkout-field">
            <label className="checkout-label" htmlFor="customerEmail">Email *</label>
            <input
              type="email"
              id="customerEmail"
              name="customerEmail"
              className={`checkout-input ${errors.customerEmail ? 'input-error' : ''}`}
              value={formData.customerEmail}
              onChange={handleChange}
              required
              autoComplete="email"
              placeholder="you@example.com"
            />
            {errors.customerEmail && <span className="field-error">{errors.customerEmail}</span>}
          </div>
          <div className="checkout-field">
            <label className="checkout-label" htmlFor="customerPhone">Phone *</label>
            <input
              type="tel"
              id="customerPhone"
              name="customerPhone"
              className={`checkout-input ${errors.customerPhone ? 'input-error' : ''}`}
              value={formData.customerPhone}
              onChange={handleChange}
              required
              autoComplete="tel"
              placeholder="+91 98765 43210"
            />
            {errors.customerPhone && <span className="field-error">{errors.customerPhone}</span>}
          </div>
        </div>
      </div>

      <div className="checkout-section">
        <h3 className="checkout-section-title">Shipping Address</h3>

        <div className="checkout-field full-width">
          <label className="checkout-label" htmlFor="customerAddress">Full Address *</label>
          <textarea
            id="customerAddress"
            name="customerAddress"
            className={`checkout-textarea ${errors.customerAddress ? 'input-error' : ''}`}
            value={formData.customerAddress}
            onChange={handleChange}
            required
            autoComplete="street-address"
            placeholder="House/Flat No., Building, Street, Area, City, State, PIN Code"
            rows={4}
          />
          {errors.customerAddress && <span className="field-error">{errors.customerAddress}</span>}
          <p className="field-hint">Include landmark, city, state, and PIN code</p>
        </div>
      </div>

      {/* Order Summary */}
      <aside className="checkout-summary" aria-label="Order summary">
        <h3 className="checkout-summary-title">Order Summary</h3>
        <div className="checkout-summary-row">
          <span>Items ({itemCount})</span>
          <span className="price">₹{total.toLocaleString('en-IN')}</span>
        </div>
        <div className="checkout-summary-row">
          <span>Shipping &amp; Handling</span>
          <span className="price free-tag">FREE</span>
        </div>
        <div className="checkout-summary-row">
          <span>Estimated Tax</span>
          <span className="price">₹0.00</span>
        </div>
        <div className="checkout-summary-row total">
          <span>Order Total</span>
          <span className="price">₹{total.toLocaleString('en-IN')}</span>
        </div>
      </aside>

      <button
        type="button"
        onClick={placeOrder}
        disabled={loading || cart.length === 0}
        className="checkout-place-order"
      >
        {loading ? (
          <>
            <svg className="spin-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            Placing Order...
          </>
        ) : (
          cart.length > 0
            ? `Place Order — ₹${total.toLocaleString('en-IN')}`
            : 'Add items to cart'
        )}
      </button>
    </div>
  );
}

export default Checkout;
