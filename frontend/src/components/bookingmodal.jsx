import React, { useState, useEffect } from 'react';

export default function BookingModal({ isOpen, onClose, equipmentList, selectedEquipId, showToast }) {
  const [customerName, setCustomerName] = useState('');
  const [equipId, setEquipId] = useState(selectedEquipId || '');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [days, setDays] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    if (selectedEquipId) setEquipId(selectedEquipId);
  }, [selectedEquipId]);

  useEffect(() => {
    if (startDate && endDate && equipId) {
      const s = new Date(startDate);
      const e = new Date(endDate);
      const diffTime = e - s;
      const computedDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      if (computedDays > 0) {
        const item = equipmentList.find((i) => String(i.id) === String(equipId));
        const rate = item ? item.rate || item.daily_rate || 0 : 0;
        setDays(computedDays);
        setTotalCost(computedDays * rate);
      } else {
        setDays(0);
        setTotalCost(0);
      }
    }
  }, [startDate, endDate, equipId, equipmentList]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerName || !equipId || !startDate || !endDate || days <= 0) {
      showToast('Validation Error', 'Please complete all details correctly.');
      return;
    }

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: customerName,
          equipment_id: equipId,
          start_date: startDate,
          end_date: endDate,
          total_cost: totalCost
        })
      });
      const data = await res.json();
      if (res.ok && data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        showToast('Booking Created', `Booking ID: ${data.booking_id || 'Pending'}`);
        onClose();
      }
    } catch {
      showToast('Error', 'Could not process booking server request.');
    }
  };

  const selectedItem = equipmentList.find((i) => String(i.id) === String(equipId));

  return (
    <div className="custom-modal-overlay">
      <div className="bg-white w-100 rounded-3 shadow-lg overflow-hidden border border-orange-100" style={{ maxWidth: '500px' }}>
        <div className="bg-gradient-brand text-white p-4 d-flex justify-content-between align-items-center">
          <div>
            <h3 className="fs-5 fw-bolder text-uppercase tracking-tight mb-0">Equipment Rental Booking</h3>
            <p className="text-xs text-white-50 mb-0">Complete reservation dates and details</p>
          </div>
          <button onClick={onClose} className="btn-close btn-close-white shadow-none"></button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-3">
            <label className="form-label text-xs fw-bold text-uppercase text-slate-700 mb-1">Customer Full Name *</label>
            <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required className="form-control py-2 text-xs border-slate-300" />
          </div>

          <div className="mb-3">
            <label className="form-label text-xs fw-bold text-uppercase text-slate-700 mb-1">Selected Equipment *</label>
            <select value={equipId} onChange={(e) => setEquipId(e.target.value)} required className="form-select py-2 text-xs border-slate-300 bg-white">
              <option value="">-- Select Item --</option>
              {equipmentList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} (₹{item.rate || item.daily_rate}/day)
                </option>
              ))}
            </select>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-6">
              <label className="form-label text-xs fw-bold text-uppercase text-slate-700 mb-1">Start Date *</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required className="form-control py-2 text-xs border-slate-300" />
            </div>
            <div className="col-6">
              <label className="form-label text-xs fw-bold text-uppercase text-slate-700 mb-1">End Date *</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required className="form-control py-2 text-xs border-slate-300" />
            </div>
          </div>

          <div className="bg-orange-50 p-3 rounded-3 border border-orange-200 d-flex justify-content-between align-items-center text-xs mb-4">
            <div>
              <span className="text-slate-500 d-block mb-1">Total Days: <strong className="text-slate-800">{days} Days</strong></span>
              <span className="text-slate-500 d-block">Daily Rate: <strong className="text-slate-800">₹{selectedItem ? selectedItem.rate || selectedItem.daily_rate : 0} / day</strong></span>
            </div>
            <div className="text-end">
              <span className="text-uppercase tracking-wider text-slate-500 d-block fw-bold" style={{ fontSize: '10px' }}>Estimated Cost</span>
              <span className="fs-4 fw-bolder text-brandRed">₹{totalCost}</span>
            </div>
          </div>

          <button type="submit" className="btn bg-gradient-brand text-white w-100 fw-bold py-2 text-xs text-uppercase tracking-wider shadow-sm">
            Confirm Rental Booking
          </button>
        </form>
      </div>
    </div>
  );
}