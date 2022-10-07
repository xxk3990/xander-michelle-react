/* 
 * filename - App.js
 * resources: 
   1. https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
 */

import React, { useState, useMemo, useEffect}  from 'react';
// import logo from './logo.svg';
import './App.css';
// import {meteorData, makeCall} from './call.js'
import Pagination from './Pagination';

let PageSize = 25;
export default function App() {
  const [meteors, setMeteors] = useState([]); //makes data global!!!!!!!!!!
  const fetchCall = () => {
    const url = `https://data.nasa.gov/resource/gh4g-9sfh.json`;
    fetch(url, {
        method: 'GET',
    }).then(response => {
      return response.json();
    }, []).then(data => {
       setMeteors(data)
    })
  }
  useEffect(() => {
   fetchCall()
  }, [])

  // for pagination, from freecodecamp
  // at top of page as resource 1
  const [currentPage, setCurrentPage] = useState(1);
  console.log("currentPage:", currentPage);

  // data existence validation 
  if(meteors === undefined) {
    return (
      <div className="App">
        No meteor data, sad face
      </div>
    )
  } else {
    const currentMeteorData = useMemo(() => {
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      return meteors.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, meteors]);
    return (
      /* Hook for pagination from resource 1 */
      <div className="App">
          <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={meteors !== undefined ? meteors.length : 0}
          pageSize={PageSize}
          onPageChange={page => setCurrentPage(page)}
        />
        <section className = "data-grid">
          {currentMeteorData.map(m => {
            return (
              <section className="meteorText" key={m.id}>
                <h3 id = "meteor-name">{m.name}</h3>
                <p>{m.id}</p>
                <p>{m.reclat === 0.000000 && m.reclong === 0.000000 ? "Unknown" : `Coordinates: ${m.reclat}, ${m.reclong}`}</p> 
                {/* geolocation starts here */}
                <p>{m.reclat === 0.000000 && m.reclong === 0.000000 ? "Unknown" : `Location: ${reverseGeocode(m.reclat, m.reclong)}`}</p>
                <p>{m.geolocation.map}"Landed in: "</p>
                <p>Year: {m.year === undefined ? "Unknown" : m.year.substring(0, 4)}</p>
                <p>Mass: {convert(m.mass)}</p>
              </section>
            );
          })}
          </section> 

       
        </div>
      );
    } //else
  }// App

/*
 * convert() adds proper suffix based 
 * on metric number digit length
 */
const convert = (num) => {
    // num, from mass, is inputted
    // as a string from the JSON
    if(num === undefined) {
      return "Unknown"
    } else {
      let temp = num.toString();

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
    
}


const reverseGeocode = (lat, long) => {
  const geoUrl = "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";
  

}


// export default App;
