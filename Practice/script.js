const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const successBox = document.getElementById('successBox');
const strengthContainer = document.getElementById('strengthContainer');
const strengthBar = document.getElementById('strengthBar');
const strengthLabel = document.getElementById('strengthLabel');
const togglePassword = document.getElementById('togglePassword');

const fields = {
    fullName: {
        input: document.getElementById('fullName'),
        group: document.getElementById('fullNameGroup'),
        error: document.getElementById('fullNameError'),
    },
    username: {
        input: document.getElementById('username'),
        group: document.getElementById('usernameGroup'),
        error: document.getElementById('usernameError'),
    },
    email: {
        input: document.getElementById('email'),
        group: document.getElementById('emailGroup'),
        error: document.getElementById('emailError'),
    },
    phone: {
        input: document.getElementById('phone'),
        group: document.getElementById('phoneGroup'),
        error: document.getElementById('phoneError'),
    },
    dob: {
        input: document.getElementById('dob'),
        group: document.getElementById('dobGroup'),
        error: document.getElementById('dobError'),
    },
    gender: {
        input: document.getElementById('gender'),
        group: document.getElementById('genderGroup'),
        error: document.getElementById('genderError'),
    },
    password: {
        input: document.getElementById('password'),
        group: document.getElementById('passwordGroup'),
        error: document.getElementById('passwordError'),
    },
    confirmPassword: {
        input: document.getElementById('confirmPassword'),
        group: document.getElementById('confirmPasswordGroup'),
        error: document.getElementById('confirmPasswordError'),
    },
};

const termsCheckbox = document.getElementById('terms');
const termsError = document.getElementById('termsError');

function validateFullName(value) {
    const trimmed = value.trim();
    if (!trimmed) return 'Full name is required';
    if (trimmed.length < 3) return 'Full name must be at least 3 characters';
    if (!/^[a-zA-Z\s]+$/.test(trimmed)) return 'Full name should only contain letters and spaces';
    return '';
}

function validateUsername(value) {
    const trimmed = value.trim();
    if (!trimmed) return 'Username is required';
    if (trimmed.length < 4) return 'Username must be at least 4 characters';
    if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) return 'Username can only contain letters, numbers, and underscores';
    return '';
}

function validateEmail(value) {
    const trimmed = value.trim();
    if (!trimmed) return 'Email address is required';
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;
    if (!regex.test(trimmed)) return 'Please enter a valid email address';
    return '';
}

function validatePhone(value) {
    const trimmed = value.trim();
    if (!trimmed) return 'Phone number is required';
    if (!/^\d{10}$/.test(trimmed)) return 'Phone number must be exactly 10 digits';
    return '';
}

function validateDob(value) {
    if (!value) return 'Date of birth is required';
    const dob = new Date(value);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    if (age < 13) return 'You must be at least 13 years old';
    if (age > 120) return 'Please enter a valid date of birth';
    return '';
}

function validateGender(value) {
    if (!value) return 'Please select a gender';
    return '';
}

function validatePassword(value) {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return '';
}

function validateConfirmPassword(value) {
    if (!value) return 'Please confirm your password';
    if (value !== fields.password.input.value) return 'Passwords do not match';
    return '';
}

const validators = {
    fullName: validateFullName,
    username: validateUsername,
    email: validateEmail,
    phone: validatePhone,
    dob: validateDob,
    gender: validateGender,
    password: validatePassword,
    confirmPassword: validateConfirmPassword,
};

function setFieldState(key, errorMsg) {
    const field = fields[key];
    field.group.classList.remove('success', 'error');
    if (errorMsg) {
        field.group.classList.add('error');
        field.error.textContent = errorMsg;
    } else {
        field.group.classList.add('success');
        field.error.textContent = '';
    }
}

function getStrength(pw) {
    let score = 0;
    if (pw.length >= 6) score++;
    if (pw.length >= 10) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;

    if (score <= 1) return { label: 'Weak', color: '#f44336', width: '20%' };
    if (score === 2) return { label: 'Fair', color: '#ff9800', width: '40%' };
    if (score === 3) return { label: 'Good', color: '#ffc107', width: '60%' };
    if (score === 4) return { label: 'Strong', color: '#8bc34a', width: '80%' };
    return { label: 'Excellent', color: '#4caf50', width: '100%' };
}

const touched = {};

Object.keys(fields).forEach((key) => {
    touched[key] = false;

    fields[key].input.addEventListener('blur', () => {
        touched[key] = true;
        const errorMsg = validators[key](fields[key].input.value);
        setFieldState(key, errorMsg);
    });

    fields[key].input.addEventListener('input', () => {
        if (!touched[key]) return;
        const errorMsg = validators[key](fields[key].input.value);
        setFieldState(key, errorMsg);
    });
});

fields.password.input.addEventListener('input', () => {
    const pw = fields.password.input.value;
    if (pw.length > 0) {
        strengthContainer.classList.add('visible');
        const s = getStrength(pw);
        strengthBar.style.width = s.width;
        strengthBar.style.background = s.color;
        strengthLabel.textContent = s.label;
        strengthLabel.style.color = s.color;
    } else {
        strengthContainer.classList.remove('visible');
        strengthLabel.textContent = '';
    }
});

togglePassword.addEventListener('click', () => {
    const pwInput = fields.password.input;
    if (pwInput.type === 'password') {
        pwInput.type = 'text';
        togglePassword.textContent = 'Hide';
    } else {
        pwInput.type = 'password';
        togglePassword.textContent = 'Show';
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let firstInvalid = null;

    Object.keys(fields).forEach((key) => {
        touched[key] = true;
        const errorMsg = validators[key](fields[key].input.value);
        setFieldState(key, errorMsg);
        if (errorMsg && !firstInvalid) {
            firstInvalid = fields[key].input;
        }
    });

    termsError.textContent = '';
    if (!termsCheckbox.checked) {
        termsError.textContent = 'You must agree to the Terms & Conditions';
        if (!firstInvalid) firstInvalid = termsCheckbox;
    }

    if (firstInvalid) {
        firstInvalid.focus();
        return;
    }

    const registrationData = {
        fullName: fields.fullName.input.value.trim(),
        username: fields.username.input.value.trim(),
        email: fields.email.input.value.trim(),
        phone: fields.phone.input.value.trim(),
        dob: fields.dob.input.value,
        gender: fields.gender.input.value,
    };

    localStorage.setItem('registrationData', JSON.stringify(registrationData));
    window.location.href = 'welcome.html';
});
