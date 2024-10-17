import React, { useState } from "react";
import "../style/priceRangeFilter.css"; 

const PriceRangeFilter = ({ onPriceChange }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "min-price") {
      const newMinPrice = parseInt(value);
      setMinPrice(newMinPrice);
      onPriceChange(newMinPrice, maxPrice); // Pass the new price range
    } else if (id === "max-price") {
      const newMaxPrice = parseInt(value);
      setMaxPrice(newMaxPrice);
      onPriceChange(minPrice, newMaxPrice); // Pass the new price range
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
