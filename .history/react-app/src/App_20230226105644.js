/* 
 * filename - App.js
 * resources: 
   1. https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
   2. https://www.geoapify.com/reverse-geocoding-api 
 */

import React, { useState, useMemo, useEffect, useRef, createContext, useContext}  from 'react';
import './App.css';
import Pagination from './Pagination';
import TextField from "@mui/material/TextField";
import { debounce } from './utils/debounce';

let PageSize = 25;

export default function App() {
  const [meteorites, setMeteorites] = useState([]); //makes data global!!!!!!!!!!
  
  const [searchInput, setSearchInput] = useState("");
  let searchHandler = (param) => {
    setCurrentPage(1) // reset pagination whenever searching
    let searching = param.target.value;
    setSearchInput(searching);
  }
  const [centurySliderValue, setCenturySliderValue] = useState(700); 

  let centurySliderHandler = (param) => {
    setCurrentPage(1)
    let timing = param.target.value;
    setCenturySliderValue(timing)
  }

  const debouncedSearchHandler = useMemo(() => debounce(searchHandler, 250), [])
  const debouncedSliderHandler = useMemo(() => debounce(centurySliderHandler, 17), [])
  const searchedMeteorites = meteorites.filter(meteor => meteor.name.toLowerCase().includes(searchInput.toLowerCase().trim()))
  let centurySortedMeteorites = [];
  if(centurySliderValue > 800) {
    centurySortedMeteorites = meteorites.filter(meteorite => {
      if(meteorite.year === undefined) {
        return;
      } else {
        //only check year and slider value of first two entries in the number.
        /*
        ISSUE 2/13/23 – Filter works for all centuries except first two. 
        Fix should be done somewhere in the code below. 
        Error occurs because the JSON puts a 0 before the century number for the centuries before 1000.
        0800, 0900
        */
        //let parseYear = 
        const yearFirst = meteorite.year.substring(0);
        console.log('yearFirst before if', yearFirst);
        if(yearFirst === '0') {
          console.log('first', yearFirst);
          const parseSlider = parseInt(centurySliderValue.toString().substring(0,1));
          if(yearFirst >= parseSlider && yearFirst < parseSlider + 1) { //check if year is between slider value and next highest one
            return meteorites;
          }
        } else {
          const parseSub = parseInt(meteorite.year.substring(0,2));
          const sliderFirstTwo = parseInt(centurySliderValue.toString().substring(0,2));
          if(parseSub >= sliderFirstTwo && parseSub < sliderFirstTwo + 1) { //check if year is between slider value and next highest one
            
            return meteorites;
            
          }
        }
       
   
      }
    })
  }
  

  const fetchCall = () => {
    const url = `https://data.nasa.gov/resource/gh4g-9sfh.json`;
    fetch(url, {
        method: 'GET',
    }).then(response => {
      return response.json();
    }, []).then(data => {
       setMeteorites(data)
    })
  }
  useEffect(() => {
   fetchCall()
  }, [])

  // for pagination, from freecodecamp
  // at top of page as resource 1
  const [currentPage, setCurrentPage] = useState(1);
 // let totalCountValue = 0;
  
  let filteredMs;
  const currentMeteoriteData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    if(centurySliderValue > 800) {
      filteredMs = centurySortedMeteorites;
      return centurySortedMeteorites.slice(firstPageIndex, lastPageIndex)
    } else {
      filteredMs = searchedMeteorites;
      return searchedMeteorites.slice(firstPageIndex, lastPageIndex)
    }
    
  }, [currentPage, searchedMeteorites, centurySliderValue]);

  // data existence validation 
  if(meteorites === undefined) {
    return (
      <div className="App">
        No meteorite data, sad face
      </div>
    )
  } else if (centurySliderValue >= 1000 && centurySliderValue <= 1399) { 
    //no meteors fell during these timeframes, so display notice to user
      return (
      <div className="App">
        <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={filteredMs.length} 
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
        />

        {/* search bar tings */}
        <TextField onChange = {debouncedSearchHandler}/>
        <input type="range" min="700" max="2200" step="100" className="century-slider" onChange={centurySliderHandler}/>
        <output>{centurySliderValue} - {centurySliderValue / 100}99</output>
        <h4>There were no meteorites during the selected timeframe.</h4>
      </div>
      )
  } else { 
      console.log("searchInput from App.js", searchInput)

      
        return (
          <div className="App">
              <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={filteredMs.length} 
              pageSize={PageSize}
              onPageChange={page => setCurrentPage(page)}
            />

            {/* search bar tings */}
            <TextField 
              onChange = {debouncedSearchHandler}
            />
            <input type="range" min="800" max="2200" step="100" className="century-slider" onChange={debouncedSliderHandler}/>
            <output>{centurySliderValue} - {centurySliderValue / 100}99 </output> {/* should be good until the year 10000 AD :) */}
            <section className = "data-grid">
              {currentMeteoriteData.map(m => {
               
                  return <MeteorCard m={m} id={m.id} />
                
              })
            }
              </section>
            </div>
          );
      
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
    <section className="meteoriteText" key={m.id}>
      <h3 id="meteorite-name">{m.name}</h3>
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
