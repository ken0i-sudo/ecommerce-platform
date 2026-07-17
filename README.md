# ShopZen

A modern, full-stack e-commerce application built with React, Express, and MongoDB. Features a sleek Amazon-inspired dark theme, responsive design, and a complete shopping experience from product discovery to order management.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-9-47A248?logo=mongodb&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## Overview

**ShopZen** is a mini e-commerce platform that demonstrates a complete shopping workflow. Built as a learning project, it showcases modern full-stack development practices with a focus on clean architecture, responsive UI, and developer experience.

### What it does
- Browse products with search, category filtering, and price range filtering
- Add items to a persistent shopping cart with quantity management
- Complete checkout with form validation (name, email, phone, address)
- View order history with delivery details
- Admin panel for product management (add/delete products)

### Who it's for
- Developers learning full-stack React/Node.js development
- Students building portfolio projects
- Anyone needing a reference e-commerce implementation

### Problem it solves
Provides a production-quality reference implementation of an e-commerce frontend and REST API backend with MongoDB persistence, demonstrating real-world patterns like state management, form validation, optimistic UI updates, and responsive design.

---

## Features

### Product Discovery
- **Product Grid** — Responsive grid layout with lazy-loaded images
- **Search** — Real-time search by product name
- **Category Filters** — Radio-button category filtering with dynamic categories from database
- **Price Range** — Min/max price inputs with clear filter option
- **Skeleton Loading** — Polished loading states during data fetch
- **Empty States** — Helpful messaging when no products match filters

### Product Details
- **Product Cards** — Name, category badge, star rating (generated), price, stock indicator, free delivery tag
- **Stock Awareness** — "Only X left" warnings, disabled add-to-cart when out of stock
- **Image Fallback** — Graceful handling of broken image URLs

### Shopping Cart
- **Quantity Management** — Dropdown selector (1–10) per item
- **Line-item Pricing** — Shows unit price and line total
- **Remove Items** — One-click removal
- **Subtotal Calculation** — Real-time total with item count

### Checkout
- **Form Validation** — Client-side validation for all fields:
  - Full name (required)
  - Email (format validation)
  - Phone (10-digit minimum, numeric)
  - Address (20-char minimum, encourages complete address)
- **Order Summary** — Itemized breakdown with free shipping and tax display
- **Loading States** — Spinner button during API call
- **Success Screen** — Order confirmation with order ID, item count, total, and estimated delivery

### Order Management
- **Order History** — Chronological list (newest first) with full details
- **Order Cards** — Order ID, date, status badge, itemized products, shipping address, total
- **Skeleton Loading** — Consistent loading experience

### Admin Panel
- **Collapsible Panel** — Toggle from navbar
- **Product Creation Form** — Name, category, price, stock, image URL, description
- **Form Validation** — Required fields, numeric constraints, URL validation
- **Auto-refresh** — Product list updates immediately after creation
- **Toast Feedback** — Success/error notifications

### UI/UX
- **Amazon-inspired Dark Theme** — CSS custom properties for consistent theming
- **Light Mode Support** — Opt-in via `data-theme="light"`
- **Fully Responsive** — Mobile-first breakpoints (480px, 768px, 1024px, 1200px)
- **Accessibility** — ARIA labels, semantic HTML, focus-visible outlines, reduced motion support
- **Toast Notifications** — Auto-dismissing success/error messages
- **Custom Scrollbars** — Themed scrollbar styling

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 19, React DOM 19, React Scripts 5 |
| **Backend** | Express 5, Node.js 18+ |
| **Database** | MongoDB (Mongoose 9 ODM) |
| **API Client** | Axios 1.18 |
| **Styling** | Custom CSS with CSS Variables (Design Tokens) |
| **Dev Tools** | Nodemon, ESLint (react-app config) |
| **Testing** | React Testing Library, Jest (via react-scripts) |

---

## Architecture

```
shopzen/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   ├── Product.js            # Product schema
│   │   └── Order.js              # Order schema
│   ├── routes/
│   │   ├── productRoutes.js      # REST endpoints for products
│   │   └── orderRoutes.js        # REST endpoints for orders
│   ├── server.js                 # Express entry point
│   ├── package.json
│   └── .env                      # Environment variables
│
└── frontend/
    ├── public/
    │   ├── index.html
    │   ├── manifest.json
    │   └── favicon.ico
    ├── src/
    │   ├── components/
    │   │   ├── Admin.js          # Admin product creation panel
    │   │   ├── Cart.js           # Shopping cart
    │   │   ├── Checkout.js       # Checkout form + order success
    │   │   ├── Navbar.js         # Top navigation with search
    │   │   ├── Orders.js         # Order history page
    │   │   ├── ProductCard.js    # Individual product card
    │   │   └── ProductList.js    # Product grid + sidebar filters
    │   ├── service/
    │   │   └── api.js            # Axios instance (baseURL: localhost:5000)
    │   ├── styles/
    │   │   ├── design.css        # Design tokens (CSS variables)
    │   │   └── components.css    # Component-specific styles
    │   ├── App.js                # Root component, state orchestration
    │   ├── index.js              # React DOM entry point
    │   └── index.css             # Global imports + reset
    ├── package.json
    └── README.md
```

### Data Models

**Product**
```javascript
{
  name: String (required),
  image: String (required, URL),
  price: Number (required),
  category: String (required),
  stock: Number (required),
  description: String (required),
  timestamps: true
}
```

