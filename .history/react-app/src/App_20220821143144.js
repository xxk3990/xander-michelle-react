import logo from './logo.svg';
import './App.css';
import * as meteorData from './call.js'

function App() {
  return (
    <div className="App">
      <button type = "button" onClick ={meteorData.makeCall()}>Click to get data</button>
      <section className = "data-grid">
      <h3>{meteorData.name}</h3>
      </section>
    </div>
  );
}

export default App;
