const form = document.getElementById('workshopForm');
const modal = document.getElementById('modalBackdrop');
const closeModal = document.getElementById('closeModal');
const doneButton = document.getElementById('doneButton');

const fields = {
  fullName: document.getElementById('fullName'),
  studentId: document.getElementById('studentId'),
  email: document.getElementById('email'),
  workshop: document.getElementById('workshop'),
  sessions: document.getElementById('sessions')
};

const errors = {
  fullName: document.getElementById('nameError'),
  studentId: document.getElementById('studentError'),
  email: document.getElementById('emailError'),
  workshop: document.getElementById('workshopError'),
  sessions: document.getElementById('sessionsError')
};

function setError(key, message) {
  errors[key].textContent = message;
  fields[key].setAttribute('aria-invalid', message ? 'true' : 'false');
}

function validateForm() {
  let valid = true;
  Object.keys(fields).forEach(key => setError(key, ''));

  if (fields.fullName.value.trim().length < 2) {
    setError('fullName', 'Please enter your full name.');
    valid = false;
  }
  if (fields.studentId.value.trim().length < 3) {
    setError('studentId', 'Please enter a valid student ID.');
    valid = false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.value.trim())) {
    setError('email', 'Please enter a valid email address.');
    valid = false;
  }
  if (!fields.workshop.value) {
    setError('workshop', 'Please choose a workshop topic.');
    valid = false;
  }
  if (!fields.sessions.value) {
    setError('sessions', 'Please select the number of sessions.');
    valid = false;
  }
  return valid;
}

function openConfirmation() {
  document.getElementById('summaryName').textContent = fields.fullName.value.trim();
  document.getElementById('summaryStudent').textContent = fields.studentId.value.trim();
  document.getElementById('summaryWorkshop').textContent = fields.workshop.value;
  document.getElementById('summarySessions').textContent =
    `${fields.sessions.value} session${fields.sessions.value === '1' ? '' : 's'}`;

  modal.classList.add('show');
  closeModal.focus();
}

function hideConfirmation() {
  modal.classList.remove('show');
}

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!validateForm()) {
    const firstInvalid = form.querySelector('[aria-invalid="true"]');
    if (firstInvalid) firstInvalid.focus();
    return;
  }
  openConfirmation();
});

Object.entries(fields).forEach(([key, field]) => {
  const eventName = field.tagName === 'SELECT' ? 'change' : 'input';
  field.addEventListener(eventName, () => {
    if (errors[key].textContent) setError(key, '');
  });
});

closeModal.addEventListener('click', hideConfirmation);
doneButton.addEventListener('click', hideConfirmation);
modal.addEventListener('click', event => {
  if (event.target === modal) hideConfirmation();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal.classList.contains('show')) hideConfirmation();
});
