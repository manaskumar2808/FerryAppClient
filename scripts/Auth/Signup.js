import { api } from "../utility/api.js";

const userNameInput = document.getElementById('UserName');
const firstNameInput = document.getElementById('FirstName');
const lastNameInput = document.getElementById('LastName');
const emailInput = document.getElementById('Email');
const passwordInput = document.getElementById('Password');
const confirmPasswordInput = document.getElementById('ConfirmPassword');

const userNameValidator = document.getElementById('UserNameValidator');
const firstNameValidator = document.getElementById('FirstNameValidator');
const lastNameValidator = document.getElementById('LastNameValidator');
const emailValidator = document.getElementById('EmailValidator');
const passwordValidator = document.getElementById('PasswordValidator');
const confirmPasswordValidator = document.getElementById('ConfirmPasswordValidator');

const userNameField = document.getElementById('UserNameField');
const firstNameField = document.getElementById('FirstNameField');
const lastNameField = document.getElementById('LastNameField');
const emailField = document.getElementById('EmailField');
const passwordField = document.getElementById('PasswordField');
const confirmPasswordField = document.getElementById('ConfirmPasswordField');

const nextButton = document.getElementById('NextButton');
const prevButton = document.getElementById('PrevButton');
const signupButton = document.getElementById('SignupButton');

const switchPadder = document.getElementById('SwitchPadder');

const signupForm = document.getElementById('SignupForm');

const signupToast = document.getElementById('SignupToast');
const signupToastBody = document.getElementById('SignupToastBody');

signupForm.addEventListener('submit', e => signup(e));
nextButton.addEventListener('click', e => next(e));
prevButton.addEventListener('click', e => prev(e));

let page = 1;
const TOTAL_PAGES = 2;

const validate = () => {
    let valid = true;

    if(userNameInput.value == null || userNameInput.value.length < 2) {
        userNameValidator.innerText = 'Username length should be atleast 2!';
        valid = false;
    } else {
        userNameValidator.innerText = '';
    }

    if(passwordInput.value == null || passwordInput.value.length < 7) {
        passwordValidator.innerText = 'Password length should be atleast 7!';
        valid = false;
    } else {
        passwordValidator.innerText = '';
    }

    if(passwordInput.value != confirmPasswordInput.value) {
        confirmPasswordValidator.innerText = 'Password did not match!';
        valid = false;
    } else {
        confirmPasswordValidator.innerText = '';
    }

    return valid;
}

const signup = async (event) => {
    event.preventDefault();

    if(!validate())
        return;

    try {
        const body = {
            userName: userNameInput.value,
            name: firstNameInput.value + ' ' + lastNameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        };
        const { token, id, userName } = await api('auth/signup', 'POST', body);
        localStorage.setItem('token', token);
        localStorage.setItem('id', id);
        localStorage.setItem('userName', userName);
        window.location.href = '/';
    } catch(err) {
        signupToastBody.innerText = err.message;
        const toast = new bootstrap.Toast(signupToast);
        toast.show();
    }
}

const updatePageContent = () => {
    if(page == 1) {
        userNameField.style.display = 'block';
        emailField.style.display = 'block';
        firstNameField.style.display = 'block';
        lastNameField.style.display = 'block';
        passwordField.style.display = 'none';
        confirmPasswordField.style.display = 'none';
        nextButton.style.display = 'block';
        signupButton.style.display = 'none';
        switchPadder.style.display = 'none';
    } else {
        userNameField.style.display = 'none';
        emailField.style.display = 'none';
        firstNameField.style.display = 'none';
        lastNameField.style.display = 'none';
        passwordField.style.display = 'block';
        confirmPasswordField.style.display = 'block';
        nextButton.style.display = 'none';
        signupButton.style.display = 'block';
        switchPadder.style.display = 'block';
    }
}

const next = () => {
    page = Math.min(page + 1, TOTAL_PAGES);
    updatePageContent();
}

const prev = () => {
    page = Math.max(page - 1, 1);
    updatePageContent();
}

const init = () => {
    const token = localStorage.getItem('token');
    if(token)
        window.location.href = '/';
    page = 1;
    updatePageContent();
}

init();