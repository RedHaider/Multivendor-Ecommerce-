import React from "react";
import "../style/SearchBar.css";

const SearchBar = ({ searchQuery, onSearchChange, onSearchSubmit }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearchSubmit(); // Trigger search on Enter key
    }
  };

  return (
    <div className="search-container">
      <span
        className="search-icon"
        onClick={onSearchSubmit} // Trigger search on icon click
        style={{ cursor: "pointer" }}
      >
        <i className="fa fa-search"></i>
      </span>
      <input
        type="text"
        placeholder="Search here"
        className="search-input"
        value={searchQuery}
        onChange={onSearchChange}
        onKeyPress={handleKeyPress} // Trigger search on Enter
      />
    </div>
  );
};

export default SearchBar;
