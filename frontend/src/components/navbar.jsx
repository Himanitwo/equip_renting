import React, { useState } from 'react';

export default function Navbar({ activePage, setActivePage, openAuthModal, openBookingModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-brand-dark text-white text-xs py-1.5 px-3 border-bottom border-secondary">
        <div className="container d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div className="d-flex align-items-center gap-3 text-nowrap">
            <a href="tel:+917894561239" className="text-white text-decoration-none d-flex align-items-center gap-1">
              <i className="fa-solid fa-phone text-brand-orange"></i>
              <span className="d-none d-sm-inline">+91 7894561239</span>
            </a>
            <a href="mailto:info@equipease.com" className="text-white text-decoration-none d-none d-md-flex align-items-center gap-1">
              <i className="fa-solid fa-envelope text-brand-orange"></i> info@equipease.com
            </a>
          </div>

          <div className="d-flex align-items-center gap-2 fw-semibold ms-auto text-nowrap">
            <button onClick={() => openAuthModal('login')} className="btn btn-link text-white text-decoration-none p-0 text-xs shadow-none">
              <i className="fa-solid fa-right-to-bracket me-1 text-brand-orange"></i> LOGIN
            </button>
            <span className="text-white-50">|</span>
            <button onClick={() => openAuthModal('register')} className="btn btn-link text-white text-decoration-none p-0 text-xs shadow-none">
              <i className="fa-solid fa-user-plus me-1 text-brand-orange"></i> <span className="d-none d-sm-inline">SIGNUP</span>
            </button>
            <button 
              onClick={() => setActivePage('admin')} 
              className="btn btn-brand-orange rounded-pill py-0.5 px-2 px-sm-3 text-xs fw-bold border-0 text-decoration-none ms-1"
            >
              <i className="fa-solid fa-user-shield me-1"></i> <span className="d-none d-sm-inline">ADMIN</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Nav */}
      <header className="bg-white border-bottom border-brand-cream sticky-top shadow-sm">
        <div className="container d-flex align-items-center justify-content-between" style={{ height: '70px' }}>
          <button onClick={() => setActivePage('home')} className="d-flex align-items-center gap-2 text-decoration-none text-brand-dark border-0 bg-transparent text-start p-0">
            <div className="rounded-circle bg-brand-orange d-flex align-items-center justify-content-center text-white shadow-sm flex-shrink-0" style={{ width: '42px', height: '42px', fontSize: '1.2rem' }}>
              <i className="fa-solid fa-truck-monster"></i>
            </div>
            <div className="d-flex flex-column justify-content-center">
              <span className="fs-5 fw-bolder tracking-tight lh-1 text-nowrap">EquipEase</span>
              <span className="d-none d-xxl-block text-brand-orange text-uppercase fw-bold tracking-wider text-nowrap mt-1" style={{ fontSize: '8.5px' }}>
                Equipment Leasing & Rental Management
              </span>
            </div>
          </button>

          <nav className="d-none d-xl-flex align-items-center gap-4 text-sm fw-bold text-uppercase tracking-wider me-auto ms-4">
            <button onClick={() => setActivePage('home')} className={`btn btn-link p-0 text-decoration-none text-nowrap ${activePage === 'home' ? 'text-brand-orange fw-extrabold' : 'text-slate-700'}`}>
              Home
            </button>
            <button onClick={() => setActivePage('customer')} className={`btn btn-link p-0 text-decoration-none text-nowrap ${activePage === 'customer' ? 'text-brand-orange fw-extrabold' : 'text-slate-700'}`}>
              My Bookings
            </button>
            <a href="#contact-section" className="text-slate-700 text-decoration-none text-nowrap">Contact</a>
          </nav>

          <div className="d-flex align-items-center gap-2 flex-shrink-0">
            <button onClick={openBookingModal} className="d-none d-xl-flex align-items-center gap-2 btn btn-brand-orange fw-bold text-xs text-uppercase tracking-wider rounded-pill px-4 py-2 shadow-sm transition text-nowrap">
              <i className="fa-solid fa-calendar-plus text-sm"></i> Rent / Lease Now
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="d-xl-none btn text-brand-dark fs-3 shadow-none border-0 p-1">
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="bg-white border-bottom border-brand-cream px-3 py-3 fw-semibold text-sm d-xl-none">
            <div className="d-flex flex-column gap-2">
              <button onClick={() => { setActivePage('home'); setMobileMenuOpen(false); }} className="btn text-start text-brand-orange fw-bold p-2">Home</button>
              <button onClick={() => { setActivePage('customer'); setMobileMenuOpen(false); }} className="btn text-start text-brand-dark p-2">My Bookings</button>
              <button onClick={() => { setActivePage('admin'); setMobileMenuOpen(false); }} className="btn text-start text-brand-dark p-2">Admin Dashboard</button>
              <hr className="my-1 border-brand-cream" />
              <button onClick={() => { openBookingModal(); setMobileMenuOpen(false); }} className="btn btn-brand-orange text-white rounded-pill p-2 fw-bold text-center text-xs text-uppercase">
                <i className="fa-solid fa-calendar-plus me-1"></i> Rent / Lease Now
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}