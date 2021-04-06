import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import API from "./utils/API";

console.log(API)

API.searchTerms()
.then(res => {
  console.log(res)
})
.catch(err => console.log(err));


function App() {
  return (
    
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
