import { api } from "./scripts/utility/api.js";

const homePortListEle = document.querySelector("#HomePortListID");

const fetchPorts = async () => {
    const ports = await api('port');
    return ports;
}

const init = async () => {
    const ports = await fetchPorts();

    for(let i = 0; i < ports.length; i++) {
        const port = ports[i];
        homePortListEle.innerHTML +=
        '<div class="HomePortItem">'
        + '<div class="HomePortItemDisplay">'
        + '<img class="HomePortItemImage" src="' + port.image + '" alt="' + port.name + '" />'
        + '<div class="HomePortItemNameContainer">'
        + '<p class="HomePortItemName">' + port.name + '</p>'
        + '</div>'
        + '</div>'
        + '</div>';
    }
}

init();