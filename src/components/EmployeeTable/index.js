import React, { useState, useEffect } from "react";
import TableRows from "../TableRows";
import "./style.css";
import API from "../../utils/API";
import uparrow from '../../images/uparrow.png'
import downarrow from '../../images/downarrow.png'


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
        <img src={uparrow} height="8px" width="20px" className={getUpClass()} />
        <img src={downarrow} height="8px" width="20px" className={getDownClass()} />
      </div>
    </div>
  </th>
}

function EmployeeTable(props) {
  const [rawData, setRawData] = useState([])

  const [sortKey, setSortKey] = useState("firstname")
  const [sortDirection, setSortDirection] = useState(true) // ascending

  const [sortedData, setSortedData] = useState([])

  const [filterKey, setFilterKey] = useState('firstname')
  const [filterStr, setFilter] = useState('')

  const [filteredData, setFilteredData] = useState([])

  // Get raw data
  useEffect(() => {
    async function getData() {
      setRawData(await API.searchTerms())
    }
    getData()
  }, []);

  // Get sorted data
  useEffect(() => {
    let newData = rawData.sort((a, b) => {
      switch (sortKey) {
        case "firstname":
          return sortAlphabetical(a.name.first, b.name.first)
        case "lastname":
          return sortAlphabetical(a.name.last, b.name.last)
        case "gender":
          return sortAlphabetical(a.gender, b.gender)
        case "email":
          return sortAlphabetical(a.email, b.email)
        case "dob":
          return sortByDOB(a, b)
      }
    })

    if (!sortDirection) {
      newData.reverse()
    }

    setSortedData(newData)
  }, [rawData, sortKey, sortDirection])

  // Get filtered data
  useEffect(() => {
    setFilteredData(sortedData.filter(e => {
      console.log(e)
      let s = ""
      switch (filterKey) {
        case "firstname":
          s = e.name.first
          break
        case "lastname":
          s = e.name.last
          break
        case "email":
          s = e.email
          break
        case "location":
          s = e.location.country
          break
      }

      console.log(s)
      return (s.toLowerCase().includes(filterStr.toLowerCase()))
    }))
  }, [sortedData, sortKey, sortDirection, filterKey, filterStr])

  function sortAlphabetical(a, b) {
    let fa = a.toLowerCase(),
      fb = b.toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  }


  function sortByDOB(a, b) {
    let da = new Date(a.dob.date),
      db = new Date(b.dob.date);

    return da - db;
  }

  function tableHeaderOnClick(clickedKey) {
    if (sortKey === clickedKey) {
      setSortDirection(!sortDirection)
    } else {
      setSortKey(clickedKey)
      setSortDirection(true)
    }
  }

  const tableHeaderProps = {
    sortKey,
    sortDirection,
    onClick: tableHeaderOnClick
  }


  const rows = filteredData.map(employee => {
    const props = {
      gender: employee.gender,
      firstName: employee.name.first,
      lastName: employee.name.last,
      dob: employee.dob.date,
      email: employee.email,
      location: employee.location,
    }
    return <TableRows  {...props} />
  })


  return (

    <div>
      <div className="search-bar">

        <label>
          Search by
            <select value={filterKey} onChange={e => setFilterKey(e.target.value)}>
            <option value="firstname">First Name</option>
            <option value="lastname">Last Name</option>
            <option value="email">Email</option>
            <option value="location">Location (Country only)</option>
          </select>
          <input
            type="text"
            id="myInput"
            value={filterStr}
            onChange={e => setFilter(e.target.value)} />
        </label>
      </div>

      <div>
        <table id="myTable">
          <tr className="header">
            <TableHeader headerKey="firstname" headerName="First Name" {...tableHeaderProps} />
            <TableHeader headerKey="lastname" headerName="Last Name" {...tableHeaderProps} />
            <TableHeader headerKey="gender" headerName="Gender"  {...tableHeaderProps} />
            <TableHeader headerKey="dob" headerName="DOB" {...tableHeaderProps} />
            <TableHeader headerKey="email" headerName="Email" {...tableHeaderProps} />
            <TableHeader headerKey="" headerName="Location" onClick={() => ({})} />
          </tr>
          {rows}
        </table>
      </div>
    </div>


  );
}

export default EmployeeTable;
