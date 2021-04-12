import React, { useState } from "react";



function TableHeader(props) {
    const headerName = props.headerName
    const headerKey = props.headerKey
    const sortKey = props.sortKey
    const sortDirection = props.sortDirection
    const onClick = props.onClick
  
    const isActiveHeader = headerKey === sortKey;
    function getUpClass() {
      if (isActiveHeader && sortDirection) {
        return "active"
      }
      return ""
    }
    function getDownClass() {
      if (isActiveHeader && !sortDirection) {
        return "active"
      }
      return ""
    }
  
    return <th style={{ marginRight: '2em' }} onClick={() => onClick(headerKey)}>
      <div className="th-container">{headerName}
        <div className='arrow-container'>
          <img src={props.uparrow} height="8px" width="20px" className={getUpClass()} />
          <img src={props.downarrow} height="8px" width="20px" className={getDownClass()} />
        </div>
      </div>
    </th>
  }
  


export default TableHeader