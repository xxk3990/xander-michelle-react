import React, {useState, useEffect} from 'react'
import App from './App'
import MeteorCard from './App.js'
import reverseGeocode from './App.js'
import convert from './App.js'
import ReverseGeocodeComponent from './App.js'

//https://github.com/Saleh-Mubashar/React-Search for some of it

const DisplaySearch = (props) => {

  // property for meteor array
  const m = props.m;

  // property for search input
  const searchedM = props.searchedM
  
    // PROBLEM AREA - Nov 10 2022
    if (searchedM !== "") {
      console.log("searchedM", searchedM)
      
        const filteredSearch = m.filter(result => {
          
          if (searchedM === "") {
            console.log("oh my god haha u fail hahaha")
            return result
          } else {
            return result.name.includes(searchedM)
          }
        })
        <section className='data-grid'>
          filteredSearch.map(rand => {
            console.log("rand:", rand.name)
            return (
            <section className="meteorText" key={m.id}>
              <h3 id="meteor-name">{rand.name}</h3>
              <p>{rand.id}</p>
              <p>
                {/* if lat and long are known, do the coords. 
                otherwise, return unknown. Ternary operator */}
                {rand.reclat === 0.0 && rand.reclong === 0.0
                  ? 'Unknown'
                  : `Coordinates: ${rand.reclat}, ${rand.reclong}`}
              </p>
              {/* geolocation starts here */}
              <ReverseGeocodeComponent
                m = {rand}
              />
              <p>Year: {rand.year === undefined ? 'Unknown' : rand.year.substring(0, 4)}</p>
              <p>Mass: {convert(rand.mass)}</p>
            </section>)
          })
      }
      else {

        console.log("e.target.value.length is 0")
        return <p>No results, sad face</p>
      }  // end searchInput
  };


  // end DisplaySearch

// meteorName
// sort by continent, country 
// sort by size, mass 
// sort by century/year

export default DisplaySearch;