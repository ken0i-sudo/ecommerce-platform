// frontend/src/components/Cart.js
function Cart({ cart, removeFromCart, updateQuantity }) {
  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const itemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div className="cart" role="region" aria-label="Shopping cart">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <span className="cart-subtotal">
          {itemCount} item{itemCount !== 1 ? 's' : ''}
        </span>
      </div>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <p>Your cart is empty</p>
          <p className="cart-empty-sub">Add some products to get started!</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div className="cart-item" key={`${item._id}-${index}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="cart-item-details">
                  <h4 className="cart-item-title">{item.name}</h4>
                  <span className="cart-item-price">
                    ₹{(item.price * (item.quantity || 1)).toLocaleString('en-IN')}
                  </span>
                  {item.quantity > 1 && (
                    <span className="cart-item-unit">
                      ₹{item.price.toLocaleString('en-IN')} each
                    </span>
                  )}
                  <div className="cart-item-qty">
                    <label htmlFor={`qty-${index}`} className="qty-label">Qty:</label>
                    <select
                      id={`qty-${index}`}
                      className="qty-select"
                      value={item.quantity || 1}
                      onChange={(e) => updateQuantity(index, Number(e.target.value))}
                      aria-label={`Quantity for ${item.name}`}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="cart-item-actions">
                  <button
                    className="cart-item-remove"
                    onClick={() => removeFromCart(index)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary-row total">
            <span>Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})</span>
            <span className="price">₹{total.toLocaleString('en-IN')}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
