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
    const body = JSON.stringify({
        "adultCount": adultCountInput.value,
        "roomNo": 1,
        "cost": 0,
        "userId": userId,
        "ferryId": ferryId
    });
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://localhost:5001/api/ticket', {
            method: 'POST',
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

const init = () => {
    const token = localStorage.getItem('token');
    if(!token)
        window.location.href = '/Auth/Login';
}

init();