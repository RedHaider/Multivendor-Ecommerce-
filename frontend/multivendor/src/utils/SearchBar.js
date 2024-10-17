import React from "react";
import '../style/SearchBar.css'

const SearchBar = () => {
    return (
      <div className="search-container">
        <span className="search-icon">
          <i className="fa fa-search"></i> {/* FontAwesome icon */}
        </span>
        <input 
          type="text" 
          placeholder="Search here" 
          className="search-input"
        />
      </div>
    );
  }
  
  export default SearchBar;