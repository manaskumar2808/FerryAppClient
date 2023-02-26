const headerEle = document.getElementById('Navbar');
const footerEle = document.getElementById('Footer');

const setAuth = () => {
    const ticketNavEle = document.getElementById('TicketNavID');
    const loginNavEle = document.getElementById('LoginNavID');
    const registerNavEle = document.getElementById('RegisterNavID');
    const logoutNavEle = document.getElementById('LogoutNavID');
    const userNameNavEle = document.getElementById('UserNameNavID');
    
    const userName = document.getElementById('UserNameID');
    const authenticated = localStorage.getItem('token') != null;
    if(authenticated) {
        loginNavEle.style.display = 'none';
        registerNavEle.style.display = 'none';
        ticketNavEle.style.display = 'block';
        logoutNavEle.style.display = 'block';
        userNameNavEle.style.display = 'block';
        userName.innerText = localStorage.getItem('userName');
    } else {
        loginNavEle.style.display = 'block';
        registerNavEle.style.display = 'block';
        ticketNavEle.style.display = 'none';
        logoutNavEle.style.display = 'none';
        userNameNavEle.style.display = 'none';
    }
}

const header = () => {
    const token = localStorage.getItem('token');
    if(token) {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    return {
        'Content-Type': 'application/json',
    }
}

const setNav = () => {
    if(headerEle == null)
        return;
    headerEle.innerHTML = `
    <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white mb-3">
        <div class="container">
            <a class="navbar-brand Brand" href="/" id="BrandNavID">Ferryhopper</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div style="flex: 1;"></div>
            <div class="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                <ul class="navbar-nav">
                    <li class="nav-item" id="HomeNavID">
                        <a class="nav-link text-dark Nav" href="/">Home</a>
                    </li>
                    <li class="nav-item" id="FerryNavID">
                        <a class="nav-link text-dark Nav" href="/Ferry">Ferries</a>
                    </li>
                    <li class="nav-item" id="TicketNavID">
                        <a class="nav-link text-dark Nav" href="/Ticket">Tickets</a>
                    </li>
                    <li class="nav-item" id="PrivayNavID">
                        <a class="nav-link text-dark Nav" href="/Privacy">Privacy</a>
                    </li>
                    <li class="nav-item" id="AboutNavID">
                        <a class="nav-link text-dark Nav" href="/About">About us</a>
                    </li>
                    <li class="nav-item" id="ContactNavID">
                        <a class="nav-link text-dark Nav" href="/Contact">Contact</a>
                    </li>
                </ul>
            </div>
            <ul class="navbar-nav">
                <li class="nav-item" id="UserNameNavID">
                    <a id="manage" class="nav-link text-dark Nav" href="/Auth/Profile" title="Profile">Hello <p class="UserName" id="UserNameID"></p></a>
                </li>
                <li class="nav-item" id="LogoutNavID">
                    <a class="nav-link Nav" id="logout" href="/Auth/Logout">
                        <button class="btn btn-sm btn-danger">Logout</button>
                    </a>
                </li>
                <li class="nav-item" id="RegisterNavID">
                    <a class="nav-link text-dark Nav" id="register" href="/Auth/Signup">Signup</a>
                </li>
                <li class="nav-item" id="LoginNavID">
                    <a class="nav-link Nav" id="login" href="/Auth/Login">
                        <button class="btn btn-sm btn-primary">Login</button>
                    </a>
                </li>
            </ul>
        </div>
    </nav>`;
}

const setFooter = () => {
    if(footerEle == null)
        return;
    footerEle.outerHTML = `
        <footer class="footer text-muted w-100">
            <div class="mx-3">
                &copy; 2023 - Ferryhopper - <a href="/Privacy" style="text-decoration: none;">Privacy</a>
            </div>
        </footer>
    `;
}

setNav();
setFooter();
setAuth();