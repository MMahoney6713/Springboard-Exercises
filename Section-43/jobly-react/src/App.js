import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from "react-router-dom";

import Jobly from './Jobly';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Jobly />
      </BrowserRouter>
    </div>
  );
}

export default App;
