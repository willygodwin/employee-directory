import React, { useState } from "react";
import TableRows from "../TableRows";
import "./style.css";

function EmployeeTable(props) {

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
        <TableRows/>
      </table>

    
  );
}

export default EmployeeTable;
