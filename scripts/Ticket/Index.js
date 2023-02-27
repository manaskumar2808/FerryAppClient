import { api } from "../utility/api.js";

const ticketListEle = document.querySelector("#TicketListID");

const fetchTickets = async () => {
    const tickets = await api('ticket/' + window.location.search);
    return tickets;
}

const init = async () => {
    const token = localStorage.getItem('token');
    if(!token)
        window.location.href = '/Auth/Login';

    const tickets = await fetchTickets();

    for(let i = 0; i < tickets.length; i++) {
        let ticket = tickets[i];
        ticketListEle.innerHTML += `
        <div class="TicketItem">
            <div class="TicketDisplay">
                <img src="${ticket.ferry.image}" alt="${ticket.ferry.name}" class="TicketImage" />
                <div class="TicketNameContainer">
                    <p class="TicketName">${ticket.ferry.name}</p>
                </div>
            </div>
            <div class="TicketContent">
                <div class="TicketContentUpper">
                    <div class="TicketLocationContainer">
                        <div class="TicketLocationDisplay">
                            <img src="${ticket.ferry.origin.image}" alt="${ticket.ferry.origin.name}" class="TicketLocationImage" />
                        </div>
                        <p class="TicketLocationText">${ticket.ferry.origin.name}</p>
                    </div>
                    <div style="width:5px"></div>
                    <div>
                        <p>To</p>
                    </div>
                    <div style="width:5px"></div>
                    <div class="TicketLocationContainer">
                        <div class="TicketLocationDisplay">
                            <img src="${ticket.ferry.destination.image}" alt="${ticket.ferry.destination.name}" class="TicketLocationImage" />
                        </div>
                        <p class="TicketLocationText">${ticket.ferry.destination.name}</p>
                    </div>
                </div>
                <div style="height: 20px"></div>
                <div class="TicketContentMiddle">
                    <div class="TicketInfoContainer TicketCharge">
                        <legend class="TicketInfoLegend">Cost</legend>
                        <p class="TicketInfoText">$${ticket.cost}</p>
                    </div>
                    <div style="width: 5px"></div>
                    <div class="TicketInfoContainer TicketRooms">
                        <legend class="TicketInfoLegend">Rooms No.</legend>
                        <p class="TicketInfoText">${ticket.roomNo}</p>
                    </div>
                    <div style="width: 5px"></div>
                    <div class="TicketInfoContainer TicketAdult">
                        <legend class="TicketInfoLegend">Adults</legend>
                        <p class="TicketInfoText">${ticket.adultCount}</p>
                    </div>
                    <div style="width: 5px"></div>
                    <div class="TicketInfoContainer TicketDateTime">
                        <legend class="TicketInfoLegend">Departure</legend>
                        <p class="TicketInfoText">${ticket.ferry.departure}</p>
                    </div>
                </div>
                <div style="flex: 1;"></div>
                <div class="TicketContentLower">
                    <div class="TicketButtonContainer">
                        <a href="/Ticket/Update/?id=${ticket.id}">
                            <button class="btn btn-dark w-100">Edit</button>
                        </a>
                    </div>
                    <div style="width: 10px;"></div>
                    <div class="TicketButtonContainer">
                        <a href="/Ticket/Show/?id=${ticket.id}">
                            <button class="btn btn-primary w-100">Show</button>
                        </a>
                    </div>
                    <div style="width: 10px;"></div>
                    <div class="TicketButtonContainer">
                        <a href="/Ticket/Delete/?id=${ticket.id}">
                            <button class="btn btn-danger w-100">Delete</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>`;
    }
}

init();