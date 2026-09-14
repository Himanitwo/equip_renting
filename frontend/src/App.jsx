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
  const [authModal, setAuthModal] = useState({ open: false, tab: 'login' });
  const [bookingModal, setBookingModal] = useState({ open: false, equipId: null });
  const [toast, setToast] = useState({ visible: false, title: '', message: '' });

  const [equipmentList, setEquipmentList] = useState([
    { id: 1, name: 'Wolf Garten Mower', category: 'Agriculture', rate: 500, status: 'Available', img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80' },
    { id: 2, name: 'Sony FX3 Cinema Camera', category: 'Photography', rate: 1200, status: 'Available', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80' },
    { id: 3, name: 'JBL Line Array Speakers', category: 'AudioVisual', rate: 1500, status: 'Available', img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=400&q=80' }
  ]);

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const res = await fetch('/api/equipment');
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setEquipmentList(data);
      }
    } catch {
      // Fallback to static items if endpoint is offline
    }
  };

  const showToast = (title, message) => {
    setToast({ visible: true, title, message });
    setTimeout(() => {
      setToast({ visible: false, title: '', message: '' });
    }, 4000);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        openAuthModal={(tab) => setAuthModal({ open: true, tab })}
        openBookingModal={() => setBookingModal({ open: true, equipId: null })}
      />

      {activePage === 'home' && (
        <Home
          equipmentList={equipmentList}
          openBookingModalWithItem={(id) => setBookingModal({ open: true, equipId: id })}
          openBookingModal={() => setBookingModal({ open: true, equipId: null })}
        />
      )}

      {activePage === 'customer' && (
        <CustomerDashboard
          openBookingModal={() => setBookingModal({ open: true, equipId: null })}
          showToast={showToast}
        />
      )}

      {activePage === 'admin' && (
        <AdminDashboard showToast={showToast} />
      )}

      <Footer setActivePage={setActivePage} />

      {/* Global Modals & Notifications */}
      <AuthModal
        isOpen={authModal.open}
        initialTab={authModal.tab}
        onClose={() => setAuthModal({ ...authModal, open: false })}
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