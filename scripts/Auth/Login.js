const userNameInput = document.getElementById('UserName');
const passwordInput = document.getElementById('Password');

const userNameValidator = document.getElementById('UserNameValidator');
const passwordValidator = document.getElementById('PasswordValidator');

const loginForm = document.getElementById('LoginForm');

const loginToast = document.getElementById('LoginToast');
const loginToastBody = document.getElementById('LoginToastBody');

loginForm.addEventListener('submit', e => login(e));

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

    return valid;
}

const login = async (event) => {
    event.preventDefault();

    if(!validate())
        return;

    const body = JSON.stringify({
        userName: userNameInput.value,
        password: passwordInput.value
    });
    try {
        const response = await fetch('https://localhost:5001/api/auth/login', {
            method: 'POST',
            body,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        if(!response.ok) {
            const { error } = await response.json();
            throw new Error(error);
        }

        const { token, id, userName } = await response.json();
        localStorage.setItem('token', token);
        localStorage.setItem('id', id);
        localStorage.setItem('userName', userName);
        window.location.href = '/';
    } catch(err) {
        loginToastBody.innerText = err.message;
        const toast = new bootstrap.Toast(loginToast);
        toast.show();
    }
}

const init = () => {
    const token = localStorage.getItem('token');
    if(token)
        window.location.href = '/';
}

init();