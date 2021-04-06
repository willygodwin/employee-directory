import React, { useState } from "react";
import "./style.css";

function TableRows(props) {


    return (

        <tr>
          <td>{props.firstName}</td>
          <td>{props.lastName}</td>
          <td>{props.gender}</td>
          <td>{props.dob}</td>
          <td>{props.email}</td>
          <td>{props.location}</td>
        </tr>



    
  );
}

export default TableRows;