**Order**
```javascript
{
  customerName: String (required),
  customerEmail: String (required),
  customerPhone: String (required),
  customerAddress: String (required),
  products: [{ name: String, quantity: Number, price: Number }],
  totalAmount: Number (required),
  timestamps: true
}
```

---

## Installation

### Prerequisites
- Node.js 18+
- MongoDB 6+ (local or Atlas)
- npm 9+

### 1. Clone Repository
```bash
git clone <repository-url>
cd "somewhat ecommorse project"
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file (or use existing):
```env
PORT=5000
MONGO_URL=mongodb://localhost:27017/miniecommerce
```

Start backend:
```bash
npm start
# Server runs on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Start frontend:
```bash
npm start
# App runs on http://localhost:3000
```

### 4. Verify
- Backend: `http://localhost:5000` → "Mini E-Commerse APP Backend Running..."
- Frontend: `http://localhost:3000` → ShopZen home page
- API: `http://localhost:5000/api/products` → `[]` (empty array initially)

---

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Backend server port | `5000` | Yes |
| `MONGO_URL` | MongoDB connection string | `mongodb://localhost:27017/miniecommerce` | Yes |

---

## API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | List all products |
| `POST` | `/api/products` | Create product (admin) |
| `DELETE` | `/api/products/:id` | Delete product (admin) |
| `GET` | `/api/orders` | List all orders (newest first) |
| `POST` | `/api/orders` | Create new order |

### Request/Response Examples

**Create Product**
```bash
POST /api/products
Content-Type: application/json

{
  "name": "Sony WH-1000XM5",
  "image": "https://example.com/image.jpg",
  "price": 29999,
  "category": "Electronics",
  "stock": 50,
  "description": "Industry-leading noise canceling..."
}
```

**Create Order**
```bash
POST /api/orders
Content-Type: application/json

{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "9876543210",
  "customerAddress": "123 Main St, City, State 12345",
  "products": [
    { "name": "Sony WH-1000XM5", "quantity": 1, "price": 29999 }
  ],
  "totalAmount": 29999
}
```

---

## Usage

### Customer Flow
1. **Browse** — View products on home page; use search bar and sidebar filters
2. **Add to Cart** — Click "Add to Cart" on any product; toast confirms addition
3. **Review Cart** — Scroll to Shopping Cart section; adjust quantities or remove items
4. **Checkout** — Fill in contact and shipping details; validation prevents incomplete submission
5. **Place Order** — Click "Place Order"; see success screen with order ID and details
6. **View Orders** — Click "Returns & Orders" in navbar to see history

### Admin Flow
1. Click **Admin** button in navbar to expand panel
2. Fill product form (all fields required)
3. Click **Add Product** — toast confirms, product list refreshes automatically
4. Delete products via trash icon on product cards (visible when admin panel is open)

---

## Security

> **Current State**: This is a learning project without authentication. The following are **not implemented** but documented for production considerations:

| Feature | Status | Notes |
|---------|--------|-------|
| JWT Authentication | ❌ Not implemented | Would need auth middleware, protected routes |
| Password Hashing | ❌ Not applicable | No user accounts yet |
| Role-based Authorization | ❌ Not implemented | Admin panel is client-side only |
| Request Validation | ⚠️ Basic | Mongoose schema validation only |
| CORS | ✅ Enabled | Allows all origins (`cors()`) |
| Helmet/Rate Limiting | ❌ Not implemented | Would add in production |
| Input Sanitization | ⚠️ Partial | Client-side validation + Mongoose |

### Production Checklist
- [ ] Add JWT-based authentication (access/refresh tokens)
- [ ] Implement user roles (customer, admin)
- [ ] Protect admin API routes with role middleware
- [ ] Add `helmet`, `express-rate-limit`, `express-validator`
- [ ] Use environment-specific CORS origins
- [ ] Enable MongoDB authentication
- [ ] Enforce HTTPS
- [ ] Implement CSRF protection for forms
- [ ] Add request logging and monitoring

---

## Future Improvements

### High Priority
- [ ] **User Authentication** — Register/login with JWT, protected routes
- [ ] **User Profiles** — Order history tied to account, saved addresses
- [ ] **Payment Integration** — Stripe/Razorpay checkout flow
- [ ] **Product Image Upload** — Cloudinary/S3 instead of external URLs
- [ ] **Inventory Management** — Stock decrement on order, low-stock alerts

### Medium Priority
- [ ] **Product Reviews/Ratings** — User-submitted reviews with moderation
- [ ] **Wishlist** — Save products for later
- [ ] **Coupon/Discount Codes** — Percentage/fixed amount discounts
- [ ] **Order Status Tracking** — Processing → Shipped → Delivered with emails
- [ ] **Email Notifications** — Order confirmation, shipping updates (Nodemailer/SendGrid)

### Low Priority
- [ ] **PWA Support** — Service worker, offline caching, install prompt
- [ ] **Multi-language** — i18n with react-i18next
- [ ] **Advanced Analytics** — Dashboard with sales, conversion, popular products
- [ ] **Admin Dashboard** — Charts, user management, bulk operations
- [ ] **Testing** — Unit tests (Jest), integration tests (Supertest), E2E (Cypress/Playwright)

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style
- Follow existing component patterns (functional components, hooks)
- Use CSS variables from `design.css` — avoid hardcoded values
- Maintain accessibility (ARIA labels, semantic HTML)
- Test responsive breakpoints before submitting

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Author

**Dhavan Chaudhari**
- GitHub: [@ken0i-sudo](https://github.com/ken0i-sudo)
- LinkedIn: [Dhavan Chaudhari](https://linkedin.com/in/dhavan-chaudhari-10a932284)
