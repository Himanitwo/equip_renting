// Catalog Render & Search Logic
function renderCatalog(itemsToRender = equipmentData) {
  const grid = document.getElementById('equipment-grid');
  if (!grid) return;
  grid.innerHTML = '';

  if (itemsToRender.length === 0) {
    grid.innerHTML = `
      <div class="col-12 py-5 text-center text-slate-400">
        <i class="fa-solid fa-box-open fs-1 mb-2"></i>
        <p class="text-sm fw-semibold">No equipment found matching your criteria.</p>
      </div>
    `;
    return;
  }

  itemsToRender.forEach(item => {
    const col = document.createElement('div');
    col.className = "col-12 col-sm-6 col-lg-3";
    col.innerHTML = `
      <div class="card h-100 border-orange-100 shadow-sm card-hover-effect rounded-4 overflow-hidden border-0">
        <div class="bg-orange-50 position-relative" style="height: 190px;">
          <img src="${item.img}" alt="${item.name}" class="w-100 h-100 object-fit-cover">
          <span class="position-absolute top-0 end-0 m-2 bg-white bg-opacity-75 text-slate-800 fw-bold text-uppercase rounded-pill px-2 py-1 border border-orange-200 shadow-sm" style="font-size: 10px; backdrop-filter: blur(4px);">
            ${item.category}
          </span>
        </div>
        <div class="card-body d-flex flex-column justify-content-between text-center p-4">
          <div>
            <h3 class="fw-bolder text-sm text-slate-900 text-uppercase tracking-tight mb-2">${item.name}</h3>
            <p class="text-brandRed fw-bolder fs-5 mb-3">₹${item.rate} <span class="text-xs text-slate-400 fw-normal">/ day</span></p>
          </div>
          <button onclick="openBookingModal(${item.id})" class="btn bg-orange-100 text-brandRed fw-bold rounded-3 text-xs text-uppercase tracking-wider w-100 py-2">
            Rent Equipment
          </button>
        </div>
      </div>
    `;
    grid.appendChild(col);
  });
}

function filterCategory(cat) {
  document.querySelectorAll('#category-filters button').forEach(btn => {
    if(btn.textContent.trim().toLowerCase().includes(cat.toLowerCase()) || (cat === 'All' && btn.textContent.trim() === 'All')) {
      btn.className = "cat-pill btn bg-brandRed text-white rounded-pill text-xs fw-bold text-uppercase tracking-wider px-4";
    } else {
      btn.className = "cat-pill btn btn-light bg-white border-orange-200 text-slate-700 rounded-pill text-xs fw-bold text-uppercase tracking-wider px-4";
    }
  });

  if (cat === 'All') {
    renderCatalog(equipmentData);
  } else {
    const filtered = equipmentData.filter(i => i.category.toLowerCase().includes(cat.toLowerCase()));
    renderCatalog(filtered);
  }
}

function searchEquipment() {
  const input = document.getElementById('search-input');
  if (!input) return;
  const term = input.value.toLowerCase();
  const filtered = equipmentData.filter(i => 
    i.name.toLowerCase().includes(term) || 
    i.category.toLowerCase().includes(term)
  );
  renderCatalog(filtered);
}