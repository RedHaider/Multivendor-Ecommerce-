import React from "react";
import '../style/SearchBar.css';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="search-container">
      <span className="search-icon">
        <i className="fa fa-search"></i>
      </span>
      <input 
        type="text" 
        placeholder="Search here" 
        className="search-input"
        value={searchQuery}
        onChange={onSearchChange}
      />
    </div>
  );
}

export default SearchBar;
