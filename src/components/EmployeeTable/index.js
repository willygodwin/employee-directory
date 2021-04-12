import React, { useState, useEffect } from "react";
import TableRows from "../TableRows";
import TableHeader from "../TableHeader";
import SearchBar from "../SearchBar";
import "./style.css";
// import 'bootstrap/dist/css/bootstrap.css'
import API from "../../utils/API";
import uparrow from '../../images/uparrow.png'
import downarrow from '../../images/downarrow.png'





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
    onClick: tableHeaderOnClick,
    uparrow,
    downarrow
  }

  const searchBarProps ={
    filterKey,
    filterStr,
    onChangeFilterKey: setFilterKey,
    onChangeFilter: setFilter

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
      <SearchBar {...searchBarProps}/>

      <div>
        <table id="myTable" className="table">
          <thead>
            <tr className="header">
              <TableHeader headerKey="firstname" headerName="First Name" {...tableHeaderProps} />
              <TableHeader headerKey="lastname" headerName="Last Name" {...tableHeaderProps} />
              <TableHeader headerKey="gender" headerName="Gender"  {...tableHeaderProps} />
              <TableHeader headerKey="dob" headerName="DOB" {...tableHeaderProps} />
              <TableHeader headerKey="email" headerName="Email" {...tableHeaderProps} />
              <TableHeader headerKey="" headerName="Location" onClick={() => ({})} uparrow="" downarrow="" />
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
          
        </table>
      </div>
    </div>


  );
}

export default EmployeeTable;
