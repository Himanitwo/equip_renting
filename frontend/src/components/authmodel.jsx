import React, { useState } from 'react';

export default function AuthModal({ isOpen, initialTab = 'login', onClose, showToast }) {
  const [tab, setTab] = useState(initialTab);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [regData, setRegData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });

  if (!isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      const data = await res.json();
      if (res.ok) {
        showToast('Login Successful', 'Welcome back to EquipEase!');
        onClose();
      } else {
        showToast('Authentication Error', data.error || 'Invalid credentials');
      }
    } catch {
      showToast('Error', 'Unable to reach the server.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (regData.password !== regData.confirmPassword) {
      showToast('Validation Error', 'Passwords do not match');
      return;
    }
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regData)
      });
      const data = await res.json();
      if (res.ok) {
        showToast('Registration Successful', 'Account created! Please log in.');
        setTab('login');
      } else {
        showToast('Error', data.error || 'Registration failed');
      }
    } catch {
      showToast('Error', 'Unable to reach server.');
    }
  };

  return (
    <div className="custom-modal-overlay">
      <div className="bg-white w-100 rounded-3 shadow-lg overflow-hidden border border-orange-100 position-relative" style={{ maxWidth: '450px' }}>
        <div className="bg-topbar-gradient text-white p-4 d-flex justify-content-between align-items-center">
          <div>
            <h3 className="fs-5 fw-bolder text-uppercase tracking-tight mb-0">Account Access</h3>
            <p className="text-xs text-white-50 mb-0">EquipEase Rental Portal</p>
          </div>
          <button onClick={onClose} className="btn-close btn-close-white shadow-none"></button>
        </div>

        <div className="d-flex border-bottom border-orange-100 bg-orange-50">
          <button onClick={() => setTab('login')} className={`btn flex-fill py-3 rounded-0 text-xs fw-bold text-uppercase tracking-wider ${tab === 'login' ? 'text-brandRed border-bottom border-2 border-danger bg-white' : 'text-slate-500'}`}>
            Login
          </button>
          <button onClick={() => setTab('register')} className={`btn flex-fill py-3 rounded-0 text-xs fw-bold text-uppercase tracking-wider ${tab === 'register' ? 'text-brandRed border-bottom border-2 border-danger bg-white' : 'text-slate-500'}`}>
            Register
          </button>
        </div>

        <div className="p-4">
          {tab === 'login' ? (
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-3">
                <label className="form-label text-xs fw-bold text-uppercase text-slate-700 mb-1">Email Address *</label>
                <input type="email" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} required className="form-control py-2 text-xs border-slate-300" />
              </div>
              <div className="mb-4">
                <label className="form-label text-xs fw-bold text-uppercase text-slate-700 mb-1">Password *</label>
                <input type="password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} required className="form-control py-2 text-xs border-slate-300" />
              </div>
              <button type="submit" className="btn bg-brandRed text-white w-100 fw-bold py-2 text-xs text-uppercase tracking-wider shadow-sm">Sign In</button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit}>
              <div className="mb-2">
                <label className="form-label text-xs fw-bold text-uppercase text-slate-700 mb-1">Full Name *</label>
                <input type="text" value={regData.name} onChange={(e) => setRegData({ ...regData, name: e.target.value })} required className="form-control py-1 text-xs border-slate-300" />
              </div>
              <div className="mb-2">
                <label className="form-label text-xs fw-bold text-uppercase text-slate-700 mb-1">Email Address *</label>
                <input type="email" value={regData.email} onChange={(e) => setRegData({ ...regData, email: e.target.value })} required className="form-control py-1 text-xs border-slate-300" />
              </div>
              <div className="mb-2">
                <label className="form-label text-xs fw-bold text-uppercase text-slate-700 mb-1">Mobile Phone *</label>
                <input type="tel" value={regData.phone} onChange={(e) => setRegData({ ...regData, phone: e.target.value })} required className="form-control py-1 text-xs border-slate-300" />
              </div>
              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="form-label text-xs fw-bold text-uppercase text-slate-700 mb-1">Password *</label>
                  <input type="password" value={regData.password} onChange={(e) => setRegData({ ...regData, password: e.target.value })} required className="form-control py-1 text-xs border-slate-300" />
                </div>
                <div className="col-6">
                  <label className="form-label text-xs fw-bold text-uppercase text-slate-700 mb-1">Confirm *</label>
                  <input type="password" value={regData.confirmPassword} onChange={(e) => setRegData({ ...regData, confirmPassword: e.target.value })} required className="form-control py-1 text-xs border-slate-300" />
                </div>
              </div>
              <button type="submit" className="btn bg-brandOrange text-white w-100 fw-bold py-2 text-xs text-uppercase tracking-wider shadow-sm">Create Account</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}