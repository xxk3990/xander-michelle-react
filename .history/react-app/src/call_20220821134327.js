const url = `https://data.nasa.gov/resource/y77d-th95.json`
let meteorName, id, nametype, recclass, mass, fall, year, reclat, reclong, geolocation, type, coordinates;
function makeCall() {
    const xhr = new XMLHttpRequest();

    xhr.onload = handleResponse();
    xhr.open('GET', url);
    xhr.send();
}


//parse data
function handleResponse(e) {
    const data = e.target.data;
    let obj = JSON.parse(data);
    meteorName = obj.name;
    id = obj.id;
    nametype = obj.nametype;
    recclass = obj.recclass;
    mass = obj.mass;
    fall = obj.fall;
    year = obj.year;
    reclat = obj.reclat;
    reclong = obj.reclong;
    geolocation = obj.geolocation;
    type = obj.geolocation.type;
    coordinates = obj.geolocation.coordinates;

}

//to access in other files
export {
    meteorName, 
    id, 
    nametype, 
    recclass, 
    mass, fall, 
    year, reclat, 
    reclong, 
    geolocation, 
    type, 
    coordinates,
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

