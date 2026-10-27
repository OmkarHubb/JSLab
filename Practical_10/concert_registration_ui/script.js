const form = document.getElementById('registrationForm');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const closeToast = document.getElementById('closeToast');

const fields = {
  fullName: document.getElementById('fullName'),
  email: document.getElementById('email'),
  phone: document.getElementById('phone'),
  ticket: document.getElementById('ticket'),
  terms: document.getElementById('terms')
};

const errors = {
  fullName: document.getElementById('nameError'),
  email: document.getElementById('emailError'),
  phone: document.getElementById('phoneError'),
  ticket: document.getElementById('ticketError'),
  terms: document.getElementById('termsError')
};

function setError(key, message) {
  errors[key].textContent = message;
  fields[key].setAttribute('aria-invalid', message ? 'true' : 'false');
}

function validate() {
  let valid = true;
  const name = fields.fullName.value.trim();
  const email = fields.email.value.trim();
  const phoneDigits = fields.phone.value.replace(/\D/g, '');

  setError('fullName', '');
  setError('email', '');
  setError('phone', '');
  setError('ticket', '');
  setError('terms', '');

  if (name.length < 2) {
    setError('fullName', 'Enter your full name.');
    valid = false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError('email', 'Enter a valid email address.');
    valid = false;
  }
  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    setError('phone', 'Enter a valid phone number.');
    valid = false;
  }
  if (!fields.ticket.value) {
    setError('ticket', 'Choose a ticket type.');
    valid = false;
  }
  if (!fields.terms.checked) {
    setError('terms', 'Please accept the event terms to continue.');
    valid = false;
  }
  return valid;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!validate()) {
    const firstInvalid = form.querySelector('[aria-invalid="true"]');
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  const selectedPayment = form.querySelector('input[name="payment"]:checked').value;
  const ticketName = fields.ticket.value;
  toastMessage.textContent = `${ticketName} selected · Payment preference: ${selectedPayment}. This demo does not process payments.`;
  toast.classList.add('show');
});

closeToast.addEventListener('click', () => toast.classList.remove('show'));

Object.entries(fields).forEach(([key, field]) => {
  const eventName = field.type === 'checkbox' || field.tagName === 'SELECT' ? 'change' : 'input';
  field.addEventListener(eventName, () => {
    if (errors[key].textContent) setError(key, '');
  });
});

document.getElementById('termsLink').addEventListener('click', (event) => {
  event.preventDefault();
  toastMessage.textContent = 'Please review the event rules and ticket policy before completing registration.';
  toast.classList.add('show');
});
