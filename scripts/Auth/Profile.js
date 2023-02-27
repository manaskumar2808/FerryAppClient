import { api } from "../utility/api.js";

const profileContainerEle = document.querySelector('#ProfileContainerID');

const fetchProfile = async () => {
    const user = await api('auth/profile');
    return user;
}

const init = async () => {
    const token = localStorage.getItem('token');
    if(!token)
        window.location.href = '/Auth/Login';

    const user = await fetchProfile();

    profileContainerEle.innerHTML = `
    <div class="ProfileView">
        <div class="ProfileDisplay">
            <img class="ProfileImage" src="https://uploads-ssl.webflow.com/617b0bd63ebb878253bd85fa/618197f1c3017b5d3a70fd8f_pattern-generator-540x360px.jpg" alt="Profile Image" />
        </div>
        <div style="height: 10px;"></div>
        <p class="ProfileName">${user.name}</p>
        <p class="ProfileUserName">${user.userName}</p>
        <div style="height: 10px;"></div>
        <p class="ProfileWalletLabel">Wallet</p>
        <p class="ProfileWallet">$${user.wallet}</p>
        <button class="btn btn-primary">Top-up Wallet</button>
        <div style="height: 10px;"></div>
        <div class="BackToListContainer">
            <a class="BackToListText" href="/">Back to Home</a>
        </div>
    </div>`;
}

init();