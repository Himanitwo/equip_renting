// Admin Management Operations
function handleAdminAddEquipment(e) {
  e.preventDefault();
  let isValid = true;
  const name = document.getElementById('admin-item-name').value.trim();
  const cat = document.getElementById('admin-item-cat').value;
  const rate = document.getElementById('admin-item-rate').value;
  const img = document.getElementById('admin-item-img').value.trim();
  const status = document.getElementById('admin-item-status').value;

  if (!name) {
    setFieldError('admin-item-name', 'err-admin-item-name', 'Name is required.');
    isValid = false;
  } else { clearFieldError('admin-item-name', 'err-admin-item-name'); }

  if (!cat) {
    setFieldError('admin-item-cat', 'err-admin-item-cat', 'Category is required.');
    isValid = false;
  } else { clearFieldError('admin-item-cat', 'err-admin-item-cat'); }

  if (!rate || Number(rate) <= 0) {
    setFieldError('admin-item-rate', 'err-admin-item-rate', 'Rate must be > 0.');
    isValid = false;
  } else { clearFieldError('admin-item-rate', 'err-admin-item-rate'); }

  if (isValid) {
    const newItem = {
      id: equipmentData.length + 1,
      name: name,
      category: cat,
      rate: Number(rate),
      status: status,
      img: img || "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80"
    };

    equipmentData.unshift(newItem);
    if(typeof renderCatalog === 'function') renderCatalog();
    document.getElementById('adminAddForm').reset();
    showToast("Item Added!", `${newItem.name} added to equipment catalog.`);
  }
}

function renderAdminBookings() {
  const tbody = document.getElementById('admin-bookings-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  bookingsData.forEach(bk => {
    let badgeClass = "bg-warning text-dark";
    if (bk.status === "Approved") badgeClass = "bg-success text-white";
    if (bk.status === "Rejected") badgeClass = "bg-danger text-white";

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="p-3 fw-bold" style="font-family: monospace;">${bk.id}</td>
      <td class="p-3 fw-semibold">${bk.userName}</td>
      <td class="p-3">${bk.equipName}</td>
      <td class="p-3 text-slate-500" style="font-size: 11px;">${bk.startDate} to ${bk.endDate}</td>
      <td class="p-3"><span class="badge ${badgeClass}">${bk.status}</span></td>
      <td class="p-3 text-end">
        ${bk.status === 'Pending' ? `
          <button onclick="updateBookingStatus('${bk.id}', 'Approved')" class="btn btn-success btn-sm py-0 px-2 fw-bold" style="font-size: 10px;">Approve</button>
          <button onclick="updateBookingStatus('${bk.id}', 'Rejected')" class="btn btn-danger btn-sm py-0 px-2 fw-bold" style="font-size: 10px;">Reject</button>
        ` : `<span class="text-slate-400" style="font-size: 10px;">Processed</span>`}
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function updateBookingStatus(id, newStatus) {
  const bk = bookingsData.find(b => b.id === id);
  if (bk) {
    bk.status = newStatus;
    renderAdminBookings();
    showToast("Status Updated", `Booking ${id} set to ${newStatus}.`);
  }
}