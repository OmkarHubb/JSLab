/**
 * 1960s Space-Age & Retro Comic Style Sign Up Logic
 * Form Validation & Terminal Telemetry Control
 */

document.addEventListener('DOMContentLoaded', () => {
    // Form and Field Map
    const form = document.getElementById('signup-form');
    
    const fields = {
        fullname: {
            input: document.getElementById('fullname'),
            group: document.getElementById('group-fullname'),
            error: document.getElementById('error-fullname'),
            name: 'Full Name'
        },
        username: {
            input: document.getElementById('username'),
            group: document.getElementById('group-username'),
            error: document.getElementById('error-username'),
            name: 'Username'
        },
        birthdate: {
            input: document.getElementById('birthdate'),
            group: document.getElementById('group-birthdate'),
            error: document.getElementById('error-birthdate'),
            name: 'Birthdate'
        },
        email: {
            input: document.getElementById('email'),
            group: document.getElementById('group-email'),
            error: document.getElementById('error-email'),
            name: 'Email Address'
        },
        password: {
            input: document.getElementById('password'),
            group: document.getElementById('group-password'),
            error: document.getElementById('error-password'),
            name: 'Password'
        }
    };

    // Password Toggle Elements
    const togglePwBtn = document.getElementById('toggle-pw');
    const pwIcon = document.getElementById('pw-icon');

    // Modal References
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const summaryName = document.getElementById('summary-name');
    const summaryUsername = document.getElementById('summary-username');
    const summaryEmail = document.getElementById('summary-email');
    const summaryDob = document.getElementById('summary-dob');

    // ---------------------------------------------------------
    // VALIDATION FUNCTIONS
    // ---------------------------------------------------------

    /**
     * Display Error State for a Compulsory or Invalid Field
     */
    function showError(fieldKey, message) {
        const field = fields[fieldKey];
        field.group.classList.remove('has-success');
        field.group.classList.add('has-error');
        field.error.innerHTML = `<i class="ri-error-warning-line"></i> ${message}`;
    }

    /**
     * Display Success State
     */
    function showSuccess(fieldKey) {
        const field = fields[fieldKey];
        field.group.classList.remove('has-error');
        field.group.classList.add('has-success');
        field.error.textContent = '';
    }

    /**
     * Clear Field State
     */
    function clearState(fieldKey) {
        const field = fields[fieldKey];
        field.group.classList.remove('has-error', 'has-success');
        field.error.textContent = '';
    }

    /**
     * Email Regex Checker
     */
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    /**
     * Validate Single Field
     * First checks compulsory constraint (is empty), then format rules.
     */
    function validateField(fieldKey) {
        const field = fields[fieldKey];
        const val = field.input.value.trim();

        // 1. COMPULSORY FIELD CHECK (Left Empty)
        if (val === '') {
            showError(fieldKey, `* ${field.name} is a compulsory field!`);
            return false;
        }

        // 2. SPECIFIC FORMAT RULES
        if (fieldKey === 'email') {
            if (!isValidEmail(val)) {
                showError(fieldKey, 'Please provide a valid comms address (e.g., name@domain.com)');
                return false;
            }
        }

        if (fieldKey === 'username') {
            if (val.length < 3) {
                showError(fieldKey, 'Callsigh / Username must be at least 3 characters');
                return false;
            }
        }

        if (fieldKey === 'password') {
            if (val.length < 6) {
                showError(fieldKey, 'Access code must be at least 6 characters');
                return false;
            }
        }

        // If all checks pass
        showSuccess(fieldKey);
        return true;
    }

    // ---------------------------------------------------------
    // REAL-TIME EVENT LISTENERS
    // ---------------------------------------------------------
    Object.keys(fields).forEach(key => {
        const field = fields[key];

        // Validate when user leaves the field
        field.input.addEventListener('blur', () => {
            validateField(key);
        });

        // Re-validate dynamically as user types
        field.input.addEventListener('input', () => {
            if (field.group.classList.contains('has-error')) {
                validateField(key);
            } else if (field.input.value.trim() !== '') {
                showSuccess(key);
            } else {
                clearState(key);
            }
        });
    });

    // ---------------------------------------------------------
    // PASSWORD VISIBILITY TOGGLE
    // ---------------------------------------------------------
    togglePwBtn.addEventListener('click', () => {
        const pwInput = fields.password.input;
        const isPassword = pwInput.type === 'password';
        const toggleText = togglePwBtn.querySelector('.toggle-text');

        pwInput.type = isPassword ? 'text' : 'password';
        pwIcon.className = isPassword ? 'ri-eye-off-line' : 'ri-eye-line';
        if (toggleText) {
            toggleText.textContent = isPassword ? 'HIDE' : 'VIEW';
        }
    });

    // ---------------------------------------------------------
    // FORM SUBMISSION HANDLER
    // ---------------------------------------------------------
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isFormValid = true;
        let firstInvalidField = null;

        // Check all compulsory fields
        Object.keys(fields).forEach(key => {
            const isValid = validateField(key);
            if (!isValid && !firstInvalidField) {
                firstInvalidField = fields[key].input;
                isFormValid = false;
            }
        });

        // Focus first field with error if any
        if (!isFormValid) {
            if (firstInvalidField) {
                firstInvalidField.focus();
            }
            return;
        }

        // Form valid -> Show Clearance Modal
        summaryName.textContent = fields.fullname.input.value.trim();
        summaryUsername.textContent = fields.username.input.value.trim();
        summaryEmail.textContent = fields.email.input.value.trim();
        summaryDob.textContent = fields.birthdate.input.value;

        successModal.classList.add('active');
    });

    // ---------------------------------------------------------
    // DISMISS MODAL & RESET
    // ---------------------------------------------------------
    closeModalBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
        form.reset();
        Object.keys(fields).forEach(key => clearState(key));
    });
});
