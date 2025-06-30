// Toggle password visibility and eye icons "closed or open"
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.toggle-password-btn').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            const input = document.getElementById(targetId);
            if (!input) return;

            const isHidden = input.type === 'password';
            input.type = isHidden ? 'text' : 'password';

            const eyeOpen = button.querySelector('.eye-open');
            const eyeClosed = button.querySelector('.eye-closed');

            if (eyeOpen && eyeClosed) {
                eyeOpen.classList.toggle('hidden', !isHidden);
                eyeClosed.classList.toggle('hidden', isHidden);
            }
        });
    });
});

// Toggle between login and signup forms
document.addEventListener("DOMContentLoaded", () => {
    const toggleButtons = document.querySelectorAll('.toggle-form-btn');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.form-card').classList.toggle('signup-mode');
        });
    });
});





// Validate form fields
document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll("input");
// if loginform who parent so login else signup
    inputs.forEach(input => {
        input.addEventListener("input", () => {
            const form = input.closest("form");
            const formType = form?.id === "loginForm" ? "login" : "signup";
            validateField(input, formType);
        });
    });
});

// error message 
function toggleError(id, condition) {
    const el = document.getElementById(id);
    if (el) {
        el.classList.toggle("hidden", condition);
    }
}

// validate input fields
function validateField(field, formType) {
    switch (field.id) {
        case 'loginEmail':
        case 'signupEmail':
            toggleError(`${formType}EmailError`, validateEmail(field.value));
            break;

        case 'loginPassword':
            toggleError('loginPasswordError', field.value.length >= 6);
            break;

        case 'signupUsername':
            toggleError('signupUsernameError', field.value.trim().length > 0);
            break;

        case 'signupPassword':
            toggleError('signupPasswordError', validatePassword(field.value));
            
            const confirmField = document.getElementById('signupConfirmPassword');
            if (confirmField) validateField(confirmField, formType);
            break;

        case 'signupConfirmPassword':
            const password = document.getElementById('signupPassword')?.value;
            toggleError('signupConfirmError', field.value === password);
            break;
    }
}

// when submit
function validateForm(formType) {
    let isValid = true;

    if (formType === 'login') {
        const email = document.getElementById('loginEmail');
        const password = document.getElementById('loginPassword');

        if (!validateEmail(email.value)) {
            toggleError('loginEmailError', false);
            isValid = false;
        }
        if (!validatePassword(password.value)) {
            toggleError('loginPasswordError', false);
            isValid = false;
        }

    } else if (formType === 'signup') {
        const username = document.getElementById('signupUsername');
        const email = document.getElementById('signupEmail');
        const password = document.getElementById('signupPassword');
        const confirm = document.getElementById('signupConfirmPassword');

        if (username.value.trim() === '') {
            toggleError('signupUsernameError', false);
            isValid = false;
        }
        if (!validateEmail(email.value)) {
            toggleError('signupEmailError', false);
            isValid = false;
        }
        if (!validatePassword(password.value)) {
            toggleError('signupPasswordError', false);
            isValid = false;
        }
        if (confirm.value !== password.value) {
            toggleError('signupConfirmError', false);
            isValid = false;
        }
    }

    return isValid;
}

// check email
function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

// check password
function validatePassword(password) {
    return password.length >= 6;
}

