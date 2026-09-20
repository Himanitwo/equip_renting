import React from 'react';

export default function Navbar({ activePage, setActivePage, user, onLogout, openAuthModal }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a
          className="navbar-brand fw-bold"
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            setActivePage('home');
          }}
        >
          EquipRent
        </a>

        <div className="collapse navbar-collapse">
          <ul className="navbar-header nav me-auto">
            <li className="nav-item">
              <button
                className={`nav-link text-white btn btn-link ${activePage === 'home' ? 'fw-bold' : ''}`}
                onClick={() => setActivePage('home')}
              >
                Home
              </button>
            </li>

            {user && (
              <li className="nav-item">
                <button
                  className={`nav-link text-white btn btn-link ${activePage === 'customer' ? 'fw-bold' : ''}`}
                  onClick={() => setActivePage('customer')}
                >
                  My Dashboard
                </button>
              </li>
            )}

            {user && user.role === 'admin' && (
              <li className="nav-item">
                <button
                  className={`nav-link text-white btn btn-link ${activePage === 'admin' ? 'fw-bold' : ''}`}
                  onClick={() => setActivePage('admin')}
                >
                  Admin Panel
                </button>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-2">
            {user ? (
              <>
                <span className="text-light me-2">
                  {user.name} <span className="badge bg-secondary ms-1">{user.role}</span>
                </span>
                <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={() => openAuthModal('login')}
                >
                  Login
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => openAuthModal('register')}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}