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
async function handleResponse(e) {
    /* 
     * dataGrid - required at the beginning, gets 
     * populated with currently meteorText
    */
    let dataGrid = document.querySelector(".data-grid"); 
    const data = e.target.responseText;
    const dataObject = JSON.parse(data);
    let counter = 0;
    dataObject.forEach(obj => {
        
        meteorName = obj.name;
        id = obj.id;
        nametype = obj.nametype;
        recclass = obj.recclass;
        mass = obj.mass;
        mass = convert(mass);
        fall = obj.fall;
        if(obj.year === undefined) {
             year = "Year Unknown";
        } else {
            year = obj.year;
            console.log("OOGA BOOGA object year: " + obj.year);
            year = year.slice(0, 4);
        }
        
       

        reclat = obj.reclat;
        reclong = obj.reclong;

        meteorText = `<section class="meteorText">
                        <h3 id = "meteor-name">${meteorName}</h3>
                        <p>${id}</p>
                        <p>Coordinates: ${reclat}, ${reclong}</p> 
                        <p>Year: ${year}</p>
                        <p>Mass: ${mass}</p>
                    </section>`;
        
        // adds content to dataGrid
        dataGrid.innerHTML += meteorText;
        
    })
}

/*
 * convert() adds proper suffix based 
 * on metric number digit length
 */
const convert = (num) => {
    // num, from mass, is inputted
    // as a string from the JSON
    let temp = parseFloat(num);

    let lgth = temp.length;
    // console.log(lgth);
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

