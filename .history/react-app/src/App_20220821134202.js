import logo from './logo.svg';
import './App.css';
import * as meteorData from './call.js'

function App() {
  return (
    <div className="App">
      <button type = "button" onclick ={meteor.makeCall()}>Click to get data</button>
    </div>
  );
}

export default App;
