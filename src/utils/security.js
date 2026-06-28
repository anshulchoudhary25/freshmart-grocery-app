export function sanitizeInput(str) {
  return str.replace(/[<>"'&]/g, c => ({
    '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', '&': '&amp;',
  }[c]));
}

export function generateCSRFToken() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function validateCheckoutForm(data) {
  const errors = {};
  if (!data.name.trim())
    errors.name = 'Full name is required';
  if (!/^\d{10}$/.test(data.phone))
    errors.phone = 'Enter a valid 10-digit phone number';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = 'Enter a valid email address';
  if (!data.address.trim() || data.address.length < 10)
    errors.address = 'Enter your complete delivery address';
  if (!/^\d{6}$/.test(data.pincode))
    errors.pincode = 'Enter a valid 6-digit pincode';
  return errors;
}