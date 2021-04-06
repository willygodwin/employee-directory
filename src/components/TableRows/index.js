import React, { useState } from "react";
import "./style.css";

function TableRows(props) {


    return (

        <tr>
          <td>{props.name}</td>
          <td>{props.gender}</td>
          <td>{props.dob}</td>
          <td>{props.email}</td>
          <td>{props.location}</td>
        </tr>



    
  );
}

export default TableRows;
