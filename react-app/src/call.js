import './App';
const url = `https://data.nasa.gov/resource/gh4g-9sfh.json`
let meteorName, id, nametype, recclass, mass, fall, year, reclat, reclong, meteorText, geolocation, lat, long;
async function makeCall() {
    const xhr = new XMLHttpRequest();
    xhr.onload = handleResponse;
    xhr.open('GET', url);
    xhr.send();
}

// parse data
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
        mass = convert(dataObject[i].mass);
        fall = dataObject[i].fall;
        year = dataObject[i].year.substring(0,4);
        reclat = dataObject[i].reclat;
        reclong = dataObject[i].reclong;

        meteorText = `<section class="meteorText">
                        <h3 id = "meteor-name">${meteorName}</h3>
                        <p>${id}</p>
                        <p>Coordinates: ${reclat}, ${reclong}</p> 
                        <p>Year: ${year}</p>
                        <p>Mass: ${mass}</p>
                    </section>`;
        
        // adds content to dataGrid
        dataGrid.innerHTML += meteorText;
        
    }
}

/*
 * convert() adds proper suffix based 
 * on metric number digit length
 */
const convert = (num) => {
    
    let temp = num.toString();

    let lgth = temp.length;
    console.log(lgth);
    if (temp.length <= 3) {
        temp += " grams";
    }
    else if (temp.length >= 4 && temp.length <= 6) {
        temp = temp/1000;
        temp += " kilos"; 
    }
    else if (lgth >= 7 && lgth <= 9) {
        temp = temp/1000000;
        temp += " tons";    
    }
    return temp;
}

// to access in other files
export {
    makeCall
}

