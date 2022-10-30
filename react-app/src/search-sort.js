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

    e.preventDefault();
    console.log("e.target.value: ", e.target.value);
    setSearchInput(e.target.value);


    if (e.target.value.length > 0) {
      passedM.filter(el => {

        console.log("el.name.match.searchInput: ", el.name.match(searchInput));
        console.log("just el: ", el)

        return (
          <section className="data-grid">
              <MeteorCard m={el} key={el.id}/>
          </section>
        )          
      });

      console.log("AGAIN e.target.value:", e.target.value)
  
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