import React, {useState, useEffect} from 'react'
import App from './App'
import MeteorCard from './App.js'

//https://github.com/Saleh-Mubashar/React-Search for some of it

const DisplaySearch = (props) => {
 
  
  // property for meteor array
  const m = props.m;

  // property for search input
  const searchedM = props.searchedM
  
  console.log("this is m:", m)

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
        return (
          <section>
          You're searching:
          {filteredSearch.map(rand => {
            console.log("Just seeing what happens I guess!!!!!!! Also rand", rand.name)
            return <h3>  {rand.name}</h3>
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

export default DisplaySearch;