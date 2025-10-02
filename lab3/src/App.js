// src/App.js
import React from "react";  
import Exercise1 from "./components/Exercise1";  
import { exercise2 as Exercise2 } from "./components/Exercise2";


function App() {
  return (
    <div className="App">
      <h1>lab3 - Components</h1>
      <Exercise1 />
      <Exercise2 />
    </div>
  );
}

export default App;
