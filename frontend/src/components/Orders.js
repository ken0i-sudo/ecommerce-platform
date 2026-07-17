import React, { useEffect, useState } from "react";
import api from "../service/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/orders")
      .then((res) => {
        // Sort orders so latest is first
        const sorted = (res.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sorted);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  if (loading) {
    return (
      <div className="orders-container">
        <h1 className="orders-page-title">Your Orders</h1>
        <div className="orders-list">
          {[1, 2].map((n) => (
            <div key={n} className="order-card skeleton-card-order">
              <div className="skeleton-block skeleton-order-header" />
              <div className="skeleton-block skeleton-order-body" />
              <div className="skeleton-block skeleton-order-footer" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h1 className="orders-page-title">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <p className="empty-orders-title">No orders found</p>
          <p className="empty-orders-sub">You haven't placed any orders yet. Visit the shop page to get started!</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              {/* Header section of the card */}
              <div className="order-card-header">
                <div className="order-meta-info">
                  <span className="order-id-label">ORDER ID</span>
                  <span className="order-id-value">#{order._id.toString().slice(-8).toUpperCase()}</span>
                </div>
                <div className="order-meta-info">
                  <span className="order-id-label">PLACED ON</span>
                  <span className="order-id-value">{formatDate(order.createdAt)}</span>
                </div>
                <div className="order-meta-info">
                  <span className="order-id-label">STATUS</span>
                  <span className="order-status-badge">Processing</span>
                </div>
              </div>

              {/* Body / Content of the card */}
              <div className="order-card-body">
                <div className="order-items-list">
                  {order.products.map((item, idx) => (
                    <div className="order-item-row" key={idx}>
                      <span className="order-item-bullet"></span>
                      <div className="order-item-info">
                        <span className="order-item-name">{item.name}</span>
                        <span className="order-item-qty">Qty: {item.quantity}</span>
                      </div>
                      <span className="order-item-price">₹{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>

                <div className="order-shipping-details">
                  <h4 className="shipping-details-title">Delivery Address</h4>
                  <p className="shipping-customer-name">{order.customerName}</p>
                  <p className="shipping-address-text">{order.customerAddress}</p>
                  <p className="shipping-phone">📞 {order.customerPhone}</p>
                </div>
              </div>

              {/* Footer section of the card */}
              <div className="order-card-footer">
                <span>Total Amount Paid</span>
                <span className="order-total-amount">₹{(order.totalAmount || 0).toLocaleString('en-IN')}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;