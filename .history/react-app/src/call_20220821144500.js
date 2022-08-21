import './App';
const url = `https://data.nasa.gov/resource/gh4g-9sfh.json`
let meteorName, id, nametype, recclass, mass, fall, year, reclat, reclong, geolocation, lat, long;
const makeCall = () => {
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
    for(let obj of Object.keys(dataObject)) {
       // let temp = {};
        meteorName = obj.name;
        id = obj.id;
        nametype = obj.nametype;
        recclass = obj.recclass;
        mass = obj.mass;
        fall = obj.fall;
        year = obj.year;
        reclat = obj.reclat;
        reclong = obj.reclong;
        // geolocation = obj.geolocation;
        let dataGrid = document.querySelector(".data-grid");
        dataGrid.innerHTML = `<h3>${meteorName}</h3>`;
    })
    
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

