
import './App.css';
import React, { useState, useEffect } from "react";
import API from "./utils/API";
import EmployeeTable from './components/EmployeeTable';
import Title from './components/Title';
import Wrapper from './components/Wrapper';


console.log(API)

API.searchTerms()
.then(res => {
  console.log(res)
})
.catch(err => console.log(err));


function App() {

  return  (
    <Wrapper>
      <Title>Employee List</Title>
      <EmployeeTable />;
    </Wrapper>
);
  
  
}

export default App;
