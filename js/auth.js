// Auth Modal Logic
function openAuthModal(mode = 'login') {
  const modal = document.getElementById('auth-modal');
  if(modal) modal.classList.remove('hidden');
  toggleAuthTab(mode);
}

function closeAuthModal() {
  const modal = document.getElementById('auth-modal');
  if(modal) modal.classList.add('hidden');
}

function toggleAuthTab(tab) {
  const loginForm = document.getElementById('login-form');
  const regForm = document.getElementById('register-form');
  const tabBtnLogin = document.getElementById('tab-btn-login');
  const tabBtnReg = document.getElementById('tab-btn-register');
  const title = document.getElementById('auth-modal-title');

  if (tab === 'login') {
    if(loginForm) loginForm.classList.remove('hidden');
    if(regForm) regForm.classList.add('hidden');
    if(tabBtnLogin) tabBtnLogin.className = "btn flex-fill py-3 rounded-0 text-xs fw-bold text-uppercase tracking-wider text-brandRed border-bottom border-2 border-danger bg-white shadow-none";
    if(tabBtnReg) tabBtnReg.className = "btn flex-fill py-3 rounded-0 text-xs fw-bold text-uppercase tracking-wider text-slate-500 border-bottom border-2 border-transparent shadow-none";
    if(title) title.textContent = "Sign In To EquipEase";
  } else {
    if(loginForm) loginForm.classList.add('hidden');
    if(regForm) regForm.classList.remove('hidden');
    if(tabBtnReg) tabBtnReg.className = "btn flex-fill py-3 rounded-0 text-xs fw-bold text-uppercase tracking-wider text-brandRed border-bottom border-2 border-danger bg-white shadow-none";
    if(tabBtnLogin) tabBtnLogin.className = "btn flex-fill py-3 rounded-0 text-xs fw-bold text-uppercase tracking-wider text-slate-500 border-bottom border-2 border-transparent shadow-none";
    if(title) title.textContent = "Create New Account";
  }
}

function handleLoginSubmit(e) {
  e.preventDefault();
  let isValid = true;
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-pass').value;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    setFieldError('login-email', 'err-login-email', 'Valid email address is required.');
    isValid = false;
  } else {
    clearFieldError('login-email', 'err-login-email');
  }

  if (!pass || pass.length < 6) {
    setFieldError('login-pass', 'err-login-pass', 'Password must be at least 6 characters.');
    isValid = false;
  } else {
    clearFieldError('login-pass', 'err-login-pass');
  }

  if (isValid) {
    closeAuthModal();
    showToast("Welcome Back!", "Logged in successfully.");
  }
}

function handleRegisterSubmit(e) {
  e.preventDefault();
  let isValid = true;
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const phone = document.getElementById('reg-phone').value.trim();
  const pass = document.getElementById('reg-pass').value;
  const confirmPass = document.getElementById('reg-confirm-pass').value;

  if (!name) {
    setFieldError('reg-name', 'err-reg-name', 'Full name is required.');
    isValid = false;
  } else { clearFieldError('reg-name', 'err-reg-name'); }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    setFieldError('reg-email', 'err-reg-email', 'Enter a valid email.');
    isValid = false;
  } else { clearFieldError('reg-email', 'err-reg-email'); }

  const phoneRegex = /^[0-9]{10}$/;
  if (!phone || !phoneRegex.test(phone)) {
    setFieldError('reg-phone', 'err-reg-phone', 'Enter a valid 10-digit mobile number.');
    isValid = false;
  } else { clearFieldError('reg-phone', 'err-reg-phone'); }

  if (!pass || pass.length < 6) {
    setFieldError('reg-pass', 'err-reg-pass', 'Minimum 6 chars.');
    isValid = false;
  } else { clearFieldError('reg-pass', 'err-reg-pass'); }

  if (pass !== confirmPass || !confirmPass) {
    setFieldError('reg-confirm-pass', 'err-reg-confirm-pass', 'Passwords do not match.');
    isValid = false;
  } else { clearFieldError('reg-confirm-pass', 'err-reg-confirm-pass'); }

  if (isValid) {
    closeAuthModal();
    showToast("Account Created!", "You can now login & book equipment.");
  }
}