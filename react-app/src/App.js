import React, { useState, useMemo }  from 'react';
import logo from './logo.svg';
import './App.css';
import {meteorData, makeCall} from './call.js'
import Pagination from './Pagination';

let PageSize = 25;

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    console.log("meteorData from App.js: ", meteorData);
    return meteorData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <div className="App">
      <button type = "button" onClick ={() => makeCall()}>Click to get data</button>
  
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={meteorData.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />

      <section className = "data-grid">
      
      </section>
    </div>

  );
}

export default App;
