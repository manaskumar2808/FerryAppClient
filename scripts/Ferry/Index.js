import { api } from "../utility/api.js";

const ferryListEle = document.querySelector("#FerryListID");

const fetchFerries = async () => {
    const ferries = await api('ferry' + window.location.search);
    return ferries;
}

const init = async () => {
    const ferries = await fetchFerries();
    for(let i = 0; i < ferries.length; i++) {
        let ferry = ferries[i];

        ferryListEle.innerHTML += `
        <div class="FerryItem">
            <div class="FerryDisplay">
                <img src="${ferry.image}" alt="${ferry.name}" class="FerryImage" />
                <div class="FerryNameContainer">
                    <p class="FerryName">${ferry.name}</p>
                </div>
            </div>
            <div class="FerryContent">
                <div class="FerryContentUpper">
                    <div class="FerryLocationContainer">
                        <div class="FerryLocationDisplay">
                            <img src="${ferry.origin.image}" alt="${ferry.origin.name}" class="FerryLocationImage" />
                        </div>
                        <p class="FerryLocationText">${ferry.origin.name}</p>
                    </div>
                    <div style="width:5px"></div>
                    <div>
                        <p>To</p>
                    </div>
                    <div style="width:5px"></div>
                    <div class="FerryLocationContainer">
                        <div class="FerryLocationDisplay">
                            <img src="${ferry.destination.image}" alt="${ferry.destination.name}" class="FerryLocationImage" />
                        </div>
                        <p class="FerryLocationText">${ferry.destination.name}</p>
                    </div>
                </div>
                <div style="height: 10px"></div>
                <div class="FerryContentMiddle">
                    <div class="FerryChargeContainer">
                        <legend class="FerryChargeLegend">Charge</legend>
                        <p class="FerryChargeText">$${ferry.charge}</p>
                    </div>
                    <div style="width: 5px"></div>
                    <div class="FerryRoomsContainer">
                        <legend class="FerryRoomsLegend">Rooms Left</legend>
                        <p class="FerryRoomsText">${ferry.roomsLeft}</p>
                    </div>
                    <div style="width: 5px"></div>
                    <div class="FerryDateTimeContainer">
                        <legend class="FerryDateTimeLegend">Departure</legend>
                        <p class="FerryDateTimeText">${ferry.departure}</p>
                    </div>
                </div>
                <div style="height: 10px"></div>
                <div class="FerryContentLower">
                    <a href="/Ticket/Create/?ferryId=${ferry.id}">
                        <button class="btn btn-primary w-100">Book</button>
                    </a>
                </div>
            </div>
        </div>
        `;
    }
}

init();