import { api } from "../utility/api.js";

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const adultCountInput = document.getElementById('AdultCount');
const costInput = document.getElementById('Cost');
const roomNoInput = document.getElementById('RoomNo');
const userId = localStorage.getItem('id');
const ferryId = params.ferryId;

const ticketCreateForm = document.getElementById('TicketCreateForm');

const ticketToast = document.getElementById('TicketToast');
const ticketToastBody = document.getElementById('TicketToastBody');

ticketCreateForm.addEventListener('submit', e => bookTicket(e));

const bookTicket = async (event) => {
    event.preventDefault();
    const body = {
        adultCount: adultCountInput.value,
        roomNo: 1,
        cost: 0,
        userId,
        ferryId
    };
    try {
        await api('ticket', 'POST', body);
        window.location.href = '/Ticket';
    } catch(err) {
        ticketToastBody.innerText = err.message;
        const toast = new bootstrap.Toast(ticketToast);
        toast.show();
    }
}

const init = () => {
    const token = localStorage.getItem('token');
    if(!token)
        window.location.href = '/Auth/Login';
}

init();