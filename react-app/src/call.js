import './App';
const url = `https://data.nasa.gov/resource/gh4g-9sfh.json`
let meteorName, id, nametype, recclass, mass, fall, year, reclat, reclong, geolocation, lat, long;
async function makeCall() {
    const xhr = new XMLHttpRequest();

    xhr.onload = handleResponse;
    xhr.open('GET', url);
    xhr.send();
}

let meteorText;

//parse data
const handleResponse = (e) => {
    /* 
     * dataGrid - required at the beginning, gets 
     * populated with currently meteorText
    */
    let dataGrid = document.querySelector(".data-grid"); 
    const data = e.target.responseText;
    const dataObject = JSON.parse(data);

    for(let i = 0; i < dataObject.length; i++){
        meteorName = dataObject[i].name;
        id = dataObject[i].id;
        nametype = dataObject[i].nametype;
        recclass = dataObject[i].recclass;
        mass = dataObject[i].mass;
        fall = dataObject[i].fall;
        year = dataObject[i].year;
        reclat = dataObject[i].reclat;
        reclong = dataObject[i].reclong;

        meteorText = `<div class="meteorText"><h3>${meteorName}</h3>
            <p>${id}</p></div>`;
        
        // adds content to dataGrid
        dataGrid.innerHTML += meteorText;
        
    }
}

//to access in other files
export {
    makeCall
}

/*
"name": "Abee",
"id": "6",
"nametype": "Valid",
"recclass": "EH4",
"mass": "107000",
"fall": "Fell",
"year": "1952-01-01T00:00:00.000",
"reclat": "54.216670",
"reclong": "-113.000000",
"geolocation": {
"type": "Point",
"coordinates": [
-113,
54.21667
]
}
*/

