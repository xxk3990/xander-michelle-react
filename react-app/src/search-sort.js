import React, {useState, useEffect} from 'react'
import App from './App'
import MeteorCard from './App.js'

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");

  const [meteors, setMeteors] = useState([]); //makes data global!!!!!!!!!!

  console.log("meteorsTopofFile: ", meteors)

  // prevent some issues
  const handleChange = (e) => {
    const url = `https://data.nasa.gov/resource/gh4g-9sfh.json?name=${searchInput}`;
      fetch(url, {
          method: 'GET',
      }).then(response => {
        
        return response.json();
      }, []).then(data => {
         setMeteors(data)
      })

    e.preventDefault();
    console.log("e.target.value: ", e.target.value);
    setSearchInput(e.target.value);

    if (searchInput.length > 0) {
      meteors.filter((likeName) => {
        console.log("likeName.name.match.searchInput: ", likeName.name.match(searchInput));
        return likeName.name.match(searchInput);
        // return <div>{meteors.name.match(searchInput)}</div>
      });
    } // end searchInput
    console.log("Search input:", searchInput)
    console.log("meteorsBottomofFile:",meteors)
    
  };

  // where you goooooo
  // useEffect(() => {
  //   handleChange()
  //  }, [])

  return <section className="searchBar">
    <input type="search" placeholder="Seach meteors by name" onChange={handleChange} value={searchInput}/>
    <button onClick={handleChange}>Search</button>
  </section>
} // end searchBar


// meteorName
// sort by continent, country 
// sort by size, mass 
// sort by century/year

export default SearchBar;