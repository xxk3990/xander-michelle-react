import React, {useState, useEffect} from 'react'
import convert from './App.js'
import reverseGeocode from './App.js'
import ReverseGeocodeComponent from './App.js'

//https://github.com/Saleh-Mubashar/React-Search for some of it


export default function DisplaySearch(props){

  
  // property for meteor array
  const m = props.m;

  // property for search input
  const searchedM = props.searchedM
  
  console.log("this is m:", m)

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
        return (
          <section>
          You're searching: {searchedM}
          {filteredSearch.map(m => {
            console.log("Rand from filter: ", m)
            console.log("Just seeing what happens I guess!!!!!!! Also rand", m.name)
            return <Results m={m} key={m.id}/>
          })}

          </section>
        )
        
      }
      else {
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
    return <p>No results, sad face :(</p>
  } else {

    console.log("data: ", m)

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
       <span>Landing location: {reverseGeocode(m.reclat, m.reclong)}</span>
        
      </section>
    );
  }
  
  
}