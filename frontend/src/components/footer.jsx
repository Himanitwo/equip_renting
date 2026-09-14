import React from 'react';

export default function Footer({ setActivePage }) {
  return (
    <footer id="contact-section" className="bg-brand-dark text-white pt-5 pb-3 border-top border-4 border-brand-orange mt-auto">
      <div className="container border-bottom border-secondary pb-4 mb-3">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="bg-brand-orange rounded-circle d-flex align-items-center justify-content-center text-white" style={{ width: '36px', height: '36px' }}>
                <i className="fa-solid fa-truck-monster fs-6"></i>
              </div>
              <span className="fs-5 fw-bolder tracking-tight">EquipEase</span>
            </div>
            <p className="text-xs text-white-50 lh-base">
              Construction, Agriculture & Industrial Equipment Leasing & Rental Platform. Designed to optimize project management and fleet bookings.
            </p>
          </div>

          <div className="col-12 col-md-4">
            <h4 className="fw-bold text-sm text-uppercase tracking-wider text-brand-orange mb-3">Quick Links</h4>
            <ul className="list-unstyled text-xs space-y-2 mb-0">
              <li className="mb-2"><button onClick={() => setActivePage('home')} className="btn btn-link text-white-50 p-0 text-decoration-none">Home Page</button></li>
              <li className="mb-2"><button onClick={() => setActivePage('customer')} className="btn btn-link text-white-50 p-0 text-decoration-none">Customer Dashboard</button></li>
              <li><button onClick={() => setActivePage('admin')} className="btn btn-link text-white-50 p-0 text-decoration-none">Admin Control Dashboard</button></li>
            </ul>
          </div>

          <div className="col-12 col-md-4">
            <h4 className="fw-bold text-sm text-uppercase tracking-wider text-brand-orange mb-3">Have Questions?</h4>
            <div className="text-xs text-white-50 d-flex flex-column gap-2">
              <span className="d-flex align-items-center gap-2"><i className="fa-solid fa-location-dot text-brand-orange"></i> #890 Design Expert Hub, Mayur Vihar, Delhi - India</span>
              <span className="d-flex align-items-center gap-2"><i className="fa-solid fa-phone text-brand-orange"></i> +91 7894561239</span>
              <span className="d-flex align-items-center gap-2"><i className="fa-solid fa-envelope text-brand-orange"></i> info@equipease.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container text-center text-md-start d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 text-white-50 text-xs">
        <p className="mb-0">© 2026 EquipEase Equipment Leasing & Rental System. All rights reserved.</p>
      </div>
    </footer>
  );
}