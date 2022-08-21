import './App';
const url = `https://data.nasa.gov/resource/gh4g-9sfh.json`
let meteorName, id, nametype, recclass, mass, fall, year, reclat, reclong, geolocation, lat, long;
function makeCall() {
    const xhr = new XMLHttpRequest();

    xhr.onload = handleResponse;
    xhr.open('GET', url);
    xhr.send();
}


//parse data
function handleResponse(e) {
    const data = e.target.response;
    let object = JSON.parse(data);
    for(let i = 0; i < object.length; i++) {
        meteorName = object[i].name;
        id = object[i].id;
        nametype = object[i].nametype;
        recclass = object[i].recclass;
        mass = object[i].mass;
        fall = object[i].fall;
        year = object[i].year;
        reclat = object[i].reclat;
        reclong = object[i].reclong;
        // geolocation = obj.geolocation;
        let dataGrid = document.querySelector(".data-grid");
        dataGrid.innerHTML = `<h3 class = 'meteor-name'>${meteorName}</h3>`
    }
    // lat = obj.geolocation.latitude;
    // long = obj.geolocation.longitude;

}

//to access in other files
export {
    meteorName, 
    id, 
    nametype, 
    recclass, 
    mass, 
    fall, 
    year, 
    reclat, 
    reclong, 
    geolocation, 
    lat,
    long,
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

