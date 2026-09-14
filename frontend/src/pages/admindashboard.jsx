import React, { useEffect, useState } from 'react';

export default function AdminDashboard({ showToast }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [rate, setRate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [status, setStatus] = useState('Available');

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
      showToast('Error', 'Unable to fetch admin bookings');
    }
  };

  const handleAddEquipment = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/equipment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, category, daily_rate: rate, image_url: imageUrl, status })
      });
      if (res.ok) {
        showToast('Success', 'Equipment added to database catalog.');
        setName('');
        setCategory('');
        setRate('');
        setImageUrl('');
      }
    } catch {
      showToast('Error', 'Failed to add equipment.');
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/bookings/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        showToast('Updated', `Booking ${id} marked as ${newStatus}`);
        fetchBookings();
      }
    } catch {
      showToast('Error', 'Could not update status');
    }
  };

  return (
    <main className="flex-grow-1 py-5 container">
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4 border-bottom border-brand-cream pb-3">
        <div>
          <span className="badge bg-brand-orange text-white text-uppercase tracking-widest mb-2" style={{ fontSize: '10px' }}>Administrative Control</span>
          <h2 className="fs-2 fw-bolder text-brand-dark mb-0">Admin Inventory & Lease Management</h2>
        </div>
      </div>

      <div className="row g-4">
        {/* Add Equipment Card */}
        <div className="col-12 col-lg-5">
          <div className="card shadow-sm border-brand-cream rounded-3 p-4 bg-brand-cream">
            <div className="border-bottom border-secondary border-opacity-25 pb-3 mb-3">
              <h3 className="fw-bolder fs-6 text-brand-dark text-uppercase d-flex align-items-center gap-2 mb-1">
                <i className="fa-solid fa-box-open text-brand-orange"></i> Add New Equipment Item
              </h3>
              <p className="text-xs text-muted mb-0">Insert new machinery into the rental/lease system catalog.</p>
            </div>

            <form onSubmit={handleAddEquipment}>
              <div className="mb-3">
                <label className="form-label text-xs fw-bold text-uppercase text-brand-dark mb-1">Equipment Name *</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. Caterpillar Wheel Loader" className="form-control text-xs border-slate-300" />
              </div>

              <div className="row g-3 mb-3">
                <div className="col-6">
                  <label className="form-label text-xs fw-bold text-uppercase text-brand-dark mb-1">Category *</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} required className="form-select text-xs border-slate-300 bg-white">
                    <option value="">Select...</option>
                    <option value="Construction">Construction</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Photography">Photography</option>
                    <option value="AudioVisual">Audio & Visual</option>
                    <option value="Tools">Power Tools</option>
                  </select>
                </div>
                <div className="col-6">
                  <label className="form-label text-xs fw-bold text-uppercase text-brand-dark mb-1">Daily Rate (₹) *</label>
                  <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} required placeholder="1500" min="1" className="form-control text-xs border-slate-300" />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label text-xs fw-bold text-uppercase text-brand-dark mb-1">Image URL (Optional)</label>
                <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." className="form-control text-xs border-slate-300" />
              </div>

              <div className="mb-4">
                <label className="form-label text-xs fw-bold text-uppercase text-brand-dark mb-1">Equipment Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-select text-xs border-slate-300 bg-white">
                  <option value="Available">Available</option>
                  <option value="Maintenance">Under Maintenance</option>
                </select>
              </div>

              <button type="submit" className="btn btn-brand-orange w-100 fw-bold text-xs text-uppercase py-2 shadow-sm">
                <i className="fa-solid fa-plus-circle me-1"></i> Save To Inventory
              </button>
            </form>
          </div>
        </div>

        {/* Pending Approvals Table */}
        <div className="col-12 col-lg-7">
          <div className="card shadow-sm border-brand-cream rounded-3 overflow-hidden">
            <div className="card-header bg-brand-dark text-white px-4 py-3 d-flex justify-content-between align-items-center border-0">
              <h4 className="mb-0 fw-bold text-sm text-uppercase tracking-wider"><i className="fa-solid fa-list-check text-brand-orange me-2"></i> Pending Rental Approvals</h4>
              <span className="badge bg-brand-orange rounded-pill">Admin Portal</span>
            </div>
            <div className="table-responsive">
              <table className="table table-hover mb-0 text-xs align-middle">
                <thead className="bg-brand-cream text-brand-dark text-uppercase tracking-wider border-bottom border-brand-cream fw-bold">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Item</th>
                    <th className="p-3">Dates</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-end">Action</th>
                  </tr>
                </thead>
                <tbody className="border-top-0">
                  {bookings.map((b) => (
                    <tr key={b.id}>
                      <td className="p-3 fw-bold">{b.id}</td>
                      <td className="p-3">{b.userName || b.customer_name}</td>
                      <td className="p-3">{b.equipName || b.equipment_name}</td>
                      <td className="p-3">{b.startDate || b.start_date}</td>
                      <td className="p-3">
                        <span className={`badge ${b.status === 'Approved' ? 'bg-success' : 'bg-warning text-dark'}`}>{b.status}</span>
                      </td>
                      <td className="p-3 text-end">
                        <button onClick={() => updateStatus(b.id, 'Approved')} className="btn btn-sm btn-success me-1">Approve</button>
                        <button onClick={() => updateStatus(b.id, 'Cancelled')} className="btn btn-sm btn-danger">Cancel</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}