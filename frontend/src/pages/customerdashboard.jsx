import React, { useEffect, useState } from 'react';

export default function CustomerDashboard({ openBookingModal, showToast }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      if (Array.isArray(data)) setBookings(data);
    } catch {
      showToast('Error', 'Unable to fetch customer bookings');
    }
  };

  return (
    <main className="flex-grow-1 py-5 container">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fs-3 fw-bolder text-brand-dark text-uppercase mb-1">Customer Booking & Lease Dashboard</h2>
          <p className="text-xs text-muted mb-0">Track your submitted rental applications and active equipment leases.</p>
        </div>
        <button onClick={openBookingModal} className="btn btn-brand-orange fw-bold text-xs text-uppercase tracking-wider shadow-sm">
          <i className="fa-solid fa-plus me-1"></i> New Booking Request
        </button>
      </div>

      <div className="card shadow-sm border-brand-cream rounded-3 overflow-hidden">
        <div className="card-header bg-brand-dark text-white px-4 py-3 d-flex justify-content-between align-items-center border-0">
          <h4 className="mb-0 fw-bold text-sm text-uppercase tracking-wider">
            <i className="fa-solid fa-clock-rotate-left me-2 text-brand-orange"></i> Your Booking History
          </h4>
          <span className="badge bg-slate-800 border border-brand-orange text-brand-orange px-3 py-2 rounded-pill">Total: <strong>{bookings.length}</strong></span>
        </div>
        <div className="table-responsive">
          <table className="table table-hover mb-0 text-xs align-middle">
            <thead className="bg-brand-cream text-brand-dark text-uppercase tracking-wider border-bottom border-brand-cream fw-bold">
              <tr>
                <th className="p-3">Booking ID</th>
                <th className="p-3">Equipment</th>
                <th className="p-3">Start Date</th>
                <th className="p-3">End Date</th>
                <th className="p-3">Estimated Cost</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="border-top-0">
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td className="p-3 fw-bold">{b.id}</td>
                  <td className="p-3">{b.equipName || b.equipment_name}</td>
                  <td className="p-3">{b.startDate || b.start_date}</td>
                  <td className="p-3">{b.endDate || b.end_date}</td>
                  <td className="p-3 fw-bold text-brand-orange">₹{b.totalCost || b.total_cost}</td>
                  <td className="p-3">
                    <span className={`badge ${b.status === 'Approved' ? 'bg-success' : b.status === 'Pending' ? 'bg-warning text-dark' : 'bg-secondary'}`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}