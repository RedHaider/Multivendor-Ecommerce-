import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import axios from 'axios';
import config from '../../config';  // Import config with base URL
import './homestyle.css'

const HomeCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(16);

  const navigate = useNavigate();

  // Fetch categories from the API
  useEffect(() => {
    axios.get(`${config.API_BASE_URL}/product-management/api/category/`)
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch categories');
        setLoading(false);
      });
  }, []);

  // Load more categories
  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  // Redirect to Shop with the selected category filter
  const handleCategoryClick = (category_name) => {
    navigate(`/shop?category=${category_name}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container  mb-5">
      <div className="c mt-5 justify-content-center">
        <div className="row justify-content-center">
          <div className="col text-center">
            <div className="heading">
              <h1>Categories</h1>
              <hr className="underline-hr" />
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="custom-grid">
            {categories.slice(0, visibleCount).map((category) => (
              <div className="card h-100" key={category.id}
                  onClick={() => handleCategoryClick(category.category_name)}
                  style={{ cursor: 'pointer' }}>
                <img
                  src={`${config.API_BASE_URL}${category.category_image}`}
                  className="card-img-top"
                  alt={category.category_name}
                />
                <div className="card-body text-center">
                  <h5 className="card-title card-title-small">{category.category_name}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      {visibleCount < categories.length && (
        <button className="load-more-btn" onClick={loadMore}>Load More</button>
      )}
    </div>
  );
};

export default HomeCategory;
