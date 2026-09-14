// Navigation & Visibility Controls
function switchView(viewId) {
  document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
  const targetView = document.getElementById(viewId);
  if(targetView) targetView.classList.remove('hidden');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if(viewId === 'customer-dashboard-view' && typeof renderCustomerBookings === 'function') {
    renderCustomerBookings();
  }
  if(viewId === 'admin-view' && typeof renderAdminBookings === 'function') {
    renderAdminBookings();
  }
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if(menu) menu.classList.toggle('hidden');
}

// Validation Utilities
function setFieldError(fieldId, errorId, message) {
  const field = document.getElementById(fieldId);
  const err = document.getElementById(errorId);
  if (field && err) {
    field.classList.add('is-invalid', 'input-error');
    field.classList.remove('is-valid', 'input-success');
    err.textContent = message;
  }
}

function clearFieldError(fieldId, errorId) {
  const field = document.getElementById(fieldId);
  const err = document.getElementById(errorId);
  if (field && err) {
    field.classList.remove('is-invalid', 'input-error');
    field.classList.add('is-valid', 'input-success');
    err.textContent = '';
  }
}

// Toast Notifications
function showToast(title, message) {
  const titleEl = document.getElementById('toast-title');
  const msgEl = document.getElementById('toast-message');
  if(titleEl) titleEl.textContent = title;
  if(msgEl) msgEl.textContent = message;
  
  const toastEl = document.getElementById('bs-toast');
  if(toastEl && typeof bootstrap !== 'undefined') {
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }
}