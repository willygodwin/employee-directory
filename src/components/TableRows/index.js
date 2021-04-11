import React, { useState } from "react";
import "./style.css";



function TableRows(props) {

  function LocationNameJoin(location) {
    return `${location.street.number}  ${location.street.name}, ${location.city} ${location.postcode}, ${location.state}, ${location.country}`
  }
  
  function DateFormatting(dob){
    const dateObj = new Date(dob)
    // console.log(dateObj)
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
  
    return `${day}/${month}/${year}`
  }

    return (

        <tr>
          <td>{props.firstName}</td>
          <td>{props.lastName}</td>
          <td>{props.gender}</td>
          <td>{DateFormatting(props.dob)}</td>
          <td>{props.email}</td>
          <td>{LocationNameJoin(props.location)}</td>
        </tr>



    
  );
}

export default TableRows;
