import React, { useState } from 'react';

export default function Home({ equipmentList, openBookingModalWithItem, openBookingModal }) {
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = equipmentList.filter((item) => {
    const matchesCat = selectedCat === 'All' || item.category === selectedCat;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <main className="flex-grow-1">
      {/* Hero Banner */}
      <section className="bg-brand-dark py-5 py-lg-5 px-3 text-center text-white position-relative overflow-hidden" style={{ minHeight: '480px', display: 'flex', alignItems: 'center' }}>
        <div className="container position-relative z-1">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8">
              <div className="d-inline-block bg-brand-orange text-white px-3 py-1 rounded-pill text-xs fw-bolder text-uppercase tracking-widest mb-3 shadow-sm">
                <i className="fa-solid fa-shield-halved me-1"></i> Equipment Leasing & Rentals
              </div>
              <h1 className="display-4 fw-bolder tracking-tight text-uppercase mb-3 text-white">
                Construction & Heavy Equipment Leasing
              </h1>
              <p className="lead mb-4 fw-medium text-white-50 fs-6 fs-md-5">
                A middle-ground option between buying and renting. Flexible periodic payments, verified machinery, and full options to acquire equipment at term end.
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
                <a href="#catalog" className="btn btn-brand-orange fw-bolder rounded-pill px-5 py-3 text-sm text-uppercase tracking-wider shadow-sm">
                  View Catalog
                </a>
                <button onClick={openBookingModal} className="btn btn-outline-light fw-bold rounded-pill px-5 py-3 text-sm text-uppercase tracking-wider">
                  Quick Lease Request
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Badges - Infographic Style */}
      <section className="py-5 bg-white border-bottom border-brand-cream">
        <div className="container">
          <div className="text-center mb-4">
            <h3 className="fw-bolder text-uppercase tracking-wider text-brand-dark fs-5">Why Choose Equipment Leasing?</h3>
            <div className="bg-brand-orange mx-auto rounded-pill mt-1" style={{ width: '60px', height: '4px' }}></div>
          </div>

          <div className="row g-4 text-center">
            <div className="col-12 col-md-4 d-flex flex-column align-items-center">
              <div className="bg-brand-cream rounded-circle d-flex align-items-center justify-content-center text-brand-orange fs-2 mb-3 shadow-sm border border-brand-cream" style={{ width: '80px', height: '80px' }}>
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <h4 className="fw-bolder text-xs text-uppercase tracking-wider text-brand-dark mb-1">Preserve Cash Flow</h4>
              <p className="text-muted text-uppercase m-0" style={{ fontSize: '11px' }}>Reduces initial outlay and spreads cost over time.</p>
            </div>

            <div className="col-12 col-md-4 d-flex flex-column align-items-center">
              <div className="bg-brand-cream rounded-circle d-flex align-items-center justify-content-center text-brand-orange fs-2 mb-3 shadow-sm border border-brand-cream" style={{ width: '80px', height: '80px' }}>
                <i className="fa-solid fa-truck-monster"></i>
              </div>
              <h4 className="fw-bolder text-xs text-uppercase tracking-wider text-brand-dark mb-1">Operate Top Machinery</h4>
              <p className="text-muted text-uppercase m-0" style={{ fontSize: '11px' }}>Access updated equipment without full upfront purchase.</p>
            </div>

            <div className="col-12 col-md-4 d-flex flex-column align-items-center">
              <div className="bg-brand-cream rounded-circle d-flex align-items-center justify-content-center text-brand-orange fs-2 mb-3 shadow-sm border border-brand-cream" style={{ width: '80px', height: '80px' }}>
                <i className="fa-solid fa-file-invoice-dollar"></i>
              </div>
              <h4 className="fw-bolder text-xs text-uppercase tracking-wider text-brand-dark mb-1">Acquire at End</h4>
              <p className="text-muted text-uppercase m-0" style={{ fontSize: '11px' }}>Contracts include options to purchase equipment after lease.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="py-5 container">
        <div className="text-center mb-5">
          <h2 className="fs-1 fw-bolder text-brand-dark text-uppercase tracking-tight">Equipment Catalog</h2>
          <p className="text-muted text-sm mx-auto mb-3" style={{ maxWidth: '600px' }}>
            Select verified heavy machinery, agricultural equipment, and industrial tools with instant availability check.
          </p>
          <div className="bg-brand-orange mx-auto rounded-pill" style={{ width: '80px', height: '5px' }}></div>
        </div>

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mb-4">
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {['All', 'Construction', 'Agriculture', 'Photography', 'AudioVisual', 'Tools'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`btn rounded-pill text-xs fw-bold text-uppercase tracking-wider px-4 ${selectedCat === cat ? 'btn-brand-orange' : 'btn-light bg-brand-cream border-brand-cream text-brand-dark'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="position-relative" style={{ width: '100%', maxWidth: '300px' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search equipment..."
              className="form-control rounded-pill border-brand-cream text-xs ps-5 py-2 shadow-sm"
            />
            <i className="fa-solid fa-magnifying-glass position-absolute top-50 start-0 translate-middle-y text-muted text-xs ms-3"></i>
          </div>
        </div>

        <div className="row g-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="col-12 col-sm-6 col-lg-4">
              <div className="card h-100 shadow-sm border-brand-cream rounded-3 overflow-hidden">
                <img src={item.img || item.image_url} alt={item.name} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body d-flex flex-column p-4">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <span className="badge bg-brand-cream text-brand-orange border border-brand-cream text-uppercase text-xs fw-bold">{item.category}</span>
                    <span className={`badge ${item.status === 'Available' ? 'bg-success' : 'bg-secondary'}`}>{item.status}</span>
                  </div>
                  <h3 className="fs-5 fw-bold text-brand-dark mb-2">{item.name}</h3>
                  <div className="mt-auto pt-3 border-top border-brand-cream d-flex justify-content-between align-items-center">
                    <div>
                      <span className="text-xs text-muted d-block">Daily Rate</span>
                      <strong className="fs-5 text-brand-orange">₹{item.rate || item.daily_rate}</strong>
                    </div>
                    <button onClick={() => openBookingModalWithItem(item.id)} className="btn btn-brand-orange text-xs fw-bold text-uppercase rounded-pill px-3 py-2">
                      Rent / Lease
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}