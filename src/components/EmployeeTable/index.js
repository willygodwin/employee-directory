import React, { useState, useEffect } from "react";
import TableRows from "../TableRows";
import "./style.css";
import API from "../../utils/API";

function EmployeeTable(props) {

  
  const [employeesData, setEmployeesData] = useState([])
  const [employeesFilter, setEmployeesFilter] = useState([])
  const [filterBy, setFilterBy] = useState('firstname')
  const [filterStr, setFilter] = useState('')
  const [orderCol, setOrderCol] = useState('')
  const [error, setError] = useState("");
  console.log("******employees******", employeesData)
  console.log("******employees******", employeesFilter)



  useEffect(() => {

    async function getData() {
      const response = await API.searchTerms()
      console.log(response.results)
      setEmployeesData(response.results)
      setEmployeesFilter(response.results)
      
    }
    getData()
  }, []);

  useEffect(() => {
    console.log(orderCol)
    setEmployeesFilter(sortColumn(orderCol))
 
  }, [orderCol]);

  useEffect(() => {
    setEmployeesFilter(filterBySearch(filterBy))
 
  }, [filterStr]);


  function filterBySearch(operator){
    console.log(filterStr)
    console.log(operator)
    switch(operator) {
      case "firstname":
        return employeesData
              .filter(e => e.name.first.toLowerCase().includes(filterStr.toLowerCase()))
              .map(e => e)
      case "lastname":
        return employeesData
              .filter(e => e.name.last.toLowerCase().includes(filterStr.toLowerCase()))
              .map(e => e)
      case "gender":
        return employeesData
        .filter(e => e.gender.toLowerCase().includes(filterStr.toLowerCase()))
        .map(e => e)
      case "email":
        return employeesData
              .filter(e => e.email.toLowerCase().includes(filterStr.toLowerCase()))
              .map(e => e)
      case "location":
        return employeesData
              .filter(e => e.location.country.toLowerCase().includes(filterStr.toLowerCase()))
              .map(e => e)
    }
  }

  function sortByFirstName() {
    return employeesFilter.sort((a, b) => {
      let fa = a.name.first.toLowerCase(),
          fb = b.name.first.toLowerCase();

      if (fa < fb) {
          return -1;
      }
      if (fa > fb) {
          return 1;
      }
      return 0;
    });
  }

  function sortByLastName() {
    return employeesFilter.sort((a, b) => {
      let fa = a.name.last.toLowerCase(),
          fb = b.name.last.toLowerCase();

      if (fa < fb) {
          return -1;
      }
      if (fa > fb) {
          return 1;
      }
      return 0;
    });
  }

  function sortColumn(operator) {
    console.log("heyyaaaaabo")
    switch(operator) {
      case "firstname":
        return sortByFirstName()
      case "lastname":
        return sortByLastName()
      case "gender":
        return employeesData
        .filter(e => e.gender.toLowerCase().includes(filterStr.toLowerCase()))
        .map(e => e)
      case "email":
        return employeesData
              .filter(e => e.email.toLowerCase().includes(filterStr.toLowerCase()))
              .map(e => e)
      case "location":
        return employeesData
              .filter(e => e.location.country.toLowerCase().includes(filterStr.toLowerCase()))
              .map(e => e)
    }
   
  }

  const rows = employeesFilter.map(employee => {
    return <TableRows  gender = {employee.gender} firstName={employee.name.first} lastName={employee.name.last} dob={DateFormatting(employee)} email={employee.email} location={LocationNameJoin(employee)} />
    
  })
    // function EmployeeNameJoin(employee) {
    //   return employee.name.first + " " + employee.name.last
    // }

  

    function LocationNameJoin(employee) {
      return `${employee.location.street.number}  ${employee.location.street.name}, ${employee.location.city} ${employee.location.postcode}, ${employee.location.state}, ${employee.location.country}`
    }

    function DateFormatting(employee){
      const dateObj = new Date(employee.dob.date)
      console.log(dateObj)
      const month = dateObj.getUTCMonth() + 1; //months from 1-12
      const day = dateObj.getUTCDate();
      const year = dateObj.getUTCFullYear();

      return `${day}/${month}/${year}`
    }
    return (

      <div>
        <div className="search-bar">
          
          <label>
            Search by 
            <select value={filterBy} onChange={ e => setFilterBy(e.target.value) }>
              <option value="firstname">First Name</option>
              <option value="lastname">Last Name</option>
              <option selected value="gender">Gender</option>
              <option value="email">Email</option>
              <option value="location">Location (Country only)</option>

            </select>
            <input
            type="text"
            id="myInput"
            value={ filterStr }
            onChange={ e => setFilter(e.target.value) } />
          </label>
        </div>

        <div>
      
          <table id="myTable">
          <tr className="header">
            <th style={{marginRight: '2em'}} onClick={ () => setOrderCol('firstname')}>First Name</th>
            <th style={{marginRight: '2em'}} onClick={ () => setOrderCol('lastname')}>Last Name</th>
            <th style={{marginRight: '2em'}} onClick={ () => setOrderCol('firstname')}>Gender</th>
            <th style={{marginRight: '2em'}} onClick={ () =>setOrderCol('firstname')}>DOB</th>
            <th style={{marginRight: '2em'}} onClick={ () => setOrderCol('firstname')}>Email</th>
            <th style={{marginRight: '2em'}} onClick={ () =>setOrderCol('firstname')}>Location</th>
          </tr>
          {rows}
        </table>
        </div>
      </div>

    
  );
}

export default EmployeeTable;
