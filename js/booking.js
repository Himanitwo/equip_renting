// Booking Engine
function populateBookingEquipDropdown() {
  const select = document.getElementById('book-equip-select');
  if (!select) return;
  select.innerHTML = '<option value="">-- Select Item --</option>';
  equipmentData.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item.id;
    opt.textContent = `${item.name} (₹${item.rate}/day)`;
    select.appendChild(opt);
  });
}

function openBookingModal(preSelectedId = null) {
  populateBookingEquipDropdown();
  const modal = document.getElementById('booking-modal');
  if (modal) modal.classList.remove('hidden');

  if (preSelectedId) {
    const select = document.getElementById('book-equip-select');
    if (select) select.value = preSelectedId;
  }

  const today = new Date().toISOString().split('T')[0];
  const startEl = document.getElementById('book-start-date');
  const endEl = document.getElementById('book-end-date');
  if(startEl) startEl.min = today;
  if(endEl) endEl.min = today;

  updateBookingCostPreview();
}

function closeBookingModal() {
  const modal = document.getElementById('booking-modal');
  if (modal) modal.classList.add('hidden');
}

function updateBookingCostPreview() {
  const equipSelect = document.getElementById('book-equip-select');
  const startEl = document.getElementById('book-start-date');
  const endEl = document.getElementById('book-end-date');
  
  if (!equipSelect || !startEl || !endEl) return;

  const equipId = equipSelect.value;
  const startVal = startEl.value;
  const endVal = endEl.value;
  const item = equipmentData.find(i => i.id == equipId);

  if (item && startVal && endVal) {
    const d1 = new Date(startVal);
    const d2 = new Date(endVal);
    const diffTime = d2 - d1;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 

    if (diffDays > 0) {
      const total = diffDays * item.rate;
      document.getElementById('preview-days').textContent = `${diffDays} Day(s)`;
      document.getElementById('preview-rate').textContent = `₹${item.rate} / day`;
      document.getElementById('preview-total').textContent = `₹${total}`;
      return;
    }
  }

  document.getElementById('preview-days').textContent = `0 Days`;
  document.getElementById('preview-rate').textContent = item ? `₹${item.rate} / day` : `₹0 / day`;
  document.getElementById('preview-total').textContent = `₹0`;
}

function handleBookingSubmit(e) {
  e.preventDefault();
  let isValid = true;
  const userName = document.getElementById('book-user-name').value.trim();
  const equipId = document.getElementById('book-equip-select').value;
  const startVal = document.getElementById('book-start-date').value;
  const endVal = document.getElementById('book-end-date').value;
  const today = new Date().toISOString().split('T')[0];

  if (!userName) {
    setFieldError('book-user-name', 'err-book-user-name', 'Name is required.');
    isValid = false;
  } else { clearFieldError('book-user-name', 'err-book-user-name'); }

  if (!equipId) {
    setFieldError('book-equip-select', 'err-book-equip-select', 'Please select an item.');
    isValid = false;
  } else { clearFieldError('book-equip-select', 'err-book-equip-select'); }

  if (!startVal || startVal < today) {
    setFieldError('book-start-date', 'err-book-start-date', 'Date must be today or later.');
    isValid = false;
  } else { clearFieldError('book-start-date', 'err-book-start-date'); }

  if (!endVal || endVal < startVal) {
    setFieldError('book-end-date', 'err-book-end-date', 'End date must be on or after start date.');
    isValid = false;
  } else { clearFieldError('book-end-date', 'err-book-end-date'); }

  if (isValid) {
    const item = equipmentData.find(i => i.id == equipId);
    const d1 = new Date(startVal);
    const d2 = new Date(endVal);
    const diffDays = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24)) + 1;
    const totalCost = diffDays * item.rate;

    const newBooking = {
      id: `BK-${1000 + bookingsData.length + 1}`,
      userName: userName,
      equipName: item.name,
      startDate: startVal,
      endDate: endVal,
      totalCost: totalCost,
      status: "Pending"
    };

    bookingsData.unshift(newBooking);
    closeBookingModal();
    showToast("Booking Submitted!", `Request ${newBooking.id} is pending admin approval.`);
    switchView('customer-dashboard-view');
  }
}

function renderCustomerBookings() {
  const tbody = document.getElementById('user-bookings-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  const countEl = document.getElementById('user-booking-count');
  if (countEl) countEl.textContent = bookingsData.length;

  bookingsData.forEach(bk => {
    let badgeClass = "bg-warning text-dark";
    if (bk.status === "Approved") badgeClass = "bg-success text-white";
    if (bk.status === "Rejected") badgeClass = "bg-danger text-white";

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="p-3 fw-bold" style="font-family: monospace;">${bk.id}</td>
      <td class="p-3 fw-semibold text-slate-900">${bk.equipName}</td>
      <td class="p-3 text-slate-600">${bk.startDate}</td>
      <td class="p-3 text-slate-600">${bk.endDate}</td>
      <td class="p-3 fw-bold text-brandRed">₹${bk.totalCost}</td>
      <td class="p-3"><span class="badge ${badgeClass}">${bk.status}</span></td>
      <td class="p-3">
        <button onclick="cancelBooking('${bk.id}')" class="btn btn-link text-danger p-0 fw-bold text-decoration-none" style="font-size: 11px;">Cancel</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function cancelBooking(id) {
  bookingsData = bookingsData.filter(b => b.id !== id);
  renderCustomerBookings();
  showToast("Booking Cancelled", `Record ${id} removed.`);
}