const scripts = [
  'js/data.js',
  'js/ui.js',
  'js/auth.js',
  'js/catalog.js',
  'js/booking.js',
  'js/admin.js'
];

scripts.forEach(src => {
  const script = document.createElement('script');
  script.src = src;
  script.async = false; // Preserves execution order
  document.head.appendChild(script);
});