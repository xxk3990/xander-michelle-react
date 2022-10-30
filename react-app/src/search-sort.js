import React, {useState, useEffect} from 'react'
import App from './App'
import MeteorCard from './App.js'

//https://github.com/Saleh-Mubashar/React-Search for some of it

const SearchBar = (props) => {

  const [searchInput, setSearchInput] = useState("");

  const passedM = props.passedM;

  console.log("passedM", passedM)

  // prevent some issues
  const handleChange = (e) => {
    // const url = `https://data.nasa.gov/resource/gh4g-9sfh.json?name=${searchInput}`;
    //   fetch(url, {
    //       method: 'GET',
    //   }).then(response => {
        
    //     return response.json();
    //   }, []).then(data => {
    //      setMeteors(data)
    //      console.log("Data from setMeteors(data):", data)
    //   })

    console.log("e.target.value: ", e.target.value);
    setSearchInput(e.target.value);


    if (e.target.value.length > 0) {
      console.log("AGAIN e.target.value:", e.target.value)
      return (
        <section className="data-filtered-grid">
        {
          passedM.filter(searchedName => searchedName === searchInput).map(el => {
            console.log("el: " + el)
              return <p>{el.value.name}</p> 
          })
        }
        </section>
      )
      // passedM.filter(el => {

      //   console.log("el.name.match.searchInput: ", el.name.match(searchInput));
      //   console.log("just el: ", el)

      //   return (
          
              
          
      //   )          
      // });

      
  
      } else {
        console.log("e.target.value.length is 0")
      }  // end searchInput

      
  };

  // where you goooooo
  // useEffect(() => {
  //   handleChange()
  //  }, [])

  return <section className="searchBar">
    <input type="search" placeholder="Seach meteors by name" onChange={handleChange} value={searchInput}/>
    {/* <button onClick={handleChange}>Search</button> */}
  </section>
} // end searchBar


// meteorName
// sort by continent, country 
// sort by size, mass 
// sort by century/year

export default SearchBar;