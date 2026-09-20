import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

export default function AuthModal({ isOpen, initialTab, onClose, onLoginSuccess, showToast }) {
  const [tab, setTab] = useState(initialTab || 'login');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const endpoint = tab === 'login' ? '/api/login' : '/api/register';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      if (tab === 'login') {
        onLoginSuccess(data.user, data.token);
        onClose();
      } else {
        showToast('Success', 'Registration successful! Please log in.');
        setTab('login');
      }
    } catch (err) {
      showToast('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
        <div className="d-flex justify-content-between mb-3">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <button
                className={`nav-link ${tab === 'login' ? 'active' : ''}`}
                onClick={() => setTab('login')}
              >
                Login
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${tab === 'register' ? 'active' : ''}`}
                onClick={() => setTab('register')}
              >
                Register
              </button>
            </li>
          </ul>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        <form onSubmit={handleSubmit}>
          {tab === 'register' && (
            <>
              <div className="mb-2">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  required
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <div className="mb-2">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              required
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              required
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Processing...' : tab === 'login' ? 'Login' : 'Register'}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}