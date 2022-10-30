import React, {useState, useEffect} from 'react'
import App from './App'
import MeteorCard from './App.js'

//https://github.com/Saleh-Mubashar/React-Search for some of it

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
         console.log("Data from setMeteors(data):", data)
      })

    e.preventDefault();
    console.log("e.target.value: ", e.target.value);
    setSearchInput(e.target.value);

    
      
      const filteredMeteors = meteors.filter((el) => {
        if (searchInput !== "") {
          console.log("el.name.match.searchInput: ", el.name.match(searchInput));
          console.log("just el: ", el)
          return el.name.match(searchInput);
        } else {
          return el;
        }
        
        // return <div>{meteors.name.match(searchInput)}</div>
      });
      console.log("Search input:", searchInput)
      console.log("meteorsBottomofFile:",meteors)
      console.log("Filtered Meteors: " + filteredMeteors)
      return (
        <section className="data-grid">
          {filteredMeteors.map((fm) => {
            return <MeteorCard m={fm} key={fm.id}/>
          })}
        </section>
      )  // end searchInput
    


    

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