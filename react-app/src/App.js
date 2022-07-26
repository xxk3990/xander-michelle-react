/* 
 * filename - App.js
 * resources: 
   1. https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
   2. https://www.geoapify.com/reverse-geocoding-api 
 */

import React, { useState, useMemo, useEffect, useRef, createContext, useContext}  from 'react';
import './App.css';
import Pagination from './Pagination';
import DisplaySearch from './search-sort';
import TextField from "@mui/material/TextField";

let PageSize = 25;

export default function App() {
  const [meteors, setMeteors] = useState([]); //makes data global!!!!!!!!!!
  
  const [searchInput, setSearchInput] = useState("");

  let searchHandler = (param) => {
    let searching = param.target.value;
    setSearchInput(searching);
  }

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

  const currentMeteorData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return meteors.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, meteors]);

  // data existence validation 
  if(meteors === undefined) {
    return (
      <div className="App">
        No meteor data, sad face
      </div>
    )
  } else {
      console.log("searchInput from App.js", searchInput)

      // if search is not happening, display all results
      if (searchInput === "") {
        return (
          <div className="App">
              <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={meteors !== undefined ? meteors.length : 0}
              pageSize={PageSize}
              onPageChange={page => setCurrentPage(page)}
            />
    
            {/* search bar tings */}
            <TextField 
              onChange = {searchHandler}
            />
    
            <section className = "data-grid">
              {currentMeteorData.map(m => {
                return <MeteorCard m={m} key={m.id}/>
              })}
              </section>
            </div>
          );
      } else {
        console.log("It's not emptyyyyyyyy")
        return (<div className="App">
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={meteors !== undefined ? meteors.length : 0}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
              />
      
              {/* search bar tings */}
              <TextField 
                onChange = {searchHandler}
              />

              <DisplaySearch m={meteors} searchInput={searchInput}/>
              

            </div>
      )}
    } //else
  }// App

// to reference the results of reverse geocoding in external file
export const ReverseGeocodeComponent = (props) => {
  const m = props.m;
  const [meteorLocation, setMeteorLocation] = useState("");
  
  useEffect(() => {
    reverseGeocode(m.reclat, m.reclong).then(location => {
      setMeteorLocation(location);
    });
  }, [reverseGeocode, m.reclat, m.reclong]);

  return <span>Landing location: {meteorLocation}</span>

}


// each meteor card is responsible for receiving a meteor from the list
// and looking up the geocoding information about it
// props = generic react/node term, means properties. Maybe this is wrong lol
export const MeteorCard = (props) => {
  const m = props.m;
  
  return (
    <section className="meteorText" key={m.id}>
      <h3 id="meteor-name">{m.name}</h3>
      <p>{m.id}</p>
      <p>
        {/* if lat and long are known, do the coords. 
        otherwise, return unknown. Ternary operator */}
        {m.reclat === 0.0 && m.reclong === 0.0
          ? 'Unknown'
          : `Coordinates: ${m.reclat}, ${m.reclong}`}
      </p>
      {/* geolocation starts here */}
      <ReverseGeocodeComponent 
        m = {m}
      />
      <p>Year: {m.year === undefined ? 'Unknown' : m.year.substring(0, 4)}</p>
      <p>Mass: {convert(m.mass)}</p>
    </section>
  );
}

/*
 * convert() adds proper suffix based 
 * on metric number digit length
 */
export const convert = (num) => {
    // num, from mass, is inputted
    // as a string from the JSON
    if(num === undefined) {
      return "Unknown"
    } else {
      let temp = num.toString();

      let lgth = temp.length;
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

/*
 * reverseGeogode() takes in meteor latitude + longitude
 * coordinates, returns city and country of meteor landing 
 * in the 'Landing Location' part of each meteor tile
 * 
 * Uses reverse geocoding from resource 2 ^
 */

export const reverseGeocode = (lat, long) => {
  if(lat === 0.000000 && long === 0.000000) {
    return `Landing location unknown, unknown coordinates`
  } else {
    const geoUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=978b6815c5e545ba9b0dc6b2cf38f294`
    return fetch(geoUrl, {
      method: 'GET',
    }).then(response => {
      return response.json();
    }).then(data => {
      if(data.features[0].properties.city === undefined || data.features[0].properties.country === undefined) {
        return "No Geocode";
      } else {
        return `${data.features[0].properties.city}, ${data.features[0].properties.country}`
      }
      
    })
  }
}

// export default App;
