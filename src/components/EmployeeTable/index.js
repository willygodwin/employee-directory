import React, { useState, useEffect } from "react";
import TableRows from "../TableRows";
import "./style.css";
import API from "../../utils/API";

function EmployeeTable(props) {

  
  const [employees, setEmployees] = useState([])
  const [error, setError] = useState("");
  console.log("******employees******", employees)

  

  // const filterEmployees =(id) => {
  //   setEmployees(employees.filter((employee) => employee.id !== id))


  // }

  useEffect(() => {

    async function getData() {
      const response = await API.searchTerms()
      console.log(response.results)
      setEmployees(response.results)
      
  
    }
    getData()

  //   API.searchTerms()
  //     .then(res => {
  //       if (res.length === 0) {
  //         throw new Error("No results found.");
  //       }
  //       if (res.status === "error") {
  //         throw new Error(res.message);
  //       }
        
  //       setEmployees(res);
  //       console.log("**********EMPLOYEES**********", employees)
  //     })
  //     .catch(err => setError(err));
  }, []);

  const rows = employees.map(employee => {
    return <TableRows  gender = {employee.gender} name={employee.email} dob={employee.dob.date} email={employee.email} location={employee.email} />
    
  })
    function populateEmployeeInfo() {
      return 
    }
    return (


        <table id="myTable">
        <tr className="header">
          <th style={{marginRight: '2em'}} >Name</th>
          <th style={{marginRight: '2em'}} >Gender</th>
          <th style={{marginRight: '2em'}} >DOB</th>
          <th style={{marginRight: '2em'}} >Email</th>
          <th style={{marginRight: '2em'}} >Location</th>
        </tr>
        {rows}
        <TableRows/>
      </table>

    
  );
}

export default EmployeeTable;
