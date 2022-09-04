import React, { useState, useMemo }  from 'react';
import logo from './logo.svg';
import './App.css';
// import {meteorData, makeCall} from './call.js'
import Pagination from './Pagination';

let PageSize = 25;
// let  meteorName, id, nametype, recclass, mass, fall, year, reclat, reclong, meteorText, geolocation, lat, long;
function App() {
  const url = `https://data.nasa.gov/resource/gh4g-9sfh.json`
  window.onload = () => {
    makeCall();
  }
  let meteorData;
  const makeCall = () => {
    const xhr = new XMLHttpRequest();
    xhr.onload = (e) => {
      const data = e.target.response;
      console.log("data from API: " + data)
      meteorData = JSON.parse(data);
      return meteorData;
    }
    xhr.open('GET', url);
    xhr.send();
  }
  // const handleResponse = (e) => {
    
  // }
  const [currentPage, setCurrentPage] = useState(1);
  if(meteorData === undefined) {
    return console.log("data is undefined");
  } else {
    console.log(meteorData);
    const currentMeteorData = useMemo(() => {
    
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      return meteorData.slice(firstPageIndex, lastPageIndex);
    
  }, [currentPage]);
  console.log("OOGA BOOGA current meteor data: " + currentMeteorData)
  if((meteorData === undefined) || (meteorData.length == 0)) {
    return (
        <div className="App">
          No meteor data, sad face
        </div>
    )
  } else {
    console.log("meteorData from App.js: ", meteorData);
    
    return (
      <div className="App">
        
    
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={meteorData !== undefined ? meteorData.length : 0}
          pageSize={PageSize}
          onPageChange={page => setCurrentPage(page)}
        />
      
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
          )
         })}
        </section>
      </div>
  
    );
  }
  }
  


  // if(meteorData == null || meteorData.length === 0) {
  //   return (
  //     <div className='App'>
  //       No meteor data available, sad face
  //     </div>
  //   )
  // } else {

  // }
  
}




// async function makeCall() {
    
// }

// parse data
// async function handleResponse(e) {
//     /* 
//      * dataGrid - required at the beginning, gets 
//      * populated with currently meteorText
//     */
//     // let dataGrid = document.querySelector(".data-grid"); 
    
       
  
        
// }

//window.onload = () => makeCall();

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
