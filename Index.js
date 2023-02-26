const homePortListEle = document.querySelector("#HomePortListID");

const fetchPorts = async () => {
    const response = await fetch('https://localhost:5001/api/port');
    const ports = await response.json();
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