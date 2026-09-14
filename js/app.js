


window.onload = function() {
  if (typeof renderCatalog === 'function') {
    renderCatalog();
  }
  if (typeof renderCustomerBookings === 'function') {
    renderCustomerBookings();
  }
};