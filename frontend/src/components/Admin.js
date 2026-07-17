// frontend/src/components/Admin.js
import { useState } from "react";
import api from "../service/api";

const EMPTY_FORM = {
  name: '',
  image: '',
  price: '',
  category: '',
  stock: '',
  description: ''
};

function Admin({ refreshProducts, showToast }) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = 'Valid price required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.stock || Number(formData.stock) < 0) newErrors.stock = 'Valid stock quantity required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    return newErrors;
  };

  const addProduct = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await api.post('/api/products', {
        name: formData.name.trim(),
        image: formData.image.trim(),
        price: Number(formData.price),
        category: formData.category.trim(),
        stock: Number(formData.stock),
        description: formData.description.trim()
      });
      showToast(`"${formData.name}" added successfully!`, 'success');
      setFormData(EMPTY_FORM);
      setErrors({});
      refreshProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      showToast(error.response?.data?.message || 'Failed to add product. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2 className="admin-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add New Product
        </h2>
        <p className="admin-subtitle">Fill in the details below to add a new product to the store.</p>
      </div>

      <form className="admin-form" onSubmit={addProduct} noValidate>
        <div className="admin-form-grid">
          {/* Product Name */}
          <div className="admin-field">
            <label className="admin-label" htmlFor="admin-name">Product Name *</label>
            <input
              type="text"
              id="admin-name"
              name="name"
              className={`admin-input ${errors.name ? 'input-error' : ''}`}
              placeholder="e.g. Sony WH-1000XM5 Headphones"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          {/* Category */}
          <div className="admin-field">
            <label className="admin-label" htmlFor="admin-category">Category *</label>
            <input
              type="text"
              id="admin-category"
              name="category"
              className={`admin-input ${errors.category ? 'input-error' : ''}`}
              placeholder="e.g. Electronics"
              value={formData.category}
              onChange={handleChange}
            />
            {errors.category && <span className="field-error">{errors.category}</span>}
          </div>

          {/* Price */}
          <div className="admin-field">
            <label className="admin-label" htmlFor="admin-price">Price (₹) *</label>
            <input
              type="number"
              id="admin-price"
              name="price"
              className={`admin-input ${errors.price ? 'input-error' : ''}`}
              placeholder="e.g. 29999"
              min="0"
              step="1"
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && <span className="field-error">{errors.price}</span>}
          </div>

          {/* Stock */}
          <div className="admin-field">
            <label className="admin-label" htmlFor="admin-stock">Stock Quantity *</label>
            <input
              type="number"
              id="admin-stock"
              name="stock"
              className={`admin-input ${errors.stock ? 'input-error' : ''}`}
              placeholder="e.g. 100"
              min="0"
              step="1"
              value={formData.stock}
              onChange={handleChange}
            />
            {errors.stock && <span className="field-error">{errors.stock}</span>}
          </div>

          {/* Image URL — full width */}
          <div className="admin-field admin-field-full">
            <label className="admin-label" htmlFor="admin-image">Image URL *</label>
            <input
              type="url"
              id="admin-image"
              name="image"
              className={`admin-input ${errors.image ? 'input-error' : ''}`}
              placeholder="https://example.com/product-image.jpg"
              value={formData.image}
              onChange={handleChange}
            />
            {errors.image && <span className="field-error">{errors.image}</span>}
          </div>

          {/* Description — full width */}
          <div className="admin-field admin-field-full">
            <label className="admin-label" htmlFor="admin-description">Description *</label>
            <textarea
              id="admin-description"
              name="description"
              className={`admin-input admin-textarea ${errors.description ? 'input-error' : ''}`}
              placeholder="Describe the product features, specifications, and highlights..."
              rows={3}
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && <span className="field-error">{errors.description}</span>}
          </div>
        </div>

        <div className="admin-form-actions">
          <button
            type="button"
            className="admin-btn-secondary"
            onClick={() => { setFormData(EMPTY_FORM); setErrors({}); }}
            disabled={loading}
          >
            Clear Form
          </button>
          <button
            type="submit"
            className="admin-btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="spin-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Adding...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Admin;
