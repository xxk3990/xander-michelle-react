import React, {useState, useEffect, useContext, createContext} from 'react'
import convert from './App.js'
import reverseGeocode from './App.js'
import ReverseGeocodeComponent from './App.js'
import { ReturnedLocationRevGeo } from './App.js'

//https://github.com/Saleh-Mubashar/React-Search for some of it

const SearchContext = createContext();

export default function DisplaySearch(props){
  // property for meteor array
  const m = props.m;

  // property for search input
  const searchInput = props.searchInput;
  
  if (searchInput !== "") {
    const filteredSearch = m.filter(result => {
        return result.name.includes(searchInput)
    })
    return (
      <section>
        <h6>You're searching for: {searchInput}</h6>
        {filteredSearch.map(m => {
          console.log("Rand from filter: ", m)
          console.log("Just seeing what happens I guess!!!!!!! Also rand", m.name)
          return (<Results m={m} key={m.id}/>)
        })}
      </section> 
    ) 
  } else {
    console.log("e.target.value.length is 0")
  }  // end searchInput  
};


  // end DisplaySearch

// meteorName
// sort by continent, country 
// sort by size, mass 
// sort by century/year

const Results = (props) => {
  const m = props.m;
  console.log("Props from results: ", props)

  if (m === undefined) {
    return <p>No results, sad face :-| fak</p>
  } else {
    return (
      <section className="meteorText" key={m.id}>
        <h3 id="meteor-name">{m.name}</h3>
        <span>{m.id}</span>
        <span>
          {/* if lat and long are known, do the coords. 
          otherwise, return unknown. Ternary operator */}
          {m.reclat === 0.0 && m.reclong === 0.0
            ? 'Unknown'
            : `Coordinates: ${m.reclat}, ${m.reclong}`}
        </span>
        <span>Year: {m.year === undefined ? 'Unknown' : m.year.substring(0, 4)}</span>
        {/* <span>Mass: {convert(m.mass)}</span>
        {/* geolocation starts here */}
        {/* PROBLEM AREA - DEC 6 */}
        <ReverseGeocodeComponent m={m} key={m.id}/>
        
      </section>
    );
  }
  
  
}