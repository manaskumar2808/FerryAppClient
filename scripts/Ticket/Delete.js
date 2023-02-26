const ticketDeleteContainerEle = document.querySelector('#TicketDeleteContainerID');

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const id = params.id;

const ticketToast = document.getElementById('TicketToast');
const ticketToastBody = document.getElementById('TicketToastBody');

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

const cancelTicket = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://localhost:5001/api/ticket/' + id, {
            method: 'DELETE',
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

    if(!ticket) 
        window.location.href = '/Ticket';

    ticketDeleteContainerEle.innerHTML = `
    <div class="TicketDeleteItem">
            <div class="TicketDeleteDisplay">
                <img src="${ticket.ferry.image}" alt="${ticket.ferry.name}" class="TicketDeleteImage" />
                <div class="TicketDeleteNameContainer">
                    <p class="TicketDeleteName">${ticket.ferry.name}</p>
                </div>
            </div>
            <div class="TicketDeleteContent">
                <div class="TicketDeleteLegendContainer">
                    <legend class="TicketDeleteLegend">Delete Booked Ticket</legend>
                </div>
                <div class="TicketDeleteContentUpper">
                    <div class="TicketDeleteLocationContainer">
                        <div class="TicketDeleteLocationDisplay">
                            <img src="${ticket.ferry.origin.image}" alt="${ticket.ferry.origin.name}" class="TicketDeleteLocationImage" />
                        </div>
                        <p class="TicketDeleteLocationText">${ticket.ferry.origin.name}</p>
                    </div>
                    <div style="width:5px"></div>
                    <div>
                        <p>To</p>
                    </div>
                    <div style="width:5px"></div>
                    <div class="TicketDeleteLocationContainer">
                        <div class="TicketDeleteLocationDisplay">
                            <img src="${ticket.ferry.destination.image}" alt="${ticket.ferry.destination.name}" class="TicketDeleteLocationImage" />
                        </div>
                        <p class="TicketDeleteLocationText">${ticket.ferry.destination.name}</p>
                    </div>
                </div>
                <div style="height: 20px"></div>
                <div class="TicketDeleteContentMiddle">
                    <div class="TicketDeleteInfoContainer TicketDeleteCharge">
                        <legend class="TicketDeleteInfoLegend">Cost</legend>
                        <p class="TicketDeleteInfoText">$${ticket.cost}t</p>
                    </div>
                    <div style="height: 10px"></div>
                    <div class="TicketDeleteInfoContainer TicketDeleteRooms">
                        <legend class="TicketDeleteInfoLegend">Rooms No.</legend>
                        <p class="TicketDeleteInfoText">${ticket.roomNo}</p>
                    </div>
                    <div style="height: 10px"></div>
                    <div class="TicketDeleteInfoContainer TicketDeleteAdult">
                        <legend class="TicketDeleteInfoLegend">Adults</legend>
                        <p class="TicketDeleteInfoText">${ticket.adultCount}</p>
                    </div>
                    <div style="height: 10px"></div>
                    <div class="TicketDeleteInfoContainer TicketDeleteDateTime">
                        <legend class="TicketDeleteInfoLegend">Departure</legend>
                        <p class="TicketDeleteInfoText">${ticket.ferry.departure}</p>
                    </div>
                </div>
                <div style="flex: 1;"></div>
                <div class="TicketDeleteContentLower">
                    <div class="TicketDeleteButtonContainer">
                        <p>Are you sure you want to delete this ticket?</p>
                    </div>
                    <div style="height: 10px;"></div>
                        <form id="TicketDeleteForm" class="TicketDeleteButtonContainer">
                            <input for="Id" name="id" hidden />
                            <input type="submit" value="Delete" class="btn btn-danger w-100" />
                        </form>
                    <div style="height: 10px"></div>
                    <div class="TicketDeleteButtonContainer">
                        <a href="/Ticket" class="BackToList">Back To List</a>
                    </div>
                </div>
            </div>
        </div>`;
    
    const ticketDeleteForm = document.getElementById('TicketDeleteForm');
    ticketDeleteForm.addEventListener('submit', e => cancelTicket(e));
}

init();