
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const adultCountInput = document.getElementById('AdultCount');
const costInput = document.getElementById('Cost');
const roomNoInput = document.getElementById('RoomNo');
const userId = localStorage.getItem('id');
const id = params.id;

const ticketUpdateForm = document.getElementById('TicketUpdateForm');

const ticketToast = document.getElementById('TicketToast');
const ticketToastBody = document.getElementById('TicketToastBody');

ticketUpdateForm.addEventListener('submit', e => updateTicket(e));

let currentTicket = {};

const fetchTicket = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://localhost:5001/api/ticket/' + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if(!response.ok) {
            const { error } = await response.json();
            throw new Error(error);
        }

        const ticket = await response.json();
        return ticket;
    } catch(err) {
        return null;
    }
}

const updateTicket = async (event) => {
    event.preventDefault();
    try {
        const token = localStorage.getItem('token');
        const body = JSON.stringify({
            "adultCount": adultCountInput.value,
            "roomNo": 1,
            "cost": 0,
            "userId": userId,
            "ferryId": currentTicket.ferryId
        });
        const response = await fetch('https://localhost:5001/api/ticket/' + id, {
            method: 'PUT',
            body,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if(!response.ok) {
            const { error } = await response.json();
            throw new Error(error);
        }
        window.location.href = '/Ticket';
    } catch(err) {
        ticketToastBody.innerText = err.message;
        const toast = new bootstrap.Toast(ticketToast);
        toast.show();
    }
}

const init = async () => {
    const token = localStorage.getItem('token');
    if(!token)
        window.location.href = '/Auth/Login';

    const ticket = await fetchTicket();
    if(ticket) {
        currentTicket = ticket;
        adultCountInput.value = ticket.adultCount;
    } else {
        window.location.href = '/Ticket';
    }
}

init();