
import './App.css';
import React, { useState, useEffect } from "react";
import EmployeeTable from './components/EmployeeTable';
import Title from './components/Title';
import Wrapper from './components/Wrapper';


function App() {
  return (
    <Wrapper>
      <Title>Employee List</Title>
      <EmployeeTable />;
    </Wrapper>
  );
}

export default App;
