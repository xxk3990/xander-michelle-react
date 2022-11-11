import React, {useState, useEffect} from 'react'
import App from './App'
import MeteorCard from './App.js'

//https://github.com/Saleh-Mubashar/React-Search for some of it

const SearchBar = (props) => {

  

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
    


    // PROBLEM AREA - Nov 10 2022
    if (e.target.value.length > 0) {
      console.log("AGAIN e.target.value:", e.target.value)
      
      // for (let m of Object.values (passedM)) {
        const filteredSearch = passedM.filter(result => {
          
          if (result.name !== e.target.value) {
            console.log("oh my god haha u fail hahaha")
            return 
            
            // console.log("result.name", result.name)
            // console.log("result HERE", result)
            // return result.name.includes(e.target.value)
            
            
          } else {
            console.log("result.name", result.name)
            console.log("result HERE", result)
            return result.name.includes(e.target.value)
            // console.log("oh my god haha u fail hahaha")
            // return
          }
        })
        return (
          <section>

          {filteredSearch.map(rand => {
            console.log("Just seeing what happens. Also rand", rand.name)
            return <DisplaySearch m={rand} key={rand.id}/>
          })}

          </section>
        )
        
      // }
        // passedM.filter(searchedName => {
          
        //   console.log("searchInput before if:", searchInput)
        //   console.log("searchedName before if", searchedName.name)
        //   if (searchedName.name === searchInput) {

        //     console.log("searchName:", searchedName)
        //     return searchedName
        //   }
        //  }) //.map(el => {
        //   console.log("el: " + el)
          
        //   return (
        //     <section className="data-filtered-grid">
        //        <p>{el.value.name}</p>
        //     </section>
        //   )

        //   return <p>{el.value.name}</p> 
        
      }
      
      
      // passedM.filter(el => {

      //   console.log("el.name.match.searchInput: ", el.name.match(searchInput));
      //   console.log("just el: ", el)

      //   return (
          
              
          
      //   )          
      // });

      
  
       else {
        console.log("e.target.value.length is 0")
      }  // end searchInput

      
  };

  const DisplaySearch = props => {
    const m = props.m 
    return (<p>M.name: {m.name}</p>)
  }

  // where you goooooo
  // useEffect(() => {
  //   handleChange()
  //  }, [])

  return <section className="searchBar">
    <input type="search" placeholder="Seach meteors by name" onChange={handleChange} />
    {/* <button onClick={handleChange}>Search</button> */}
  </section>



} // end searchBar





// meteorName
// sort by continent, country 
// sort by size, mass 
// sort by century/year

export default SearchBar;