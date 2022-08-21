import './App';
const url = `https://data.nasa.gov/resource/gh4g-9sfh.json`
let meteorName, id, nametype, recclass, mass, fall, year, reclat, reclong, geolocation, lat, long;
async function makeCall() {
    const xhr = new XMLHttpRequest();

    xhr.onload = handleResponse;
    xhr.open('GET', url);
    xhr.send();
}


//parse data
const handleResponse = (e) => {
    const data = e.target.response;
    //console.log(e);
    const dataObject = JSON.parse(data);
    console.log(dataObject[10].name);
    for(let i = 0; i < 3; i++){
        console.log(dataObject[i].name)
        meteorName = dataObject[i].name;
        id = dataObject[i].id;
        nametype = dataObject[i].nametype;
        recclass = dataObject[i].recclass;
        mass = dataObject[i].mass;
        fall = dataObject[i].fall;
        year = dataObject[i].year;
        reclat = dataObject[i].reclat;
        reclong = dataObject[i].reclong;
        // geolocation = obj.geolocation;
        let dataGrid = document.querySelector(".data-grid");
        dataGrid.innerHTML = `<h3>${dataObject[i].name}</h3>`;
        
    }
    console.log(dataObject);
    console.log("Data------" + data)
    // lat = obj.geolocation.latitude;
    // long = obj.geolocation.longitude;

}

//to access in other files
export {
    makeCall,
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
    // lat,
    // long,
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

