import React, { useState } from "react";
import "./style.css";

function SearchBar(props) {
    const filterKey = props.filterKey
    const filterStr = props.filterStr
    const onChangeFilterKey = props.onChangeFilterKey
    const onChangeFilter = props.onChangeFilter
   
  
    return(
    <div className="search-bar">
  
          <label>
            Search by
              <select value={filterKey} onChange={e => onChangeFilterKey(e.target.value)}>
              <option value="firstname">First Name</option>
              <option value="lastname">Last Name</option>
              <option value="email">Email</option>
              <option value="location">Location (Country only)</option>
            </select>
            <input
              type="text"
              id="myInput"
              value={filterStr}
              onChange={e => onChangeFilter(e.target.value)} />
          </label>
        </div>
    )
  }

  export default SearchBar;