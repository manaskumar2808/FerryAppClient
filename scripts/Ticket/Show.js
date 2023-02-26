const ticketShowContainerEle = document.querySelector("#TicketShowContainerID");

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const id = params.id;

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

const init = async () => {
    const token = localStorage.getItem('token');
    if(!token)
        window.location.href = '/Auth/Login';

    const ticket = await fetchTicket();

    if(ticket == null)
        window.location.href = '/Ticket';

    ticketShowContainerEle.innerHTML = `
    <div class="TicketShowItem">
        <div class="TicketShowDisplay">
            <img src="${ticket.ferry.image}" alt="${ticket.ferry.name}" class="TicketShowImage" />
            <div class="TicketShowNameContainer">
                <p class="TicketShowName">${ticket.ferry.name}</p>
            </div>
        </div>
        <div class="TicketShowContent">
            <div class="TicketShowLegendContainer">
                <legend class="TicketShowLegend">Booked Ticket Details</legend>
            </div>
            <div class="TicketShowContentUpper">
                <div class="TicketShowLocationContainer">
                    <div class="TicketShowLocationDisplay">
                        <img src="${ticket.ferry.origin.image}" alt="${ticket.ferry.origin.name}" class="TicketShowLocationImage" />
                    </div>
                    <p class="TicketShowLocationText">${ticket.ferry.origin.name}</p>
                </div>
                <div style="width:5px"></div>
                <div>
                    <p>To</p>
                </div>
                <div style="width:5px"></div>
                <div class="TicketShowLocationContainer">
                    <div class="TicketShowLocationDisplay">
                        <img src="${ticket.ferry.destination.image}" alt="${ticket.ferry.destination.name}" class="TicketShowLocationImage" />
                    </div>
                    <p class="TicketShowLocationText">${ticket.ferry.destination.name}</p>
                </div>
            </div>
            <div style="height: 20px"></div>
            <div class="TicketShowContentMiddle">
                <div class="TicketShowInfoContainer TicketShowCharge">
                    <legend class="TicketShowInfoLegend">Cost</legend>
                    <p class="TicketShowInfoText">$${ticket.cost}</p>
                </div>
                <div style="height: 10px"></div>
                <div class="TicketShowInfoContainer TicketShowRooms">
                    <legend class="TicketShowInfoLegend">Rooms No.</legend>
                    <p class="TicketShowInfoText">${ticket.roomNo}</p>
                </div>
                <div style="height: 10px"></div>
                <div class="TicketShowInfoContainer TicketShowAdult">
                    <legend class="TicketShowInfoLegend">Adults</legend>
                    <p class="TicketShowInfoText">${ticket.adultCount}</p>
                </div>
                <div style="height: 10px"></div>
                <div class="TicketShowInfoContainer TicketShowDateTime">
                    <legend class="TicketShowInfoLegend">Departure</legend>
                    <p class="TicketShowInfoText">${ticket.ferry.departure}</p>
                </div>
            </div>
            <div style="flex: 1;"></div>
            <div class="TicketShowContentLower">
                <div class="TicketShowButtonContainer">
                    <a href="/Ticket/Update/?id=${ticket.id}">
                        <button class="btn btn-dark w-100">Edit</button>
                    </a>
                </div>
                <div style="width: 10px;"></div>
                <div class="TicketShowButtonContainer">
                    <a href="/Ticket/Delete/?id=${ticket.id}">
                        <button class="btn btn-danger w-100">Delete</button>
                    </a>
                </div>
            </div>
            <div style="height: 10px"></div>
            <div class="TicketShowMoveBackContainer">
                <a href="/Ticket" class="BackToList">Back To List</a>
            </div>
        </div>
    </div>`;
}

init();