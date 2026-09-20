import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import AuthModal from './components/authmodel';
import BookingModal from './components/bookingmodal';
import ToastNotification from './components/toastnotification';

import Home from './pages/home';
import CustomerDashboard from './pages/customerdashboard';
import AdminDashboard from './pages/admindashboard';

import './App.css';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [user, setUser] = useState(null);
  const [authModal, setAuthModal] = useState({ open: false, tab: 'login' });
  const [bookingModal, setBookingModal] = useState({ open: false, equipId: null });
  const [toast, setToast] = useState({ visible: false, title: '', message: '' });

  const [equipmentList, setEquipmentList] = useState([]);

  // Restore Session on App Load
  useEffect(() => {
    const savedUser = localStorage.getItem('user_session');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('user_session');
      }
    }
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const res = await fetch('/api/equipment');
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setEquipmentList(data);
      }
    } catch (err) {
      console.error('Failed to load equipment:', err);
    }
  };

  // Login Handler & Directing by Role
  const handleLoginSuccess = (userData, token) => {
    localStorage.setItem('user_session', JSON.stringify(userData));
    localStorage.setItem('auth_token', token);
    setUser(userData);

    if (userData.role === 'admin') {
      setActivePage('admin');
    } else {
      setActivePage('customer');
    }

    showToast('Welcome', `Logged in as ${userData.name}`);
  };

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem('user_session');
    localStorage.removeItem('auth_token');
    setUser(null);
    setActivePage('home');
    showToast('Logged Out', 'You have been successfully logged out.');
  };

  const showToast = (title, message) => {
    setToast({ visible: true, title, message });
    setTimeout(() => setToast({ visible: false, title: '', message: '' }), 4000);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        user={user}
        onLogout={handleLogout}
        openAuthModal={(tab) => setAuthModal({ open: true, tab })}
        openBookingModal={() => setBookingModal({ open: true, equipId: null })}
      />

      {/* Home Route */}
      {activePage === 'home' && (
        <Home
          equipmentList={equipmentList}
          openBookingModalWithItem={(id) => setBookingModal({ open: true, equipId: id })}
          openBookingModal={() => setBookingModal({ open: true, equipId: null })}
        />
      )}

      {/* Customer Dashboard Route */}
      {activePage === 'customer' && (
        user ? (
          <CustomerDashboard
            user={user}
            openBookingModal={() => setBookingModal({ open: true, equipId: null })}
            showToast={showToast}
          />
        ) : (
          <div className="container py-5 text-center">
            <h2>Access Restricted</h2>
            <p className="text-muted">Please log in to access your customer dashboard.</p>
            <button className="btn btn-primary" onClick={() => setAuthModal({ open: true, tab: 'login' })}>
              Log In Now
            </button>
          </div>
        )
      )}

      {/* Admin Dashboard Route */}
      {activePage === 'admin' && (
        user && user.role === 'admin' ? (
          <AdminDashboard showToast={showToast} />
        ) : (
          <div className="container py-5 text-center">
            <h2>Unauthorized</h2>
            <p className="text-danger">Administrator privileges are required to access this area.</p>
          </div>
        )
      )}

      <Footer setActivePage={setActivePage} />

      <AuthModal
        isOpen={authModal.open}
        initialTab={authModal.tab}
        onClose={() => setAuthModal({ ...authModal, open: false })}
        onLoginSuccess={handleLoginSuccess}
        showToast={showToast}
      />

      <BookingModal
        isOpen={bookingModal.open}
        selectedEquipId={bookingModal.equipId}
        equipmentList={equipmentList}
        onClose={() => setBookingModal({ ...bookingModal, open: false })}
        showToast={showToast}
      />

      <ToastNotification toast={toast} onClose={() => setToast({ ...toast, visible: false })} />
    </div>
  );
}