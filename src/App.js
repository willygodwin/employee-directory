
import './App.css';
import React, { useState, useEffect } from "react";
import API from "./utils/API";
import EmployeeTable from './components/EmployeeTable';

console.log(API)

API.searchTerms()
.then(res => {
  console.log(res)
})
.catch(err => console.log(err));


function App() {
  return <EmployeeTable />;
}

export default App;
