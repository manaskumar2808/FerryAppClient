
const logoutYesButton = document.getElementById('LogoutYes');
const logoutNoButton = document.getElementById('LogoutNo');

logoutYesButton.addEventListener('click', e => logout(e));
logoutNoButton.addEventListener('click', e => window.location.href = '/');

const logout = () => {
    localStorage.clear();
    window.location.href = '/Auth/Login';
}

const init = () => {
    const token = localStorage.getItem('token');
    if(!token)
        window.location.href = '/Auth/Login';
}

init();