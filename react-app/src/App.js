/* 
 * filename - App.js
 * resources: 
   1. https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
 */

import React, { useState, useMemo }  from 'react';
// import logo from './logo.svg';
import './App.css';
// import {meteorData, makeCall} from './call.js'
import Pagination from './Pagination';

let PageSize = 25;
// let  meteorName, id, nametype, recclass, mass, fall, year, reclat, reclong, meteorText, geolocation, lat, long;

function App() {

  window.onload = () => makeCall;
  console.log("h"); // this is getting logged twice uh

  // Global variable to be populated
  // with the meteor data from the JSON
  let meteorData;

  /* 
   * makeCall() - HTTP request
   * retrieves info from external JSON
   */
  const makeCall = () => {
    const url = `https://data.nasa.gov/resource/gh4g-9sfh.json`;
    const xhr = new XMLHttpRequest();
    xhr.onload = handleResponse;
    xhr.open('GET', url);
    xhr.send();
  }

  /* 
   * handleResponse() - where 
   * data from the JSON is parsed
   */
  const handleResponse = (e) => {
    const data = e.target.response;
    console.log("data from API: " + data); // NOT GETTING THIS CALL IN CONSOLE EVEN ?????
    meteorData = JSON.parse(data);
  }

  // for pagination, from freecodecamp
  // at top of page as resource 1
  const [currentPage, setCurrentPage] = useState(1);

  // data existence validation 
  if(meteorData === undefined) { // THIS IS WHERE CODE STOPS, NEVER HITS ELSE
    // CONTINUES THINKING METEORDATA IS UNDEFINED :(
    // also, printing things in the console twice?
    return console.log("data is undefined"); // ONLY CONSOLE LOG THAT WORKS ATM
  } else {
    console.log("meteorData from else, \nAfter data validation: ", meteorData);
    
    const currentMeteorData = useMemo(() => {
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      return meteorData.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    console.log("OOGA BOOGA current meteor data: " + currentMeteorData); // NOT HITTING
    
    if((meteorData === undefined) || (meteorData.length === 0)) {
      return (
          <div className="App">
            No meteor data, sad face
          </div>
      )
    } else {
      console.log("meteorData from App.js: ", meteorData); // NOT HIT
      
      return (
        /* Hook for pagination from resource 1 */
        <div className="App">
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={meteorData !== undefined ? meteorData.length : 0}
            pageSize={PageSize}
            onPageChange={page => setCurrentPage(page)}
          />
        
          {/* 
            * HTML for displaying meteor data 
            * (used to work lol until pagination)
          */}
          <section className = "data-grid">
          {currentMeteorData.map(m => {
            return (
              <section class="meteorText">
                <h3 id = "meteor-name">{m.name}</h3>
                <p>{m.id}</p>
                <p>Coordinates: {m.reclat}, {m.reclong}</p> 
                <p>Year: {m.year}</p>
                <p>Mass: {m.mass}</p>
              </section>
            );
          })}
          </section> 
        </div>
      );
    } // inner else
  } // outer else 
  
} // App

/*
 * convert() adds proper suffix based 
 * on metric number digit length
 */
const convert = (num) => {
    // num, from mass, is inputted
    // as a string from the JSON
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

export default App;
