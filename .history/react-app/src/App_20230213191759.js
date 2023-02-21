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
  const [meteorites, setmeteorites] = useState([]); //makes data global!!!!!!!!!!
  
  const [searchInput, setSearchInput] = useState("");
  let searchHandler = (param) => {
    setCurrentPage(1) // reset pagination whenever searching
    let searching = param.target.value;
    setSearchInput(searching);
  }
  const [centurySliderValue, setCenturySliderValue] = useState(0800); 

  let centurySliderHandler = (param) => {
    setCurrentPage(1)
    let timing = param.target.value;
    setCenturySliderValue(timing)
  }

  const debouncedSearchHandler = useMemo(() => debounce(searchHandler, 250), [])
  //const memoizedCenturyHandler = useMemo(() => debounce(centurySliderHandler, 0), [])

  const searchedmeteorites = meteorites.filter(meteorite => meteorite.name.toLowerCase().includes(searchInput.toLowerCase().trim()))
  let centurySortedmeteorites = [];
  if(centurySliderValue > 800) {
    centurySortedmeteorites = meteorites.filter(meteorite => {
      if(meteorite.year === undefined) {
        return;
      } else {
        //only check year and slider value of first two entries in the number.
        const parseSub = parseInt(meteorite.year.substring(1,2));
        const parseSlider = parseInt(centurySliderValue.substring(1,2));
        console.log(parseSub)
        if(parseSub >= parseSlider && parseSub < parseSlider + 1) { //check if year is between slider value and next highest one
          return meteorites;
        }
   
      }
    })
    
    //centurySortedmeteorites = 
      // console.log(`Slider Value: ${centurySliderValue}`)
      //   if(meteorite.year === undefined) {
      //     return;
      //   } else {
      //    console.log("Metor Year: ", meteorite.year)
      //     const subM = meteorite.year.substring(0,4);
      //     const parsedSub = parseInt(subM);
      //    console.log("subM:", subM)
      //     for(let i = 0; i < centuries.length; i++) {
      //       if(parsedSub >= centuries[i] && parsedSub <= centuries[i + 1]) {
      //         return parsedSub;
      //       }
      //     }
      //   }
        
     // })
  }
  

  const fetchCall = () => {
    const url = `https://data.nasa.gov/resource/gh4g-9sfh.json`;
    fetch(url, {
        method: 'GET',
    }).then(response => {
      return response.json();
    }, []).then(data => {
       setmeteorites(data)
    })
  }
  useEffect(() => {
   fetchCall()
  }, [])

  // for pagination, from freecodecamp
  // at top of page as resource 1
  const [currentPage, setCurrentPage] = useState(1);
 // let totalCountValue = 0;
  

  const currentmeteoriteData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    if(centurySliderValue > 800) {
      return centurySortedmeteorites.slice(firstPageIndex, lastPageIndex)
    } else {
      return searchedmeteorites.slice(firstPageIndex, lastPageIndex)
    }
    
  }, [currentPage, searchedmeteorites, centurySliderValue]);

  // data existence validation 
  if(meteorites === undefined) {
    return (
      <div className="App">
        No meteorite data, sad face
      </div>
    )
  } else {
      console.log("searchInput from App.js", searchInput)

      
        return (
          <div className="App">
              <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={meteorites.length} //WON'T BE ABLE TO HAVE PAGINATION CHANGE FOR MULTIPLE FILTERS IN CURRENT SETUP
              pageSize={PageSize}
              onPageChange={page => setCurrentPage(page)}
            />

            {/* search bar tings */}
            <TextField 
              onChange = {debouncedSearchHandler}
            />
            <input type="range" min="0700" max="2200" step="100" className="century-slider" onChange={centurySliderHandler}/>
            <output>{centurySliderValue}s</output>
            <section className = "data-grid">
              {currentmeteoriteData.map(m => {
                return <meteoriteCard m={m} key={m.id}/>
              })}
              </section>
            </div>
          );
      
    } //else
  }// App

// to reference the results of reverse geocoding in external file
export const ReverseGeocodeComponent = (props) => {
  const m = props.m;
  const [meteoriteLocation, setmeteoriteLocation] = useState("");
  
  useEffect(() => {
    reverseGeocode(m.reclat, m.reclong).then(location => {
      setmeteoriteLocation(location);
    });
  }, [reverseGeocode, m.reclat, m.reclong]);

  return <span>Landing location: {meteoriteLocation}</span>

}


// each meteorite card is responsible for receiving a meteorite from the list
// and looking up the geocoding information about it
// props = generic react/node term, means properties. Maybe this is wrong lol
export const meteoriteCard = (props) => {
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
 * reverseGeogode() takes in meteorite latitude + longitude
 * coordinates, returns city and country of meteorite landing 
 * in the 'Landing Location' part of each meteorite tile
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
