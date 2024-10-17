import React, { useState } from "react";
import "../style/priceRangeFilter.css"; // Assuming you're using a separate CSS file

const PriceRangeFilter = () => {
  // State to manage price range
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(800);

  // Function to handle input field changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "min-price") {
      if (parseInt(value) >= maxPrice) {
        setMinPrice(maxPrice - 1); // Ensure minPrice is always less than maxPrice
      } else {
        setMinPrice(parseInt(value));
      }
    } else if (id === "max-price") {
      if (parseInt(value) <= minPrice) {
        setMaxPrice(minPrice + 1); // Ensure maxPrice is always greater than minPrice
      } else {
        setMaxPrice(parseInt(value));
      }
    }
  };

  return (
    <div className="filter-section">
      <div className="filter-title">Price</div>
      <div className="price-range">
        Price Range: ${minPrice} - ${maxPrice}
      </div>
      <div className="price-input-fields">
        <div className="price-field">
          <label htmlFor="min-price">Min Price</label>
          <input
            type="number"
            id="min-price"
            value={minPrice}
            min="0"
            max="800"
            step="1"
            onChange={handleInputChange}
          />
        </div>
        <div className="price-field">
          <label htmlFor="max-price">Max Price</label>
          <input
            type="number"
            id="max-price"
            value={maxPrice}
            min="0"
            max="800"
            step="1"
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
